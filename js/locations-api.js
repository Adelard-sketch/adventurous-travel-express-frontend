// Ghana Locations API Wrapper
// Provides the same interface as ghana-locations.js but fetches from database

const API_BASE_URL = "https://adventurous-travel-express-backend.vercel.app/api";
let locationsCache = null;
let locationsFetchPromise = null;

// Fetch all locations from API
async function fetchLocationsFromAPI() {
  if (locationsCache) {
    return locationsCache;
  }
  
  // Prevent multiple simultaneous fetches
  if (locationsFetchPromise) {
    return locationsFetchPromise;
  }
  
  locationsFetchPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/locations`);
      const data = await response.json();
      
      if (data.success) {
        locationsCache = data.data;
        console.log(`✅ Loaded ${locationsCache.length} locations from database`);
        return locationsCache;
      } else {
        console.error('❌ Failed to load locations:', data.message);
        return [];
      }
    } catch (error) {
      console.error('❌ Error loading locations:', error);
      return [];
    } finally {
      locationsFetchPromise = null;
    }
  })();
  
  return locationsFetchPromise;
}

// Get all locations as flat array (async version)
async function getAllLocationsAsync() {
  const locations = await fetchLocationsFromAPI();
  return locations;
}

// Get all locations (synchronous - returns cached data or empty array)
function getAllLocations() {
  if (locationsCache) {
    return locationsCache;
  }
  
  // If not cached, fetch async and return empty for now
  fetchLocationsFromAPI();
  return [];
}

// Get only popular locations
function getPopularLocations() {
  return getAllLocations().filter(loc => loc.popular);
}

// Get locations by region
function getLocationsByRegion(region) {
  return getAllLocations().filter(loc => loc.region === region);
}

// Get locations by type
function getLocationsByType(type) {
  return getAllLocations().filter(loc => loc.type === type);
}

// Search locations by query
function searchLocations(query) {
  if (!query) return getAllLocations();
  const lowerQuery = query.toLowerCase();
  return getAllLocations().filter(loc =>
    loc.name.toLowerCase().includes(lowerQuery) ||
    loc.region.toLowerCase().includes(lowerQuery) ||
    loc.type.toLowerCase().includes(lowerQuery)
  );
}

// Initialize locations on page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    fetchLocationsFromAPI();
  });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    fetchLocationsFromAPI,
    getAllLocations,
    getAllLocationsAsync,
    getPopularLocations,
    getLocationsByRegion,
    getLocationsByType,
    searchLocations
  };
}
