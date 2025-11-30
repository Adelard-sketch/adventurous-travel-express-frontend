// Ghana Locations Database
// This file contains all popular locations in Ghana for the taxi booking system

const ghanaLocationsData = {
  // Greater Accra Region
  accra: {
    region: 'Greater Accra',
    locations: [
      { name: 'Kotoka International Airport', type: 'airport', popular: true },
      { name: 'Osu Oxford Street', type: 'commercial', popular: true },
      { name: 'Accra Mall', type: 'shopping', popular: true },
      { name: 'Labadi Beach', type: 'tourist', popular: true },
      { name: 'East Legon', type: 'residential', popular: true },
      { name: 'Legon - University of Ghana', type: 'educational', popular: true },
      { name: 'Tema', type: 'industrial', popular: true },
      { name: 'Madina', type: 'residential', popular: true },
      { name: 'Circle', type: 'commercial', popular: true },
      { name: 'Spintex Road', type: 'commercial', popular: false },
      { name: 'Cantonments', type: 'residential', popular: false },
      { name: 'Airport Residential Area', type: 'residential', popular: false },
      { name: 'Dansoman', type: 'residential', popular: false },
      { name: 'Achimota', type: 'residential', popular: false },
      { name: 'Lapaz', type: 'commercial', popular: false },
      { name: 'Kwame Nkrumah Circle', type: 'commercial', popular: false },
      { name: 'Independence Square', type: 'tourist', popular: false },
      { name: 'Makola Market', type: 'shopping', popular: false },
      { name: 'James Town', type: 'cultural', popular: false },
      { name: 'La Beach', type: 'tourist', popular: false },
      { name: 'Teshie', type: 'residential', popular: false },
      { name: 'Nungua', type: 'residential', popular: false },
      { name: 'Haatso', type: 'residential', popular: false },
      { name: 'Adenta', type: 'residential', popular: false },
      { name: 'Tesano', type: 'residential', popular: false },
      { name: 'North Kaneshie', type: 'commercial', popular: false },
      { name: 'Abeka', type: 'residential', popular: false },
      { name: 'Santa Maria', type: 'residential', popular: false },
      { name: 'Weija', type: 'residential', popular: false },
      { name: 'Kasoa', type: 'residential', popular: false }
    ]
  },
  
  // Ashanti Region
  kumasi: {
    region: 'Ashanti',
    locations: [
      { name: 'Kumasi Airport', type: 'airport', popular: true },
      { name: 'Kejetia Market', type: 'shopping', popular: true },
      { name: 'Adum', type: 'commercial', popular: true },
      { name: 'KNUST Campus', type: 'educational', popular: true },
      { name: 'Asokwa', type: 'residential', popular: false },
      { name: 'Bantama', type: 'residential', popular: false },
      { name: 'Suame', type: 'industrial', popular: false },
      { name: 'Manhyia Palace', type: 'cultural', popular: true },
      { name: 'Kumasi Central Market', type: 'shopping', popular: false },
      { name: 'Ahodwo', type: 'residential', popular: false },
      { name: 'Airport Roundabout', type: 'commercial', popular: false },
      { name: 'Tech Junction', type: 'commercial', popular: false }
    ]
  },
  
  // Western Region
  takoradi: {
    region: 'Western',
    locations: [
      { name: 'Takoradi Market Circle', type: 'commercial', popular: true },
      { name: 'Takoradi Harbour', type: 'industrial', popular: true },
      { name: 'Beach Road', type: 'tourist', popular: true },
      { name: 'Airport Ridge', type: 'residential', popular: false },
      { name: 'Effiakuma', type: 'residential', popular: false },
      { name: 'Kojokrom', type: 'residential', popular: false },
      { name: 'Tanokrom', type: 'residential', popular: false }
    ]
  },
  
  // Central Region
  cape_coast: {
    region: 'Central',
    locations: [
      { name: 'Cape Coast Castle', type: 'tourist', popular: true },
      { name: 'University of Cape Coast', type: 'educational', popular: true },
      { name: 'Cape Coast Market', type: 'shopping', popular: false },
      { name: 'Kotokuraba Market', type: 'shopping', popular: false },
      { name: 'Pedu Junction', type: 'commercial', popular: false },
      { name: 'Kakumdo', type: 'tourist', popular: false }
    ]
  },
  
  // Northern Region
  tamale: {
    region: 'Northern',
    locations: [
      { name: 'Tamale Airport', type: 'airport', popular: true },
      { name: 'Tamale Central Market', type: 'shopping', popular: true },
      { name: 'University for Development Studies', type: 'educational', popular: true },
      { name: 'Aboabo', type: 'residential', popular: false },
      { name: 'Kalpohin', type: 'residential', popular: false },
      { name: 'Vittin', type: 'residential', popular: false }
    ]
  }
};

// Get all locations as flat array
function getAllLocations() {
  const allLocations = [];
  Object.values(ghanaLocationsData).forEach(cityData => {
    cityData.locations.forEach(location => {
      allLocations.push({
        name: location.name,
        region: cityData.region,
        type: location.type,
        popular: location.popular
      });
    });
  });
  return allLocations;
}

// Get only popular locations
function getPopularLocations() {
  return getAllLocations().filter(loc => loc.popular);
}

// Get locations by region
function getLocationsByRegion(region) {
  const allLocations = getAllLocations();
  return allLocations.filter(loc => loc.region === region);
}

// Get locations by type
function getLocationsByType(type) {
  const allLocations = getAllLocations();
  return allLocations.filter(loc => loc.type === type);
}

// Search locations
function searchLocations(query) {
  const allLocations = getAllLocations();
  const lowerQuery = query.toLowerCase();
  return allLocations.filter(loc => 
    loc.name.toLowerCase().includes(lowerQuery) ||
    loc.region.toLowerCase().includes(lowerQuery) ||
    loc.type.toLowerCase().includes(lowerQuery)
  );
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ghanaLocationsData,
    getAllLocations,
    getPopularLocations,
    getLocationsByRegion,
    getLocationsByType,
    searchLocations
  };
}
