import { createRoot } from "react-dom/client";
import App from "./App";
import { setBaseUrl } from "./api/custom-fetch";
import "./index.css";

// Set API base URL from environment variable
const apiUrl = import.meta.env.VITE_API_URL;
if (apiUrl) {
  setBaseUrl(apiUrl);
}

createRoot(document.getElementById("root")!).render(<App />);
