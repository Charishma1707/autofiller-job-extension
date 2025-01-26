const apiBaseUrl = "https://example-backend.com"; // Replace with your backend URL

export const login = async (email, password) => {
  try {
    const response = await fetch(`${apiBaseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    return data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  alert("You have been logged out.");
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};
