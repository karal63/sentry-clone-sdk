const { default: axios } = require("axios");

// craete here error handlers that will catch errors/warnings, pass them through the props
// place listeners in init function that will be called when user intializes project in main.ts file

function sendError(id, error) {
  const payload = {
    projectId: id,
    title: error.name,
    culprit: "myFunc(/features/getError)",
    level: "error",
    type: error.name,
    message: error.name,
  };

  axios.post("http://localhost:3000/api/issue", {
    payload,
  });
}
