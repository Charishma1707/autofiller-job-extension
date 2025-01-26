const apiBaseUrl = `${process.env.API_BASE_URL}`;
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "signup") {
    const { email, password } = message;
    try {
      const response = await fetch(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  } else if (message.action === "login") {
    const { email, password } = message;
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        chrome.storage.local.set({ authToken: data.token }, () => {
          alert(data.message);
        });
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  } else if (message.action === "logout") {
    chrome.storage.local.remove("authToken", () => {
      alert("Logged out successfully.");
    });
  } else if (message.action === "uploadResume") {
    chrome.storage.local.get("authToken", async (result) => {
      const token = result.authToken;
      if (!token) {
        alert("User not logged in.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("resume", message.file);

        const response = await fetch(`${apiBaseUrl}/upload-resume`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
        } else {
          alert(data.error);
        }
      } catch (err) {
        console.error("Resume upload error:", err);
      }
    });
  } else if (message.action === "getJobSuggestions") {
    chrome.storage.local.get("authToken", async (result) => {
      const token = result.authToken;

      if (!token) {
        alert("User not logged in.");
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/job-suggestions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ questions: message.questions }),
        });

        const data = await response.json();
        if (response.ok) {
          sendResponse({ suggestions: data.suggestions });
        } else {
          alert(data.error);
        }
      } catch (err) {
        console.error("Job suggestions error:", err);
      }
    });

    return true;
  }
});