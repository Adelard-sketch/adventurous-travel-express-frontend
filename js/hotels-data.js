// Hotels Database - Beautiful Hotels Across Africa and Global Destinations
// Data includes luxury and mid-range hotels with realistic pricing

const hotelsData = {
  // African Hotels
  africa: {
    ghana: [
      {
        id: 'gh001',
        name: 'Kempinski Hotel Gold Coast City',
        location: 'Accra, Ghana',
        city: 'Accra',
        country: 'Ghana',
        region: 'West Africa',
        address: 'West Ridge, Accra',
        rating: 4.8,
        reviews: 2456,
        stars: 5,
        pricePerNight: 250,
        currency: 'USD',
        images: ['./assets/hotel1.jpg'],
        amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Bar', 'Conference Rooms', 'Airport Shuttle'],
        description: 'Luxurious 5-star hotel in the heart of Accra with panoramic city views',
        featured: true,
        type: 'luxury'
      },
      {
        id: 'gh002',
        name: 'Labadi Beach Hotel',
        location: 'La, Accra, Ghana',
        city: 'Accra',
        country: 'Ghana',
        region: 'West Africa',
        address: 'Labadi Beach Road, Accra',
        rating: 4.5,
        reviews: 1823,
        stars: 4,
        pricePerNight: 180,
        currency: 'USD',
        images: ['./assets/labadi-beach-hotel.jpg'],
        amenities: ['Beach Access', 'Pool', 'Restaurant', 'WiFi', 'Spa', 'Bar', 'Water Sports'],
        description: 'Beachfront resort with stunning ocean views and tropical gardens',
        featured: false,
        type: 'resort'
      }
    ],
    
    nigeria: [
      {
        id: 'ng001',
        name: 'Eko Hotel & Suites',
        location: 'Victoria Island, Lagos, Nigeria',
        city: 'Lagos',
        country: 'Nigeria',
        region: 'West Africa',
        address: 'Victoria Island, Lagos',
        rating: 4.7,
        reviews: 3421,
        stars: 5,
        pricePerNight: 220,
        currency: 'USD',
        images: ['./assets/hotel3.jpg'],
        amenities: ['Pool', 'Spa', 'Casino', 'Multiple Restaurants', 'WiFi', 'Gym', 'Beach Access'],
        description: 'Iconic luxury hotel on Victoria Island with world-class facilities',
        featured: true,
        type: 'luxury'
      },
      {
        id: 'ng002',
        name: 'Transcorp Hilton Abuja',
        location: 'Abuja, Nigeria',
        city: 'Abuja',
        country: 'Nigeria',
        region: 'West Africa',
        address: 'Central Business District, Abuja',
        rating: 4.6,
        reviews: 2134,
        stars: 5,
        pricePerNight: 200,
        currency: 'USD',
        images: ['./assets/hotel1.jpg'],
        amenities: ['Pool', 'Spa', 'Golf Course', 'Restaurant', 'WiFi', 'Gym', 'Conference Center'],
        description: 'Premier luxury hotel in Nigeria\'s capital with stunning architecture',
        featured: false,
        type: 'luxury'
      }
    ],
    
    kenya: [
      {
        id: 'ke001',
        name: 'Giraffe Manor',
        location: 'Nairobi, Kenya',
        city: 'Nairobi',
        country: 'Kenya',
        region: 'East Africa',
        address: 'Langata, Nairobi',
        rating: 4.9,
        reviews: 1567,
        stars: 5,
        pricePerNight: 850,
        currency: 'USD',
        images: ['./assets/giraffeManor.jpeg'],
        amenities: ['Giraffe Sanctuary', 'Restaurant', 'WiFi', 'Garden', 'Breakfast Included'],
        description: 'Exclusive boutique hotel where giraffes visit during breakfast',
        featured: true,
        type: 'boutique'
      },
      {
        id: 'ke002',
        name: 'Sarova Stanley',
        location: 'Nairobi, Kenya',
        city: 'Nairobi',
        country: 'Kenya',
        region: 'East Africa',
        address: 'Kimathi Street, Nairobi',
        rating: 4.5,
        reviews: 2891,
        stars: 4,
        pricePerNight: 150,
        currency: 'USD',
        images: ['./assets/hotel3.jpg'],
        amenities: ['Restaurant', 'Bar', 'WiFi', 'Gym', 'Conference Rooms', 'City Views'],
        description: 'Historic hotel in downtown Nairobi with colonial charm',
        featured: false,
        type: 'historic'
      }
    ],
    
    south_africa: [
      {
        id: 'za001',
        name: 'The Silo Hotel',
        location: 'Cape Town, South Africa',
        city: 'Cape Town',
        country: 'South Africa',
        region: 'Southern Africa',
        address: 'V&A Waterfront, Cape Town',
        rating: 4.9,
        reviews: 1892,
        stars: 5,
        pricePerNight: 600,
        currency: 'USD',
        images: ['./assets/hotel1.jpg'],
        amenities: ['Rooftop Pool', 'Spa', 'Restaurant', 'WiFi', 'Art Gallery', 'Bar', 'Concierge'],
        description: 'Contemporary luxury hotel in a converted grain silo with panoramic views',
        featured: true,
        type: 'luxury'
      },
      {
        id: 'za002',
        name: 'Saxon Hotel Johannesburg',
        location: 'Johannesburg, South Africa',
        city: 'Johannesburg',
        country: 'South Africa',
        region: 'Southern Africa',
        address: 'Sandhurst, Johannesburg',
        rating: 4.8,
        reviews: 1456,
        stars: 5,
        pricePerNight: 450,
        currency: 'USD',
        images: ['./assets/saxonHotel.jpeg'],
        amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Garden', 'Suite Accommodation'],
        description: 'Exclusive 5-star boutique hotel in lush gardens',
        featured: false,
        type: 'boutique'
      }
    ],
    
    egypt: [
      {
        id: 'eg001',
        name: 'Four Seasons Hotel Cairo at Nile Plaza',
        location: 'Cairo, Egypt',
        city: 'Cairo',
        country: 'Egypt',
        region: 'North Africa',
        address: 'Garden City, Cairo',
        rating: 4.8,
        reviews: 3234,
        stars: 5,
        pricePerNight: 300,
        currency: 'USD',
        images: ['./assets/hotel3.jpg'],
        amenities: ['Nile Views', 'Pool', 'Spa', 'Multiple Restaurants', 'WiFi', 'Gym', 'Casino'],
        description: 'Luxury hotel overlooking the Nile River with pyramid views',
        featured: true,
        type: 'luxury'
      },
      {
        id: 'eg002',
        name: 'Sofitel Winter Palace Luxor',
        location: 'Luxor, Egypt',
        city: 'Luxor',
        country: 'Egypt',
        region: 'North Africa',
        address: 'Corniche El Nil, Luxor',
        rating: 4.7,
        reviews: 2567,
        stars: 5,
        pricePerNight: 280,
        currency: 'USD',
        images: ['./assets/hotel1.jpg'],
        amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Garden', 'Nile Views', 'Historic Building'],
        description: 'Legendary Victorian hotel on the banks of the Nile',
        featured: false,
        type: 'historic'
      }
    ],
    
    morocco: [
      {
        id: 'ma001',
        name: 'La Mamounia',
        location: 'Marrakech, Morocco',
        city: 'Marrakech',
        country: 'Morocco',
        region: 'North Africa',
        address: 'Avenue Bab Jdid, Marrakech',
        rating: 4.9,
        reviews: 2134,
        stars: 5,
        pricePerNight: 550,
        currency: 'USD',
        images: ['./assets/laMamounia.jpeg'],
        amenities: ['Pool', 'Spa', 'Multiple Restaurants', 'WiFi', 'Gardens', 'Casino', 'Golf'],
        description: 'Iconic palace hotel set in 17 acres of gardens',
        featured: true,
        type: 'luxury'
      }
    ],
    
    tanzania: [
      {
        id: 'tz001',
        name: 'Four Seasons Safari Lodge Serengeti',
        location: 'Serengeti, Tanzania',
        city: 'Serengeti',
        country: 'Tanzania',
        region: 'East Africa',
        address: 'Serengeti National Park',
        rating: 4.9,
        reviews: 987,
        stars: 5,
        pricePerNight: 1200,
        currency: 'USD',
        images: ['./assets/hotel3.jpg'],
        amenities: ['Safari Experiences', 'Pool', 'Restaurant', 'WiFi', 'Spa', 'Wildlife Viewing'],
        description: 'Luxury safari lodge overlooking the endless Serengeti plains',
        featured: true,
        type: 'safari'
      }
    ],
    
    mauritius: [
      {
        id: 'mu001',
        name: 'One&Only Le Saint Géran',
        location: 'Belle Mare, Mauritius',
        city: 'Belle Mare',
        country: 'Mauritius',
        region: 'Indian Ocean',
        address: 'Coastal Road, Belle Mare',
        rating: 4.8,
        reviews: 1234,
        stars: 5,
        pricePerNight: 700,
        currency: 'USD',
        images: ['./assets/hotel1.jpg'],
        amenities: ['Beach Access', 'Pool', 'Spa', 'Water Sports', 'Restaurant', 'WiFi', 'Golf'],
        description: 'Exclusive beachfront resort on pristine white sand beach',
        featured: false,
        type: 'resort'
      }
    ],
    
    rwanda: [
      {
        id: 'rw001',
        name: 'Kigali Serena Hotel',
        location: 'Kigali, Rwanda',
        city: 'Kigali',
        country: 'Rwanda',
        region: 'East Africa',
        address: 'KN 3 Avenue, Kigali',
        rating: 4.6,
        reviews: 1456,
        stars: 5,
        pricePerNight: 220,
        currency: 'USD',
        images: ['./assets/hotel2.jpeg'],
        amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Conference Center'],
        description: 'Premier hotel in Rwanda\'s capital with modern amenities',
        featured: false,
        type: 'business'
      }
    ],
    
    ethiopia: [
      {
        id: 'et001',
        name: 'Sheraton Addis',
        location: 'Addis Ababa, Ethiopia',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        region: 'East Africa',
        address: 'Taitu Street, Addis Ababa',
        rating: 4.5,
        reviews: 2345,
        stars: 5,
        pricePerNight: 180,
        currency: 'USD',
        images: ['./assets/hotel3.jpg'],
        amenities: ['Pool', 'Casino', 'Multiple Restaurants', 'WiFi', 'Gym', 'Spa'],
        description: 'Largest hotel in East Africa with extensive facilities',
        featured: false,
        type: 'luxury'
      }
    ]
  },
  
  // Global Hotels
  global: [
    {
      id: 'gl001',
      name: 'Burj Al Arab',
      location: 'Dubai, UAE',
      city: 'Dubai',
      country: 'United Arab Emirates',
      region: 'Middle East',
      address: 'Jumeirah Beach Road, Dubai',
      rating: 5.0,
      reviews: 4567,
      stars: 7,
      pricePerNight: 2000,
      currency: 'USD',
      images: ['./assets/hotel1.jpg'],
      amenities: ['Private Beach', 'Helipad', 'Underwater Restaurant', 'Butler Service', 'Spa', 'Pool', 'WiFi'],
      description: 'World\'s most luxurious hotel - iconic sail-shaped structure',
      featured: true,
      type: 'ultra-luxury'
    },
    {
      id: 'gl002',
      name: 'The Ritz Paris',
      location: 'Paris, France',
      city: 'Paris',
      country: 'France',
      region: 'Europe',
      address: 'Place Vendôme, Paris',
      rating: 4.9,
      reviews: 3456,
      stars: 5,
      pricePerNight: 1500,
      currency: 'USD',
      images: ['./assets/jw_marriot.jpeg'],
      amenities: ['Spa', 'Restaurant', 'Bar Hemingway', 'WiFi', 'Cooking School', 'Garden'],
      description: 'Legendary Parisian palace hotel with unparalleled elegance',
      featured: true,
      type: 'luxury'
    },
    {
      id: 'gl003',
      name: 'Marina Bay Sands',
      location: 'Singapore',
      city: 'Singapore',
      country: 'Singapore',
      region: 'Asia',
      address: '10 Bayfront Avenue, Singapore',
      rating: 4.8,
      reviews: 5678,
      stars: 5,
      pricePerNight: 450,
      currency: 'USD',
      images: ['./assets/hotel3.jpg'],
      amenities: ['Infinity Pool', 'Casino', 'Shopping Mall', 'Multiple Restaurants', 'WiFi', 'Spa', 'SkyPark'],
      description: 'Iconic hotel with world-famous rooftop infinity pool',
      featured: true,
      type: 'luxury'
    },
    {
      id: 'gl004',
      name: 'Atlantis The Palm',
      location: 'Dubai, UAE',
      city: 'Dubai',
      country: 'United Arab Emirates',
      region: 'Middle East',
      address: 'Crescent Road, The Palm, Dubai',
      rating: 4.7,
      reviews: 4234,
      stars: 5,
      pricePerNight: 600,
      currency: 'USD',
      images: ['./assets/hotel1.jpg'],
      amenities: ['Aquarium', 'Water Park', 'Beach Access', 'Multiple Restaurants', 'WiFi', 'Spa', 'Dolphin Bay'],
      description: 'Mega-resort on Palm Jumeirah with aquatic adventures',
      featured: true,
      type: 'resort'
    },
    {
      id: 'gl005',
      name: 'Aman Tokyo',
      location: 'Tokyo, Japan',
      city: 'Tokyo',
      country: 'Japan',
      region: 'Asia',
      address: 'Otemachi Tower, Tokyo',
      rating: 4.9,
      reviews: 1876,
      stars: 5,
      pricePerNight: 950,
      currency: 'USD',
      images: ['./assets/hotel2.jpeg'],
      amenities: ['Spa', 'Pool', 'Restaurant', 'WiFi', 'Zen Garden', 'City Views'],
      description: 'Minimalist luxury hotel combining traditional Japanese aesthetics',
      featured: false,
      type: 'luxury'
    },
    {
      id: 'gl006',
      name: 'The Plaza New York',
      location: 'New York, USA',
      city: 'New York',
      country: 'United States',
      region: 'North America',
      address: 'Fifth Avenue, New York',
      rating: 4.7,
      reviews: 3567,
      stars: 5,
      pricePerNight: 800,
      currency: 'USD',
      images: ['./assets/hotel3.jpg'],
      amenities: ['Spa', 'Restaurant', 'Bar', 'WiFi', 'Central Park Views', 'Shopping'],
      description: 'Legendary New York landmark hotel since 1907',
      featured: false,
      type: 'historic'
    },
    {
      id: 'gl007',
      name: 'Raffles Singapore',
      location: 'Singapore',
      city: 'Singapore',
      country: 'Singapore',
      region: 'Asia',
      address: '1 Beach Road, Singapore',
      rating: 4.8,
      reviews: 2345,
      stars: 5,
      pricePerNight: 650,
      currency: 'USD',
      images: ['./assets/hotel1.jpg'],
      amenities: ['Pool', 'Spa', 'Multiple Restaurants', 'WiFi', 'Museum', 'Historic Architecture'],
      description: 'Colonial-era grand hotel and birthplace of the Singapore Sling',
      featured: false,
      type: 'historic'
    },
    {
      id: 'gl008',
      name: 'Copacabana Palace',
      location: 'Rio de Janeiro, Brazil',
      city: 'Rio de Janeiro',
      country: 'Brazil',
      region: 'South America',
      address: 'Copacabana Beach, Rio',
      rating: 4.8,
      reviews: 2134,
      stars: 5,
      pricePerNight: 500,
      currency: 'USD',
      images: ['./assets/hotel2.jpeg'],
      amenities: ['Beach Access', 'Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Golden Mile'],
      description: 'Iconic beachfront palace on Copacabana Beach',
      featured: false,
      type: 'luxury'
    },
    {
      id: 'gl009',
      name: 'Taj Lake Palace',
      location: 'Udaipur, India',
      city: 'Udaipur',
      country: 'India',
      region: 'Asia',
      address: 'Lake Pichola, Udaipur',
      rating: 4.9,
      reviews: 1678,
      stars: 5,
      pricePerNight: 550,
      currency: 'USD',
      images: ['./assets/hotel3.jpg'],
      amenities: ['Lake Views', 'Boat Access', 'Restaurant', 'WiFi', 'Spa', 'Palace Architecture'],
      description: 'Floating marble palace hotel in the middle of Lake Pichola',
      featured: true,
      type: 'palace'
    },
    {
      id: 'gl010',
      name: 'Shangri-La Bangkok',
      location: 'Bangkok, Thailand',
      city: 'Bangkok',
      country: 'Thailand',
      region: 'Asia',
      address: 'Charoen Krung Road, Bangkok',
      rating: 4.7,
      reviews: 3890,
      stars: 5,
      pricePerNight: 250,
      currency: 'USD',
      images: ['./assets/hotel1.jpg'],
      amenities: ['River Views', 'Pool', 'Spa', 'Multiple Restaurants', 'WiFi', 'Gym', 'Boat Shuttle'],
      description: 'Luxury riverside hotel with stunning views of the Chao Phraya River',
      featured: false,
      type: 'luxury'
    }
  ]
};

// Helper Functions

// Get all hotels (Africa + Global)
function getAllHotels() {
  const hotels = [];
  
  // Add African hotels
  Object.values(hotelsData.africa).forEach(countryHotels => {
    hotels.push(...countryHotels);
  });
  
  // Add global hotels
  hotels.push(...hotelsData.global);
  
  return hotels;
}

// Get featured hotels
function getFeaturedHotels() {
  return getAllHotels().filter(hotel => hotel.featured);
}

// Get hotels by region
function getHotelsByRegion(region) {
  return getAllHotels().filter(hotel => 
    hotel.region.toLowerCase() === region.toLowerCase()
  );
}

// Get hotels by country
function getHotelsByCountry(country) {
  return getAllHotels().filter(hotel => 
    hotel.country.toLowerCase() === country.toLowerCase()
  );
}

// Get hotels by price range
function getHotelsByPriceRange(minPrice, maxPrice) {
  return getAllHotels().filter(hotel => 
    hotel.pricePerNight >= minPrice && hotel.pricePerNight <= maxPrice
  );
}

// Get hotels by rating
function getHotelsByRating(minRating) {
  return getAllHotels().filter(hotel => hotel.rating >= minRating);
}

// Search hotels
function searchHotels(query) {
  const lowerQuery = query.toLowerCase();
  return getAllHotels().filter(hotel =>
    hotel.name.toLowerCase().includes(lowerQuery) ||
    hotel.city.toLowerCase().includes(lowerQuery) ||
    hotel.country.toLowerCase().includes(lowerQuery) ||
    hotel.description.toLowerCase().includes(lowerQuery)
  );
}

// Get hotels with specific amenities
function getHotelsByAmenities(amenities) {
  return getAllHotels().filter(hotel =>
    amenities.every(amenity => 
      hotel.amenities.some(hotelAmenity => 
        hotelAmenity.toLowerCase().includes(amenity.toLowerCase())
      )
    )
  );
}

// Get African hotels only
function getAfricanHotels() {
  const hotels = [];
  Object.values(hotelsData.africa).forEach(countryHotels => {
    hotels.push(...countryHotels);
  });
  return hotels;
}

// Get global hotels only
function getGlobalHotels() {
  return hotelsData.global;
}

// Get available countries
function getAvailableCountries() {
  const countries = new Set();
  getAllHotels().forEach(hotel => countries.add(hotel.country));
  return Array.from(countries).sort();
}

// Get available regions
function getAvailableRegions() {
  const regions = new Set();
  getAllHotels().forEach(hotel => regions.add(hotel.region));
  return Array.from(regions).sort();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    hotelsData,
    getAllHotels,
    getFeaturedHotels,
    getHotelsByRegion,
    getHotelsByCountry,
    getHotelsByPriceRange,
    getHotelsByRating,
    searchHotels,
    getHotelsByAmenities,
    getAfricanHotels,
    getGlobalHotels,
    getAvailableCountries,
    getAvailableRegions
  };
}
