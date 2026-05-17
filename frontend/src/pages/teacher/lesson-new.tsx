import { useState } from "react";
import { useLocation } from "wouter";
import TeacherSidebar from "@/components/layout/teacher-sidebar";
import {
  useCreateLesson,
  getListLessonsQueryKey,
} from "@/api";

import { useQueryClient } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";

import { useAuth } from "@/lib/auth";

import {
  SUBJECTS,
  GRADES,
  DIVISIONS,
  BOARDS,
} from "@/lib/topics-data";

import {
  Plus,
  Youtube,
  Search,
  Bot,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
} from "lucide-react";

export default function TeacherLessonNew() {
  const { user } = useAuth();

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const [, setLocation] = useLocation();

  const [form, setForm] = useState({
    title: "",
    subject: user?.subject || "",
    grade: user?.grade || "",
    division: user?.division || "",
    board: user?.board || "",
    topic: "",
    description: "",
    content: "",
    videoUrl: "",
    lessonDate:
      new Date()
        .toISOString()
        .split("T")[0],

    resourceUrls: [] as string[],
  });

  const [newResource, setNewResource] =
    useState("");

  const [uploadedFiles, setUploadedFiles] =
    useState<string[]>([]);

  const [uploading, setUploading] =
    useState(false);

  const [aiOpen, setAiOpen] =
    useState(false);

  const [aiKey, setAiKey] =
    useState(user?.aiApiKey || "");

  const [aiPrompt, setAiPrompt] =
    useState("");

  const [aiLoading, setAiLoading] =
    useState(false);

  const setField = (
    key: string,
    value: string
  ) =>
    setForm((f) => ({
      ...f,
      [key]: value,
    }));

  const createMutation =
    useCreateLesson({
      mutation: {
        onSuccess: (lesson: any) => {
          queryClient.invalidateQueries({
            queryKey:
              getListLessonsQueryKey({
                teacherId:
                  user?.id,
              }),
          });

          toast({
            title:
              "Lesson created!",
          });

          setLocation(
            `/teacher/lessons/${lesson.id}`
          );
        },

        onError: () =>
          toast({
            title:
              "Failed to create lesson",

            variant:
              "destructive",
          }),
      },
    });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    createMutation.mutate({
      data: {
        ...form,

        resourceUrls: [
          ...form.resourceUrls,
          ...uploadedFiles,
        ],
      },
    });
  };

  const addResource = () => {
    if (newResource.trim()) {
      setForm((f) => ({
        ...f,

        resourceUrls: [
          ...f.resourceUrls,
          newResource.trim(),
        ],
      }));

      setNewResource("");
    }
  };

  const removeResource = (
    i: number
  ) => {
    setForm((f) => ({
      ...f,

      resourceUrls:
        f.resourceUrls.filter(
          (_, idx) => idx !== i
        ),
    }));
  };

  const generateWithAI = async () => {
    if (!aiKey) {
      toast({
        title:
          "Please enter your AI API key",

        variant:
          "destructive",
      });

      return;
    }

    if (!aiPrompt) {
      toast({
        title:
          "Please enter prompt",

        variant:
          "destructive",
      });

      return;
    }

    setAiLoading(true);

    try {
      localStorage.setItem(
        "user_ai_key",
        aiKey
      );

      const userKey =
        localStorage.getItem(
          "user_ai_key"
        );

      const response =
        await fetch(
          "/api/generate",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              "x-api-key":
                userKey || "",
            },

            body: JSON.stringify({
              prompt: aiPrompt,

              subject:
                form.subject,

              topic:
                form.topic,

              grade:
                form.grade,
            }),
          }
        );

      const data =
        await response.json();

      if (data.content) {
        setField(
          "content",

          form.content
            ? form.content +
                "\n\n" +
                data.content
            : data.content
        );

        toast({
          title:
            "AI content generated",
        });
      } else {
        toast({
          title:
            "Generation failed",

          variant:
            "destructive",
        });
      }
    } catch (err) {
      toast({
        title:
          "AI request failed",

        variant:
          "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const searchYouTube = () => {
    const query = `
      ${form.subject}
      ${form.topic}
      Grade ${form.grade}
      lesson
    `;

    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query
      )}`,

      "_blank"
    );
  };

  const searchWeb = () => {
    const query = `
      ${form.subject}
      ${form.topic}
      Grade ${form.grade}
      lesson plan
    `;

    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        query
      )}`,

      "_blank"
    );
  };

  const handleFileUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      setUploading(true);

      try {
        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await fetch(
            "/api/upload",
            {
              method: "POST",

              body: formData,
            }
          );

        const data =
          await response.json();

        if (data.url) {
          setUploadedFiles(
            (prev) => [
              ...prev,
              data.url,
            ]
          );

          toast({
            title:
              "File uploaded successfully",
          });
        }
      } catch (err) {
        toast({
          title:
            "Upload failed",

            variant:
              "destructive",
          });
      } finally {
        setUploading(false);
      }
    };

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />

      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="max-w-3xl mx-auto">

          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              Create New Lesson
            </h1>

            <p className="text-muted-foreground text-sm mt-0.5">
              Fill in the lesson details
              for your students
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Lesson Details */}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Lesson Details
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="space-y-1.5">
                  <Label htmlFor="title">
                    Lesson Title *
                  </Label>

                  <Input
                    id="title"
                    placeholder="e.g., Introduction to Fractions"
                    value={form.title}
                    onChange={(e) =>
                      setField(
                        "title",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="space-y-1.5">
                    <Label>
                      Subject *
                    </Label>

                    <Select
                      value={form.subject}
                      onValueChange={(v) =>
                        setField(
                          "subject",
                          v
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>

                      <SelectContent>
                        {SUBJECTS.map(
                          (s) => (
                            <SelectItem
                              key={s}
                              value={s}
                            >
                              {s}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>
                      Topic *
                    </Label>

                    <Input
                      placeholder="Enter topic"
                      value={form.topic}
                      onChange={(e) =>
                        setField(
                          "topic",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">

                  <div className="space-y-1.5">
                    <Label>
                      Grade *
                    </Label>

                    <Select
                      value={form.grade}
                      onValueChange={(v) =>
                        setField(
                          "grade",
                          v
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Grade" />
                      </SelectTrigger>

                      <SelectContent>
                        {GRADES.map(
                          (g) => (
                            <SelectItem
                              key={g}
                              value={g}
                            >
                              Grade {g}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>
                      Division
                    </Label>

                    <Select
                      value={form.division}
                      onValueChange={(v) =>
                        setField(
                          "division",
                          v
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Division" />
                      </SelectTrigger>

                      <SelectContent>
                        {DIVISIONS.map(
                          (d) => (
                            <SelectItem
                              key={d}
                              value={d}
                            >
                              Div {d}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>
                      Board
                    </Label>

                    <Select
                      value={form.board}
                      onValueChange={(v) =>
                        setField(
                          "board",
                          v
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Board" />
                      </SelectTrigger>

                      <SelectContent>
                        {BOARDS.map(
                          (b) => (
                            <SelectItem
                              key={b}
                              value={b}
                            >
                              {b}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lessonDate">
                    Date
                  </Label>

                  <Input
                    id="lessonDate"
                    type="date"
                    value={
                      form.lessonDate
                    }
                    onChange={(e) =>
                      setField(
                        "lessonDate",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="description">
                    Short Description
                  </Label>

                  <Textarea
                    id="description"
                    placeholder="Brief description"
                    value={
                      form.description
                    }
                    onChange={(e) =>
                      setField(
                        "description",
                        e.target.value
                      )
                    }
                    rows={2}
                  />
                </div>

              </CardContent>
            </Card>

            {/* AI Assistant */}

            <Card>
              <CardHeader>

                <button
                  type="button"
                  className="flex items-center justify-between w-full"
                  onClick={() =>
                    setAiOpen(!aiOpen)
                  }
                >

                  <CardTitle className="text-base flex items-center gap-2">
                    <Bot className="w-4 h-4 text-violet-500" />

                    AI Content Assistant
                  </CardTitle>

                  {aiOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}

                </button>

              </CardHeader>

              {aiOpen && (
                <CardContent className="space-y-4 pt-0">

                  <div className="space-y-1.5">
                    <Label htmlFor="aiKey">
                      Your AI API Key
                    </Label>

                    <Input
                      id="aiKey"
                      type="password"
                      placeholder="Enter AI API key"
                      value={aiKey}
                      onChange={(e) =>
                        setAiKey(
                          e.target.value
                        )
                      }
                    />

                    <p className="text-xs text-muted-foreground">
                      Supports OpenAI,
                      Groq, Gemini,
                      Claude, DeepSeek etc.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="aiPrompt">
                      AI Prompt
                    </Label>

                    <Textarea
                      id="aiPrompt"
                      placeholder="Explain fractions for Grade 3 students"
                      value={aiPrompt}
                      onChange={(e) =>
                        setAiPrompt(
                          e.target.value
                        )
                      }
                      rows={3}
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={
                      generateWithAI
                    }
                    disabled={aiLoading}
                    className="gap-2"
                  >
                    <Bot className="w-4 h-4" />

                    {aiLoading
                      ? "Generating..."
                      : "Generate Content"}
                  </Button>

                  <div className="border-t pt-4">

                    <p className="text-sm text-muted-foreground mb-3">
                      No API key?
                    </p>

                    <div className="flex gap-3">

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={
                          searchYouTube
                        }
                      >
                        <Youtube className="w-4 h-4 mr-2" />
                        Search YouTube
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={
                          searchWeb
                        }
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Search Web
                      </Button>

                    </div>

                  </div>

                </CardContent>
              )}
            </Card>

            {/* Content */}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Lesson Content
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="space-y-2">

                  <Label>
                    Upload Files
                  </Label>

                  <Input
                    type="file"
                    onChange={
                      handleFileUpload
                    }
                  />

                  {uploading && (
                    <p className="text-sm text-muted-foreground">
                      Uploading...
                    </p>
                  )}

                  {uploadedFiles.map(
                    (
                      file,
                      index
                    ) => (
                      <a
                        key={index}
                        href={file}
                        target="_blank"
                        className="block text-blue-600 underline text-sm"
                      >
                        {file}
                      </a>
                    )
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="content">
                    Lesson Notes
                  </Label>

                  <Textarea
                    id="content"
                    placeholder="Write lesson content..."
                    value={
                      form.content
                    }
                    onChange={(e) =>
                      setField(
                        "content",
                        e.target.value
                      )
                    }
                    rows={8}
                  />
                </div>

              </CardContent>
            </Card>

            <div className="flex gap-3">

              <Button
                type="submit"
                disabled={
                  createMutation.isPending
                }
              >
                {createMutation.isPending
                  ? "Saving..."
                  : "Save Lesson"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setLocation(
                    "/teacher/lessons"
                  )
                }
              >
                Cancel
              </Button>

            </div>

          </form>
        </div>
      </main>
    </div>
  );
}