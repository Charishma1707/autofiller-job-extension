document.getElementById("login-btn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "login" });
});

document.getElementById("logout-btn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "logout" });
  location.reload();
});

document.getElementById("upload-btn").addEventListener("click", () => {
  const fileInput = document.getElementById("resume-input");
  if (fileInput.files.length === 0) {
    alert("Please select a file.");
    return;
  }

  const file = fileInput.files[0];
  chrome.runtime.sendMessage({ action: "uploadResume", file });
});

document.getElementById("get-suggestions-btn").addEventListener("click", () => {
  const jobQuestions = document.getElementById("job-questions").value;
  if (!jobQuestions.trim()) {
    alert("Please enter job questions.");
    return;
  }

  chrome.runtime.sendMessage({ action: "getJobSuggestions", jobQuestions }, (response) => {
    const suggestionsDiv = document.getElementById("suggestions");
    suggestionsDiv.innerHTML = response.suggestions
      .map((suggestion) => `<p>${suggestion}</p>`)
      .join("");
  });
});
