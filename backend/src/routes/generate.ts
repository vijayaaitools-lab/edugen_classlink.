import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userKey = req.headers["x-api-key"];

    if (!userKey) {
      return res.status(400).json({
        error: "API key missing",
      });
    }

    const {
      prompt,
      subject,
      topic,
      grade,
    } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userKey}`,
        },

        body: JSON.stringify({
          model: "llama3-8b-8192",

          messages: [
            {
              role: "system",

              content:
                `You are a helpful teacher assistant for ${subject} Grade ${grade}. Topic: ${topic}`,
            },

            {
              role: "user",
              content: prompt,
            },
          ],

          max_tokens: 800,
        }),
      }
    );

    const data = await response.json();

    res.json({
      content:
        data.choices?.[0]?.message?.content || "",
    });
  } catch (err) {
    res.status(500).json({
      error: "AI generation failed",
    });
  }
});

export default router;