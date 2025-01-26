document.getElementById("signup-btn").addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  chrome.runtime.sendMessage({ action: "signup", email, password });
});

document.getElementById("login-btn").addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  chrome.runtime.sendMessage({ action: "login", email, password });
});

document.getElementById("logout-btn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "logout" });
});

document.getElementById("upload-btn").addEventListener("click", () => {
  const fileInput = document.getElementById("resume-input");
  const file = fileInput.files[0];
  chrome.runtime.sendMessage({ action: "uploadResume", file });
});

document.getElementById("get-suggestions-btn").addEventListener("click", () => {
  const questions = document.getElementById("job-questions").value;
  chrome.runtime.sendMessage({ action: "getJobSuggestions", questions }, (response) => {
    const suggestionsDiv = document.getElementById("suggestions");
    suggestionsDiv.innerHTML = response.suggestions
      .map((s) => `<p>${s}</p>`)
      .join("");
  });
});
