import axios from 'axios';

// Use the environment variable for the API URL.
// The `REACT_APP_` prefix is a convention used by Create React App.
const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

// Function to get the full URL for media files
export const getMediaUrl = (relativePath) => {
  if (!relativePath) {
    return null;
  }
  // If the path is already a full URL, return it as is
  if (relativePath.startsWith('http')) {
    return relativePath;
  }
  // Otherwise, construct the full URL
  return `${API_URL}${relativePath}`;
};

export default apiClient;
