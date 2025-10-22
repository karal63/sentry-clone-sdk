import axios from "axios";

let projectId = null;

/**
 * Sends error details to backend
 */
async function sendError(error) {
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

/**
 * Initialize global listeners
 */
export function initErrorHandlers(id, app) {
    projectId = id;

    // Catch Vue-specific errors
    console.log(app, app.config, app.config.errorHandler);
    if (app && app.config && app.config.errorHandler) {
        app.config.errorHandler = (err, instance, info) => {
            console.log("Vue error");
            console.error("Vue Error:", err, info);
            sendError(err);
        };
    }

    // Catch global JS errors
    window.onerror = function (message, source, lineno, colno, error) {
        console.log("Global error");
        console.error("Global Error:", message, source, lineno, colno, error);
        sendError(error || new Error(message));
    };

    // Catch unhandled Promise rejections
    window.addEventListener("unhandledrejection", function (event) {
        console.log("Promise error");
        console.error("Unhandled Promise Rejection:", event.reason);
        sendError(
            event.reason instanceof Error
                ? event.reason
                : new Error(event.reason)
        );
    });

    console.log("[ErrorHandler] initialized for project:", projectId);
}
