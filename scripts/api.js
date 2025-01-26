export const uploadResume = async (file, token) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch("https://example-backend.com/upload-resume", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) throw new Error("Resume upload failed");
  return await response.json();
};

export const getJobSuggestions = async (questions, token) => {
  const response = await fetch("https://example-backend.com/job-suggestions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ questions }),
  });

  if (!response.ok) throw new Error("Failed to fetch suggestions");
  return await response.json();
};
