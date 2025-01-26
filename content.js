console.log("Content script loaded.");

// Function to autofill form fields
const autofillForm = (formData) => {
  for (const [key, value] of Object.entries(formData)) {
    const inputField = document.querySelector(`input[name="${key}"], textarea[name="${key}"]`);
    if (inputField) {
      inputField.value = value;
    }
  }
};

// Listen for messages from the popup or background scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "autofill") {
    autofillForm(message.data);
    sendResponse({ status: "Autofill completed" });
  } else if (message.action === "getFormFields") {
    const formFields = Array.from(document.querySelectorAll("input, textarea")).map((el) => ({
      name: el.name || el.id,
      value: el.value || "",
    }));
    sendResponse({ fields: formFields });
  }
});
