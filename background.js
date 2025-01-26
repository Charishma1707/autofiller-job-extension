chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const apiBaseUrl = "https://example-backend.com"; // Replace with your backend URL
  const token = localStorage.getItem("authToken");

  if (message.action === "login") {
    const user = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user, password }),
      });
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      alert("Logged in successfully!");
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  } else if (message.action === "logout") {
    localStorage.removeItem("authToken");
    alert("Logged out successfully.");
  } else if (message.action === "uploadResume") {
    const formData = new FormData();
    formData.append("resume", message.file);

    try {
      await fetch(`${apiBaseUrl}/upload-resume`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      alert("Resume uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload resume.");
    }
  } else if (message.action === "getJobSuggestions") {
    try {
      const response = await fetch(`${apiBaseUrl}/job-suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ questions: message.jobQuestions }),
      });
      const data = await response.json();
      sendResponse({ suggestions: data.suggestions });
    } catch (err) {
      console.error(err);
      sendResponse({ suggestions: [] });
    }
    return true;
  }
});
