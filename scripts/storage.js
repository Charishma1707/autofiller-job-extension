// Save a resume to local storage
export const saveResume = (resumeName, resumeFile) => {
  const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
  resumes.push({ name: resumeName, file: resumeFile });
  localStorage.setItem("resumes", JSON.stringify(resumes));
};

// Retrieve all resumes from local storage
export const getResumes = () => {
  return JSON.parse(localStorage.getItem("resumes")) || [];
};

// Save additional user details
export const saveUserDetails = (details) => {
  localStorage.setItem("userDetails", JSON.stringify(details));
};

// Retrieve additional user details
export const getUserDetails = () => {
  return JSON.parse(localStorage.getItem("userDetails")) || {};
};

// Save job description details
export const saveJobDescription = (jobId, jobDetails) => {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || {};
  jobs[jobId] = jobDetails;
  localStorage.setItem("jobs", JSON.stringify(jobs));
};

// Retrieve a specific job description by ID
export const getJobDescription = (jobId) => {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || {};
  return jobs[jobId] || null;
};

// Retrieve all job descriptions
export const getAllJobDescriptions = () => {
  return JSON.parse(localStorage.getItem("jobs")) || {};
};
