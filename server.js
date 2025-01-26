const express = require("express");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for users
let users = [];

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ensure uploads directory exists
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// User signup
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  users.push({ email, password });
  res.status(201).json({ message: "User signed up successfully" });
});

// User login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = `${email}-${Date.now()}`;
  res.status(200).json({ message: "Login successful", token });
});

// Upload resume
app.post("/upload-resume", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.status(200).json({
    message: "Resume uploaded successfully!",
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Get job suggestions (mock data)
app.post("/job-suggestions", (req, res) => {
  const { questions } = req.body;

  if (!questions) {
    return res.status(400).json({ error: "Questions are required" });
  }

  const suggestions = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UI/UX Designer",
  ];

  res.status(200).json({ suggestions });
});

// Serve uploaded files (optional)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
