const API_URL = "https://adventurous-travel-express-backend.vercel.app"; 
const API_BASE_URL = "https://adventurous-travel-express-backend.vercel.app/api"; 

const api = {
  get: async (endpoint, token) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', res.status, errorText);
        throw new Error(`API request failed: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  post: async (endpoint, data, token) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(data)
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', res.status, errorText);
        throw new Error(`API request failed: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  delete: async (endpoint, token) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', res.status, errorText);
        throw new Error(`API request failed: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
};
