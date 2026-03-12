import axios from "axios";
import { App } from "vue";

let projectId: string | null = null;

async function sendError(error: Error) {
    const payload = {
        projectId,
        title: error.name || "Error",
        culprit: error.stack?.split("\n")[1]?.trim() || "unknown",
        level: "error",
        type: error.name || "UnknownError",
        message: error.message || "No message",
        stack: error.stack || "",
        timestamp: new Date().toISOString(),
    };

    try {
        await axios.post("http://localhost:3000/api/issue", payload);
    } catch (err) {
        console.warn("Error sending error log:", err);
    }
}

export function initErrorHandlers({ id, app }: { id: string; app: App }) {
    projectId = id;

    if (app && app.config && app.config.errorHandler) {
        app.config.errorHandler = (err, instance, info) => {
            sendError(err as Error);
        };
    }

    // Catch global JS errors
    window.onerror = function (message, source, lineno, colno, error) {
        sendError(error || new Error(String(message)));
    };

    // Catch unhandled Promise rejections
    window.addEventListener("unhandledrejection", function (event) {
        sendError(
            event.reason instanceof Error
                ? event.reason
                : new Error(event.reason),
        );
    });

    console.log("[ErrorHandler] initialized for project:", projectId);
}

// push changes
// add readme
