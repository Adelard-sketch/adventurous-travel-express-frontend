const API_URL = "https://adventurous-travel-express-backend.vercel.app"; 
const API_BASE_URL = "https://adventurous-travel-express-backend.vercel.app/api"; 

const api = {
  get: async (endpoint, token) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return res.json();
  },

  post: async (endpoint, data, token) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  delete: async (endpoint, token) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return res.json();
  }
};
