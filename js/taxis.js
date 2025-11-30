
const vehicleTypes = [
  {
    id: 'sedan',
    name: 'Standard Sedan',
    description: 'Comfortable rides for everyday trips',
    passengers: 4,
    luggage: 2,
    basePrice: 15, 
    pricePerKm: 2.5,
    image: './assets/car1.jpeg',
    rating: 4.8,
    totalRides: 1234,
    popular: false
  },
  {
    id: 'suv',
    name: 'Premium SUV',
    description: 'Extra space for groups and families',
    passengers: 6,
    luggage: 4,
    basePrice: 25,
    pricePerKm: 4.0,
    image: './assets/car2.jpg',
    rating: 4.9,
    totalRides: 2456,
    popular: true
  },
  {
    id: 'luxury',
    name: 'Luxury Car',
    description: 'Premium comfort and style',
    passengers: 4,
    luggage: 3,
    basePrice: 40,
    pricePerKm: 6.0,
    image: './assets/carBest.jpg',
    rating: 5.0,
    totalRides: 892,
    popular: false
  },
  {
    id: 'van',
    name: 'Large Van',
    description: 'Perfect for large groups',
    passengers: 8,
    luggage: 6,
    basePrice: 50,
    pricePerKm: 7.0,
    image: './assets/carBest2.jpg',
    rating: 4.7,
    totalRides: 567,
    popular: false
  }
];

// Popular routes in Ghana with approximate distances (km)
const popularRoutes = {
  'Kotoka International Airport -> Osu Oxford Street': 8,
  'Kotoka International Airport -> Accra Mall': 4,
  'Kotoka International Airport -> East Legon': 12,
  'Kotoka International Airport -> Tema': 25,
  'Osu Oxford Street -> Accra Mall': 6,
  'Osu Oxford Street -> Labadi Beach': 3,
  'Accra Mall -> East Legon': 5,
  'Accra Mall -> Legon - University of Ghana': 8,
  'Circle -> Accra Mall': 10,
  'Circle -> Madina': 12,
  'Madina -> Legon - University of Ghana': 5,
  'Tema -> Kotoka International Airport': 25,
  'Lapaz -> Circle': 8,
  'Achimota -> Circle': 6,
  'Dansoman -> Accra Mall': 15,
  'Spintex Road -> Accra Mall': 8,
  'East Legon -> Airport Residential Area': 4,
  'Cantonments -> Osu Oxford Street': 3,
  'Kasoa -> Accra Mall': 35,
  'Weija -> Circle': 20
};

// Calculate distance between two locations
function calculateDistance(pickup, dropoff) {
  const route = `${pickup} -> ${dropoff}`;
  const reverseRoute = `${dropoff} -> ${pickup}`;
  
  // Check if it's a known route
  if (popularRoutes[route]) {
    return popularRoutes[route];
  } else if (popularRoutes[reverseRoute]) {
    return popularRoutes[reverseRoute];
  }
  
  // Estimate based on location type
  if (pickup === dropoff) return 0;
  
  // Check if same area
  const pickupArea = pickup.toLowerCase();
  const dropoffArea = dropoff.toLowerCase();
  
  if (pickupArea.includes('airport') && dropoffArea.includes('airport')) return 2;
  if (pickupArea.includes('airport') || dropoffArea.includes('airport')) return Math.floor(Math.random() * 20) + 10;
  
  // Random estimate for other routes (5-40 km)
  return Math.floor(Math.random() * 35) + 5;
}

// Calculate price for a route
function calculatePrice(vehicleType, distance) {
  const vehicle = vehicleTypes.find(v => v.id === vehicleType);
  if (!vehicle) return 0;
  
  const price = vehicle.basePrice + (distance * vehicle.pricePerKm);
  return Math.ceil(price); // Round up
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  populateLocationDropdowns();
  initializeRideTypeSelector();
  initializeLuggageSelector();
  initializeFormSubmission();
  initializeCurrentLocation();
  displayDefaultVehicles();
});

// Populate location dropdowns
function populateLocationDropdowns() {
  const pickupSelect = document.getElementById('pickup-select');
  const dropoffSelect = document.getElementById('dropoff-select');
  
  if (!pickupSelect || !dropoffSelect) return;
  
  // Get all locations from ghana-locations.js
  const allLocations = getAllLocations();
  const popularLocations = getPopularLocations();
  
  // Add popular locations first (if function exists)
  if (typeof getPopularLocations === 'function' && popularLocations.length > 0) {
    const popularOptgroup = document.createElement('optgroup');
    popularOptgroup.label = 'Popular Locations';
    
    popularLocations.forEach(location => {
      const option = document.createElement('option');
      option.value = location.name;
      option.textContent = location.name;
      popularOptgroup.appendChild(option);
    });
    
    pickupSelect.appendChild(popularOptgroup.cloneNode(true));
    dropoffSelect.appendChild(popularOptgroup.cloneNode(true));
  }
  
  // Group other locations by region
  const regions = {};
  allLocations.forEach(location => {
    if (!location.popular) {
      if (!regions[location.region]) {
        regions[location.region] = [];
      }
      regions[location.region].push(location);
    }
  });
  
  // Add each region as optgroup
  Object.keys(regions).sort().forEach(region => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = region + ' Region';
    
    regions[region].forEach(location => {
      const option = document.createElement('option');
      option.value = location.name;
      option.textContent = location.name;
      optgroup.appendChild(option);
    });
    
    pickupSelect.appendChild(optgroup.cloneNode(true));
    dropoffSelect.appendChild(optgroup.cloneNode(true));
  });
}

// Ride type selector
function initializeRideTypeSelector() {
  const rideTypes = document.querySelectorAll('.ride-type');
  
  rideTypes.forEach(button => {
    button.addEventListener('click', function() {
      rideTypes.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// Luggage selector
function initializeLuggageSelector() {
  const luggageInput = document.querySelector('input[name="luggage"]');
  const minusBtn = document.querySelector('.luggage-btn[data-count="minus"]');
  const plusBtn = document.querySelector('.luggage-btn[data-count="plus"]');
  
  if (minusBtn) {
    minusBtn.addEventListener('click', function() {
      let value = parseInt(luggageInput.value) || 0;
      if (value > 0) {
        luggageInput.value = value - 1;
      }
    });
  }
  
  if (plusBtn) {
    plusBtn.addEventListener('click', function() {
      let value = parseInt(luggageInput.value) || 0;
      if (value < 10) {
        luggageInput.value = value + 1;
      }
    });
  }
}

// Current location button
function initializeCurrentLocation() {
  const currentLocationBtn = document.querySelector('.btn-current-location');
  
  if (currentLocationBtn) {
    currentLocationBtn.addEventListener('click', function() {
      // Simulate getting current location (use a default Accra location)
      const defaultLocation = 'Osu Oxford Street';
      const pickupSelect = document.getElementById('pickup-select');
      
      if (pickupSelect) {
        pickupSelect.value = defaultLocation;
        
        // Trigger change event
        pickupSelect.dispatchEvent(new Event('change'));
        
        // Show feedback
        this.innerHTML = '<i class="fas fa-check"></i> Location set';
        this.style.background = '#28a745';
        this.style.color = 'white';
        this.style.borderColor = '#28a745';
        
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-crosshairs"></i> Use current location';
          this.style.background = '';
          this.style.color = '';
          this.style.borderColor = '';
        }, 2000);
      }
    });
  }
}

// Form submission
function initializeFormSubmission() {
  const form = document.getElementById('taxiForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const pickup = formData.get('pickup');
      const dropoff = formData.get('dropoff');
      const passengers = formData.get('passengers');
      const luggage = formData.get('luggage');
      
      if (!pickup || !dropoff) {
        alert('Please enter both pickup and dropoff locations');
        return;
      }
      
      // Calculate distance and show vehicles with prices
      const distance = calculateDistance(pickup, dropoff);
      displayVehiclesWithPrices(distance, pickup, dropoff, passengers, luggage);
      
      // Scroll to vehicles section
      document.getElementById('availableVehicles').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
}

// Display default vehicles
function displayDefaultVehicles() {
  const vehiclesContainer = document.getElementById('availableVehicles');
  if (!vehiclesContainer) return;
  
  const vehiclesHTML = `
    <h3>Available Vehicles</h3>
    <p class="vehicles-subtitle">Enter your pickup and dropoff locations to see exact prices</p>
    <div class="vehicles-grid">
      ${vehicleTypes.map(vehicle => createVehicleCard(vehicle, null, null, null)).join('')}
    </div>
  `;
  
  vehiclesContainer.innerHTML = vehiclesHTML;
  attachVehicleButtonListeners();
}

// Display vehicles with calculated prices
function displayVehiclesWithPrices(distance, pickup, dropoff, passengers, luggage) {
  const vehiclesContainer = document.getElementById('availableVehicles');
  if (!vehiclesContainer) return;
  
  const routeInfo = `
    <div class="route-info-card">
      <h4>
        <i class="fas fa-route"></i> Your Route
      </h4>
      <div class="route-details">
        <span class="location-name">${pickup}</span>
        <i class="fas fa-arrow-right route-arrow"></i>
        <span class="location-name">${dropoff}</span>
      </div>
      <div class="distance-info">
        <i class="fas fa-road"></i> Estimated Distance: <strong>${distance} km</strong>
      </div>
    </div>
  `;
  
  const vehiclesHTML = `
    <h3>Available Vehicles</h3>
    ${routeInfo}
    <div class="vehicles-grid">
      ${vehicleTypes.map(vehicle => {
        const price = calculatePrice(vehicle.id, distance);
        return createVehicleCard(vehicle, price, pickup, dropoff);
      }).join('')}
    </div>
  `;
  
  vehiclesContainer.innerHTML = vehiclesHTML;
  attachVehicleButtonListeners();
}

// Create vehicle card HTML
function createVehicleCard(vehicle, price, pickup, dropoff) {
  const finalPrice = price || vehicle.basePrice;
  const priceDisplay = price ? `GH₵ ${price}` : 'From GH₵ ' + vehicle.basePrice;
  const priceLabel = price ? 'Total Price' : 'Starting Price';
  const popularBadge = vehicle.popular ? '<div class="popular-badge">Most Popular</div>' : '';
  const featuredClass = vehicle.popular ? 'featured' : '';
  
  return `
    <div class="vehicle-card ${featuredClass}" data-vehicle-id="${vehicle.id}" data-price="${finalPrice}">
      ${popularBadge}
      <div class="vehicle-image">
        <img src="${vehicle.image}" alt="${vehicle.name}" />
      </div>
      <div class="vehicle-info">
        <h4>${vehicle.name}</h4>
        <p class="vehicle-features">
          <i class="fas fa-users"></i> ${vehicle.passengers} <i class="fas fa-suitcase"></i> ${vehicle.luggage}
        </p>
      </div>
      <div class="vehicle-price">
        <span class="price-label">${priceLabel}</span>
        <h3>${priceDisplay}</h3>
        <button class="btn-select-vehicle ${vehicle.popular ? 'primary' : ''}" 
                data-vehicle="${vehicle.id}"
                data-price="${finalPrice}"
                data-pickup="${pickup || ''}"
                data-dropoff="${dropoff || ''}">
          Select
        </button>
      </div>
    </div>
  `;
}

// Attach listeners to vehicle selection buttons
function attachVehicleButtonListeners() {
  const selectButtons = document.querySelectorAll('.btn-select-vehicle');
  
  selectButtons.forEach(button => {
    button.addEventListener('click', function() {
      const vehicleId = this.getAttribute('data-vehicle');
      const price = this.getAttribute('data-price');
      const pickup = this.getAttribute('data-pickup');
      const dropoff = this.getAttribute('data-dropoff');
      
      if (!pickup || !dropoff) {
        alert('Please enter pickup and dropoff locations first');
        return;
      }
      
      // Remove selected class from all cards
      document.querySelectorAll('.vehicle-card').forEach(card => {
        card.classList.remove('selected');
      });
      
      // Add selected class to clicked card
      this.closest('.vehicle-card').classList.add('selected');
      
      // Show booking confirmation
      showBookingConfirmation(vehicleId, price, pickup, dropoff);
    });
  });
}

// Show booking confirmation
function showBookingConfirmation(vehicleId, price, pickup, dropoff) {
  const vehicle = vehicleTypes.find(v => v.id === vehicleId);
  if (!vehicle) return;
  
  const confirmation = `
    <div class="modal-overlay" id="booking-modal">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-icon">
            <i class="fas fa-car"></i>
          </div>
          <h3>Confirm Your Booking</h3>
          <p>Review your trip details</p>
        </div>
        
        <div class="modal-body">
          <div class="booking-detail">
            <strong>Vehicle:</strong>
            <div class="detail-value">${vehicle.name}</div>
          </div>
          <div class="booking-detail">
            <strong>Pickup:</strong>
            <div class="detail-value">${pickup}</div>
          </div>
          <div class="booking-detail">
            <strong>Dropoff:</strong>
            <div class="detail-value">${dropoff}</div>
          </div>
          <div class="booking-detail price-detail">
            <strong>Total Price:</strong>
            <div class="detail-price">GH₵ ${price}</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button onclick="closeBookingModal()" class="btn-modal-cancel">
            Cancel
          </button>
          <button onclick="confirmBooking('${vehicleId}', '${price}', '${pickup}', '${dropoff}')" class="btn-modal-confirm">
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Remove existing modal if any
  const existingModal = document.getElementById('booking-modal');
  if (existingModal) existingModal.remove();
  
  // Add new modal
  document.body.insertAdjacentHTML('beforeend', confirmation);
}

// Close booking modal
window.closeBookingModal = function() {
  const modal = document.getElementById('booking-modal');
  if (modal) modal.remove();
};

// Confirm booking
window.confirmBooking = async function(vehicleId, price, pickup, dropoff) {
  const vehicle = vehicleTypes.find(v => v.id === vehicleId);
  const token = localStorage.getItem('token');
  
  if (!token) {
    alert('Please login to complete your booking');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    // Save booking to database
    const bookingData = {
      bookingType: 'taxi',
      vehicleType: vehicle.name,
      vehicleModel: vehicle.name,
      pickupLocation: pickup,
      dropoffLocation: dropoff,
      pickupDate: new Date(),
      totalPrice: parseFloat(price) || 0,
      currency: 'GHS',
      status: 'confirmed',
      paymentStatus: 'pending'
    };
    
    console.log('Creating taxi booking:', bookingData);
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
    });
    
    console.log('Booking response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Booking failed:', errorData);
      throw new Error('Failed to create booking');
    }
    
    const result = await response.json();
    console.log('Booking created successfully:', result);
    const bookingId = result.data._id;
    
    // Close modal
    closeBookingModal();
    
    // Show success message
    const success = `
      <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 24px 32px; border-radius: 12px; box-shadow: 0 8px 32px rgba(40, 167, 69, 0.3); z-index: 10000; max-width: 400px; animation: slideIn 0.3s ease;" id="success-message">
        <div style="display: flex; align-items: center; gap: 16px;">
          <i class="fas fa-check-circle" style="font-size: 2.5rem;"></i>
          <div>
            <h4 style="margin: 0 0 8px 0;">Booking Confirmed!</h4>
            <p style="margin: 0; opacity: 0.9; font-size: 0.9rem;">Your ${vehicle.name} has been booked.</p>
            <p style="margin: 8px 0 0 0; font-weight: 600;">Booking ID: #${bookingId.slice(-6).toUpperCase()}</p>
            <a href="dashboard.html" style="display: inline-block; margin-top: 12px; padding: 8px 16px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 6px; font-size: 0.9rem;">View Booking</a>
          </div>
        </div>
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    `;
    
    document.body.insertAdjacentHTML('beforeend', success);
    
    setTimeout(() => {
      const successMsg = document.getElementById('success-message');
      if (successMsg) {
        successMsg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          successMsg.remove();
          window.location.href = 'dashboard.html';
        }, 300);
      }
    }, 3000);
    
  } catch (error) {
    console.error('Booking error:', error);
    alert('Failed to create booking. Please try again.');
  }
};

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ghanaLocations,
    vehicleTypes,
    calculateDistance,
    calculatePrice
  };
}
