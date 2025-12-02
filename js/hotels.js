// Hotels page JavaScript
console.log('Hotels page loaded');

// API Configuration
const API_BASE_URL = "https://adventurous-travel-express-backend.vercel.app/api";

// Global variables
let allHotels = [];
let filteredHotels = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Show loading state
  showLoadingState();
  
  // Load hotels with slight delay for smooth transition
  setTimeout(() => {
    loadHotels();
    setupFilterTags();
    setupDateInputs();
  }, 300);
});

// Load all hotels from data
function loadHotels() {
  allHotels = [];
  
  // Load African hotels
  if (hotelsData && hotelsData.africa) {
    Object.keys(hotelsData.africa).forEach(country => {
      allHotels = allHotels.concat(hotelsData.africa[country]);
    });
  }
  
  // Load Global hotels
  if (hotelsData && hotelsData.global) {
    Object.keys(hotelsData.global).forEach(country => {
      allHotels = allHotels.concat(hotelsData.global[country]);
    });
  }
  
  filteredHotels = [...allHotels];
  displayHotels(filteredHotels);
}

// Show loading state
function showLoadingState() {
  const hotelsGrid = document.getElementById('hotelsGrid');
  if (hotelsGrid) {
    hotelsGrid.innerHTML = `
      <div class="loading-state">
        <i class="fas fa-circle-notch fa-spin"></i>
        <p data-translate="loading">Loading amazing hotels...</p>
      </div>
    `;
    if (languageManager) {
      languageManager.translatePage();
    }
  }
}

// Display hotels in grid
function displayHotels(hotels) {
  const hotelsGrid = document.getElementById('hotelsGrid');
  
  if (!hotelsGrid) {
    console.error('Hotels grid not found');
    return;
  }
  
  if (hotels.length === 0) {
    hotelsGrid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-search"></i>
        <h3 data-translate="no_results">No hotels found</h3>
        <p>Try adjusting your filters or search criteria</p>
      </div>
    `;
    if (languageManager) {
      languageManager.translatePage();
    }
    return;
  }
  
  hotelsGrid.innerHTML = hotels.map(hotel => createHotelCard(hotel)).join('');
  
  // Setup wishlist buttons
  setupWishlistButtons();
  
  // Animate cards on load
  animateCards();
  
  // Apply translations to dynamically generated content
  if (languageManager) {
    languageManager.translatePage();
  }
}

// Animate hotel cards on load
function animateCards() {
  const cards = document.querySelectorAll('.hotel-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 50);
  });
}

// Create hotel card HTML
function createHotelCard(hotel) {
  const image = hotel.images && hotel.images.length > 0 ? hotel.images[0] : './assets/hotel-placeholder.jpg';
  const stars = '⭐'.repeat(hotel.stars || 4);
  const reviewsLabel = languageManager ? languageManager.translate('reviews') : 'reviews';
  const reviewText = hotel.reviews ? `${hotel.reviews.toLocaleString()} ${reviewsLabel}` : 'New listing';
  
  return `
    <div class="hotel-card" data-type="${hotel.type || 'standard'}">
      <div class="hotel-image">
        <img src="${image}" alt="${hotel.name}" onerror="this.src='./assets/hotel-placeholder.jpg'">
        ${hotel.featured ? '<div class="featured-badge">Featured</div>' : ''}
        <div class="hotel-rating-badge">${hotel.rating || 4.5}</div>
        <button class="wishlist-btn" aria-label="Add to wishlist">
          <i class="far fa-heart"></i>
        </button>
      </div>
      
      <div class="hotel-info">
        <div class="hotel-location">
          <i class="fas fa-map-marker-alt"></i>
          <span>${hotel.location}</span>
        </div>
        
        <h3 class="hotel-name">${hotel.name}</h3>
        
        ${hotel.description ? `<p class="hotel-description">${hotel.description}</p>` : ''}
        
        <div class="hotel-rating">
          <div class="rating-badge">${hotel.rating || 4.5}</div>
          <div class="rating-stars">
            ${stars}
          </div>
          <span class="rating-text">${reviewText}</span>
        </div>
        
        <div class="hotel-amenities">
          ${hotel.amenities.slice(0, 4).map(amenity => 
            `<div class="amenity"><i class="fas fa-check"></i> ${amenity}</div>`
          ).join('')}
        </div>
        
        <div class="hotel-footer">
          <div class="hotel-price">
            <span class="price-label" data-translate="from">From</span>
            <span class="price-amount">$${hotel.pricePerNight}</span>
            <span class="price-per-night" data-translate="per_night">/night</span>
          </div>
          <button class="btn-view-hotel" onclick="openBookingModal('${hotel.id}')">
            <span data-translate="book_now">Book Now</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Setup filter tags
function setupFilterTags() {
  const filterTags = document.querySelectorAll('.filter-tag');
  
  filterTags.forEach(tag => {
    tag.addEventListener('click', function() {
      // Remove active class from all tags
      filterTags.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tag
      this.classList.add('active');
      
      // Filter hotels
      const filterType = this.getAttribute('data-filter');
      filterHotelsByType(filterType);
    });
  });
}

// Filter hotels by type
function filterHotelsByType(type) {
  if (type === 'all') {
    filteredHotels = [...allHotels];
  } else {
    filteredHotels = allHotels.filter(hotel => hotel.type === type);
  }
  
  displayHotels(filteredHotels);
}

// Setup date inputs with minimum date
function setupDateInputs() {
  const today = new Date().toISOString().split('T')[0];
  const checkInInput = document.getElementById('checkIn');
  const checkOutInput = document.getElementById('checkOut');
  
  if (checkInInput) {
    checkInInput.setAttribute('min', today);
    checkInInput.addEventListener('change', function() {
      if (checkOutInput) {
        checkOutInput.setAttribute('min', this.value);
      }
    });
  }
}

// Search hotels function
window.searchHotels = function() {
  const destination = document.getElementById('destination').value.toLowerCase();
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  const guests = document.getElementById('guests').value;
  
  if (!destination) {
    alert('Please enter a destination');
    return;
  }
  
  if (!checkIn || !checkOut) {
    alert('Please select check-in and check-out dates');
    return;
  }
  
  // Filter hotels by destination
  filteredHotels = allHotels.filter(hotel => {
    const hotelLocation = (hotel.location + ' ' + hotel.city + ' ' + hotel.country).toLowerCase();
    return hotelLocation.includes(destination);
  });
  
  if (filteredHotels.length === 0) {
    alert('No hotels found for this destination. Showing all hotels.');
    filteredHotels = [...allHotels];
  }
  
  displayHotels(filteredHotels);
};

// Setup wishlist buttons
function setupWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const icon = this.querySelector('i');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
      
      if (icon.classList.contains('fas')) {
        this.style.color = '#ff385c';
      } else {
        this.style.color = '#fff';
      }
    });
  });
}

// Open booking modal
window.openBookingModal = function(hotelId) {
  const hotel = allHotels.find(h => h.id === hotelId);
  
  if (!hotel) {
    alert('Hotel not found');
    return;
  }
  
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  const guests = parseInt(document.getElementById('guests').value) || 2;
  
  if (!checkIn || !checkOut) {
    alert('⚠️ Please select check-in and check-out dates first');
    document.getElementById('checkIn').focus();
    return;
  }
  
  // Calculate number of nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  
  if (nights <= 0) {
    alert('⚠️ Check-out date must be after check-in date');
    document.getElementById('checkOut').focus();
    return;
  }
  
  const totalPrice = hotel.pricePerNight * nights;
  const pricePerNightFormatted = hotel.pricePerNight.toLocaleString();
  const totalPriceFormatted = totalPrice.toLocaleString();
  
  // Confirm booking with better formatting
  const confirmed = confirm(
    `🏨 ${hotel.name}\n` +
    `📍 ${hotel.location}\n\n` +
    `📅 Check-in: ${formatDate(checkIn)}\n` +
    `📅 Check-out: ${formatDate(checkOut)}\n` +
    `🌙 Nights: ${nights}\n` +
    `👥 Guests: ${guests}\n` +
    `🛏️ Rooms: ${Math.ceil(guests / 2)}\n\n` +
    `💰 Price per night: $${pricePerNightFormatted}\n` +
    `💳 Total Price: $${totalPriceFormatted}\n\n` +
    `Click OK to proceed with booking.`
  );
  
  if (confirmed) {
    bookHotel({
      hotelId: hotel.id,
      name: hotel.name,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
      rooms: Math.ceil(guests / 2),
      roomType: 'Standard',
      price: totalPrice,
      nights: nights
    });
  }
};

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Hotel Booking Function
async function bookHotel(hotelData) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    alert('Please login to book a hotel');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const bookingData = {
      bookingType: 'hotel',
      hotelName: hotelData.name,
      checkInDate: hotelData.checkIn,
      checkOutDate: hotelData.checkOut,
      roomType: hotelData.roomType || 'Standard',
      numberOfRooms: hotelData.rooms || 1,
      guests: hotelData.guests || 2,
      totalPrice: hotelData.price,
      currency: 'USD',
      status: 'confirmed',
      paymentStatus: 'pending'
    };
    
    console.log('Creating hotel booking:', bookingData);
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
    });
    
    console.log('Hotel booking response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Hotel booking failed:', errorData);
      throw new Error('Failed to create booking');
    }
    
    const result = await response.json();
    console.log('Hotel booking created successfully:', result);
    const bookingId = result.data._id.substring(0, 8).toUpperCase();
    alert(
      `✅ Hotel Booked Successfully!\n\n` +
      `🏨 ${hotelData.name}\n` +
      `🆔 Booking ID: ${bookingId}\n` +
      `💳 Total: $${hotelData.price.toLocaleString()}\n` +
      `📅 ${hotelData.nights} night${hotelData.nights > 1 ? 's' : ''}\n\n` +
      `Redirecting to your dashboard...`
    );
    
    // Smooth transition to dashboard
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
    
  } catch (error) {
    console.error('Booking error:', error);
    alert('Failed to create booking. Please try again.');
  }
}
