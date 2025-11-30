// Dashboard functionality
document.addEventListener('DOMContentLoaded', async () => {
  // Check if user is logged in
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Update user name in dashboard
  const userNameElements = document.querySelectorAll('#userName, #dashboardUserName');
  userNameElements.forEach(el => {
    if (el.id === 'userName') {
      el.textContent = user.name ? user.name.split(' ')[0] : 'Traveler';
    } else {
      el.textContent = user.name || 'Traveler';
    }
  });

  // Show admin link if user is admin
  if (user.role === 'admin') {
    const adminLink = document.getElementById('adminLink');
    if (adminLink) {
      adminLink.style.display = 'inline-block';
    }
  }

  // Load all bookings
  await loadAllBookings();

  // Setup logout functionality
  setupLogout();
  
  // Setup booking filters
  setupBookingFilters();
  
  // Setup filter tabs
  setupFilterTabs();
});

// Logout function
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// Setup booking filters
function setupBookingFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter type
      const filter = this.dataset.filter;
      
      // Filter bookings
      filterBookings(filter);
    });
  });
}

// Filter bookings based on type
function filterBookings(filter) {
  const bookingCards = document.querySelectorAll('.booking-card');
  const now = new Date();
  
  bookingCards.forEach(card => {
    const status = card.dataset.status;
    const paymentStatus = card.dataset.paymentStatus;
    const dateStr = card.dataset.date;
    const bookingDate = dateStr ? new Date(dateStr) : null;
    
    let shouldShow = false;
    
    switch(filter) {
      case 'all':
        shouldShow = true;
        break;
      case 'confirmed':
        shouldShow = status === 'confirmed';
        break;
      case 'upcoming':
        shouldShow = bookingDate && bookingDate > now && status !== 'cancelled';
        break;
      case 'past':
        shouldShow = bookingDate && bookingDate <= now;
        break;
      case 'pending':
        shouldShow = paymentStatus === 'pending';
        break;
    }
    
    card.style.display = shouldShow ? 'flex' : 'none';
  });
}

// Load all user bookings
async function loadAllBookings() {
  try {
    console.log('Loading bookings from:', `${API_BASE_URL}/bookings`);
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to load bookings');
    }

    const result = await response.json();
    console.log('Bookings API response:', result);
    const bookings = result.data || [];
    console.log('Total bookings loaded:', bookings.length);

    // Update stats
    updateDashboardStats(bookings);

    // Display bookings
    displayBookings(bookings);

  } catch (error) {
    console.error('Error loading bookings:', error);
    showNotification('Failed to load bookings', 'error');
  }
}

// Update dashboard statistics
function updateDashboardStats(bookings) {
  const totalBookings = bookings.length;
  const upcomingTrips = bookings.filter(b => {
    const startDate = b.departureDate || b.startDate || b.checkInDate || b.visitDate || b.pickupDate;
    if (!startDate) return false;
    return new Date(startDate) > new Date() && b.status !== 'cancelled';
  }).length;

  const paidBookings = bookings.filter(b => b.paymentStatus === 'paid').length;
  const totalSpent = bookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  // Update stat boxes (simplified 3-stat layout)
  const statBoxes = document.querySelectorAll('.stat-box .stat-details h3');
  if (statBoxes.length >= 3) {
    statBoxes[0].textContent = totalBookings;
    statBoxes[1].textContent = upcomingTrips;
    statBoxes[2].textContent = `$${totalSpent.toLocaleString()}`;
  }
}

// Display all bookings
function displayBookings(bookings) {
  const bookingsContainer = document.getElementById('allBookingsContainer');
  
  if (!bookingsContainer) {
    console.warn('Bookings container not found');
    return;
  }

  if (bookings.length === 0) {
    bookingsContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-suitcase" style="font-size: 64px; color: #ccc; margin-bottom: 20px;"></i>
        <h3>No bookings yet</h3>
        <p>Start planning your next adventure!</p>
        <a href="flights.html" class="btn-primary">Book Now</a>
      </div>
    `;
    return;
  }

  // Group bookings by type
  const groupedBookings = {
    flight: bookings.filter(b => b.bookingType === 'flight'),
    tour: bookings.filter(b => b.bookingType === 'tour'),
    taxi: bookings.filter(b => b.bookingType === 'taxi'),
    park: bookings.filter(b => b.bookingType === 'park'),
    hotel: bookings.filter(b => b.bookingType === 'hotel')
  };

  console.log('Grouped bookings:', {
    flights: groupedBookings.flight.length,
    tours: groupedBookings.tour.length,
    taxis: groupedBookings.taxi.length,
    parks: groupedBookings.park.length,
    hotels: groupedBookings.hotel.length
  });

  let html = '';

  // Display flights
  if (groupedBookings.flight.length > 0) {
    html += '<div class="booking-category-section">';
    html += '<h3 class="category-title"><i class="fas fa-plane"></i> Flight Bookings</h3>';
    html += '<div class="bookings-grid">';
    groupedBookings.flight.forEach(booking => {
      html += generateFlightBookingCard(booking);
    });
    html += '</div></div>';
  }

  // Display tours
  if (groupedBookings.tour.length > 0) {
    html += '<div class="booking-category-section">';
    html += '<h3 class="category-title"><i class="fas fa-map-marked-alt"></i> Tour Bookings</h3>';
    html += '<div class="bookings-grid">';
    groupedBookings.tour.forEach(booking => {
      html += generateTourBookingCard(booking);
    });
    html += '</div></div>';
  }

  // Display car rentals
  if (groupedBookings.taxi.length > 0) {
    html += '<div class="booking-category-section">';
    html += '<h3 class="category-title"><i class="fas fa-car"></i> Car Rental Bookings</h3>';
    html += '<div class="bookings-grid">';
    groupedBookings.taxi.forEach(booking => {
      html += generateTaxiBookingCard(booking);
    });
    html += '</div></div>';
  }

  // Display park/attraction bookings
  if (groupedBookings.park.length > 0) {
    html += '<div class="booking-category-section">';
    html += '<h3 class="category-title"><i class="fas fa-tree"></i> Park & Attraction Bookings</h3>';
    html += '<div class="bookings-grid">';
    groupedBookings.park.forEach(booking => {
      html += generateParkBookingCard(booking);
    });
    html += '</div></div>';
  }

  // Display hotel bookings
  if (groupedBookings.hotel.length > 0) {
    html += '<div class="booking-category-section">';
    html += '<h3 class="category-title"><i class="fas fa-hotel"></i> Hotel Bookings</h3>';
    html += '<div class="bookings-grid">';
    groupedBookings.hotel.forEach(booking => {
      html += generateHotelBookingCard(booking);
    });
    html += '</div></div>';
  }

  bookingsContainer.innerHTML = html;
  
  // Apply translations to dynamically generated content
  if (typeof languageManager !== 'undefined' && languageManager) {
    languageManager.translatePage();
  }
  
  // Populate activity timeline
  populateActivityTimeline(bookings);
}

// Generate flight booking card
function generateFlightBookingCard(booking) {
  const paymentStatus = booking.paymentStatus || 'pending';
  const bookingStatus = booking.status || 'pending';
  
  const startDate = booking.departureDate ? new Date(booking.departureDate) : null;
  const isPast = startDate && startDate < new Date();
  
  const paymentBadge = getPaymentBadge(paymentStatus);
  const statusBadge = getBookingStatusBadge(bookingStatus);

  const seatsInfo = booking.seatNumbers && booking.seatNumbers.length > 0
    ? `${booking.seatNumbers.length} seat(s): ${booking.seatNumbers.join(', ')}`
    : `${booking.passengers?.length || 1} passenger(s)`;

  return `
    <div class="booking-card ${isPast ? 'past-booking' : ''}" 
         data-status="${bookingStatus}" 
         data-payment-status="${paymentStatus}" 
         data-date="${startDate ? startDate.toISOString() : ''}">
      <div class="booking-card-header">
        <div class="booking-type-icon flight">
          <i class="fas fa-plane"></i>
        </div>
        <div class="booking-badges">
          ${statusBadge}
          ${paymentBadge}
        </div>
      </div>
      <div class="booking-card-body">
        <h4>Flight ${booking.flightNumber || 'N/A'}</h4>
        <div class="booking-airline-info">${booking.airline || 'Airline'}</div>
        <div class="booking-route">
          <span class="route-airport">${booking.origin || booking.from || 'Origin'} <i class="fas fa-arrow-right"></i> ${booking.destination || booking.to || 'Destination'}</span>
        </div>
        <div class="booking-details">
          <div class="detail-item">
            <i class="fas fa-calendar"></i>
            <span>${startDate ? formatDate(startDate) : 'Date TBD'}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-clock"></i>
            <span>${startDate ? startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Time TBD'}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-user"></i>
            <span>${booking.passengers?.length || 1} passenger(s)</span>
          </div>
        </div>
        <div class="booking-price">
          <span class="price-label">Total:</span>
          <span class="price-amount">${booking.currency || 'USD'}${booking.totalPrice?.toLocaleString() || '0'}</span>
        </div>
      </div>
      <div class="booking-card-footer">
        ${paymentStatus !== 'paid' && bookingStatus !== 'cancelled' ? 
          `<button onclick="payForBooking('${booking._id}', ${booking.totalPrice})" class="btn-pay-now">
            <i class="fas fa-credit-card"></i> Pay Now
          </button>` : ''}
        ${bookingStatus !== 'cancelled' && !isPast ? 
          `<button onclick="cancelBooking('${booking._id}')" class="btn-cancel">
            <i class="fas fa-times"></i> Cancel
          </button>` : ''}
      </div>
    </div>
  `;
}

// Generate tour booking card
function generateTourBookingCard(booking) {
  const paymentStatus = booking.paymentStatus || 'pending';
  const bookingStatus = booking.status || 'pending';
  
  const startDate = booking.startDate ? new Date(booking.startDate) : null;
  const endDate = booking.endDate ? new Date(booking.endDate) : null;
  const isPast = startDate && startDate < new Date();
  
  const paymentBadge = getPaymentBadge(paymentStatus);
  const statusBadge = getBookingStatusBadge(bookingStatus);

  return `
    <div class="booking-card ${isPast ? 'past-booking' : ''}" 
         data-status="${bookingStatus}" 
         data-payment-status="${paymentStatus}" 
         data-date="${startDate ? startDate.toISOString() : ''}">
      <div class="booking-card-header">
        <div class="booking-type-icon tour">
          <i class="fas fa-map-marked-alt"></i>
        </div>
        <div class="booking-badges">
          ${statusBadge}
          ${paymentBadge}
        </div>
      </div>
      <div class="booking-card-body">
        <h4>${booking.tourName || 'Tour Package'}</h4>
        <p class="booking-location"><i class="fas fa-map-marker-alt"></i> ${booking.location || 'Location'}</p>
        <div class="booking-details">
          <div class="detail-item">
            <i class="fas fa-calendar"></i>
            <span>${startDate ? formatDate(startDate) : 'Date TBD'}</span>
          </div>
          ${endDate ? `
          <div class="detail-item">
            <i class="fas fa-calendar-check"></i>
            <span>${formatDate(endDate)}</span>
          </div>` : ''}
          <div class="detail-item">
            <i class="fas fa-users"></i>
            <span>${booking.participants || 1} person(s)</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-clock"></i>
            <span>${booking.duration || 'Duration TBD'}</span>
          </div>
        </div>
        <div class="booking-price">
          <span class="price-label">Total:</span>
          <span class="price-amount">${booking.currency || '$'}${booking.totalPrice?.toLocaleString() || '0'}</span>
        </div>
      </div>
      <div class="booking-card-footer">
        ${paymentStatus !== 'paid' && bookingStatus !== 'cancelled' ? 
          `<button onclick="payForBooking('${booking._id}', ${booking.totalPrice})" class="btn-pay-now">
            <i class="fas fa-credit-card"></i> Pay Now
          </button>` : ''}
        ${bookingStatus !== 'cancelled' && !isPast ? 
          `<button onclick="cancelBooking('${booking._id}')" class="btn-cancel">
            <i class="fas fa-times"></i> Cancel
          </button>` : ''}
      </div>
    </div>
  `;
}

// Generate taxi/car rental booking card
function generateTaxiBookingCard(booking) {
  const paymentStatus = booking.paymentStatus || 'pending';
  const bookingStatus = booking.status || 'pending';
  
  const startDate = booking.pickupDate ? new Date(booking.pickupDate) : null;
  const endDate = booking.returnDate ? new Date(booking.returnDate) : null;
  const isPast = startDate && startDate < new Date();
  
  const paymentBadge = getPaymentBadge(paymentStatus);
  const statusBadge = getBookingStatusBadge(bookingStatus);

  return `
    <div class="booking-card ${isPast ? 'past-booking' : ''}" 
         data-status="${bookingStatus}" 
         data-payment-status="${paymentStatus}" 
         data-date="${startDate ? startDate.toISOString() : ''}">
      <div class="booking-card-header">
        <div class="booking-type-icon taxi">
          <i class="fas fa-car"></i>
        </div>
        <div class="booking-badges">
          ${statusBadge}
          ${paymentBadge}
        </div>
      </div>
      <div class="booking-card-body">
        <h4>${booking.vehicleType || booking.vehicleModel || 'Car Rental'}</h4>
        <div class="booking-route">
          <span class="route-location">${booking.pickupLocation || 'Pickup'}</span>
          <i class="fas fa-arrow-right"></i>
          <span class="route-location">${booking.dropoffLocation || 'Dropoff'}</span>
        </div>
        <div class="booking-details">
          <div class="detail-item">
            <i class="fas fa-calendar"></i>
            <span>Pickup: ${startDate ? formatDate(startDate) : 'TBD'}</span>
          </div>
          ${endDate ? `
          <div class="detail-item">
            <i class="fas fa-calendar-check"></i>
            <span>Return: ${formatDate(endDate)}</span>
          </div>` : ''}
        </div>
        <div class="booking-price">
          <span class="price-label">Total:</span>
          <span class="price-amount">${booking.currency || 'GHS'}${booking.totalPrice?.toLocaleString() || '0'}</span>
        </div>
      </div>
      <div class="booking-card-footer">
        ${paymentStatus !== 'paid' && bookingStatus !== 'cancelled' ? 
          `<button onclick="payForBooking('${booking._id}', ${booking.totalPrice})" class="btn-pay-now">
            <i class="fas fa-credit-card"></i> Pay Now
          </button>` : ''}
        ${bookingStatus !== 'cancelled' ? 
          `<button onclick="cancelBooking('${booking._id}')" class="btn-cancel">
            <i class="fas fa-times"></i> Cancel
          </button>` : ''}
      </div>
    </div>
  `;
}

// Generate park/attraction booking card
function generateParkBookingCard(booking) {
  const paymentStatus = booking.paymentStatus || 'pending';
  const bookingStatus = booking.status || 'pending';
  
  const startDate = booking.visitDate ? new Date(booking.visitDate) : null;
  const isPast = startDate && startDate < new Date();
  
  const paymentBadge = getPaymentBadge(paymentStatus);
  const statusBadge = getBookingStatusBadge(bookingStatus);

  return `
    <div class="booking-card ${isPast ? 'past-booking' : ''}" 
         data-status="${bookingStatus}" 
         data-payment-status="${paymentStatus}" 
         data-date="${startDate ? startDate.toISOString() : ''}">
      <div class="booking-card-header">
        <div class="booking-type-icon park">
          <i class="fas fa-tree"></i>
        </div>
        <div class="booking-badges">
          ${statusBadge}
          ${paymentBadge}
        </div>
      </div>
      <div class="booking-card-body">
        <h4>${booking.parkName || 'Park Visit'}</h4>
        <div class="booking-details">
          <div class="detail-item">
            <i class="fas fa-calendar"></i>
            <span>Visit: ${startDate ? formatDate(startDate) : 'Date TBD'}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-users"></i>
            <span>${booking.visitors || 1} visitor(s)</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-ticket-alt"></i>
            <span>${booking.ticketType || 'General Admission'}</span>
          </div>
        </div>
        <div class="booking-price">
          <span class="price-label">Total:</span>
          <span class="price-amount">${booking.currency || '$'}${booking.totalPrice?.toLocaleString() || '0'}</span>
        </div>
      </div>
      <div class="booking-card-footer">
        ${paymentStatus !== 'paid' && bookingStatus !== 'cancelled' ? 
          `<button onclick="payForBooking('${booking._id}', ${booking.totalPrice})" class="btn-pay-now">
            <i class="fas fa-credit-card"></i> Pay Now
          </button>` : ''}
        ${bookingStatus !== 'cancelled' ? 
          `<button onclick="cancelBooking('${booking._id}')" class="btn-cancel">
            <i class="fas fa-times"></i> Cancel
          </button>` : ''}
      </div>
    </div>
  `;
}

// Generate hotel booking card
function generateHotelBookingCard(booking) {
  const paymentStatus = booking.paymentStatus || 'pending';
  const bookingStatus = booking.status || 'pending';
  
  const startDate = booking.checkInDate ? new Date(booking.checkInDate) : null;
  const endDate = booking.checkOutDate ? new Date(booking.checkOutDate) : null;
  const isPast = startDate && startDate < new Date();
  
  const paymentBadge = getPaymentBadge(paymentStatus);
  const statusBadge = getBookingStatusBadge(bookingStatus);

  const nights = startDate && endDate ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) : 0;

  return `
    <div class="booking-card ${isPast ? 'past-booking' : ''}" 
         data-status="${bookingStatus}" 
         data-payment-status="${paymentStatus}" 
         data-date="${startDate ? startDate.toISOString() : ''}">
      <div class="booking-card-header">
        <div class="booking-type-icon hotel">
          <i class="fas fa-hotel"></i>
        </div>
        <div class="booking-badges">
          ${statusBadge}
          ${paymentBadge}
        </div>
      </div>
      <div class="booking-card-body">
        <h4>${booking.hotelName || 'Hotel Booking'}</h4>
        <div class="booking-details">
          <div class="detail-item">
            <i class="fas fa-calendar"></i>
            <span>Check-in: ${startDate ? formatDate(startDate) : 'TBD'}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-calendar-check"></i>
            <span>Check-out: ${endDate ? formatDate(endDate) : 'TBD'}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-moon"></i>
            <span>${nights} night(s)</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-door-open"></i>
            <span>${booking.numberOfRooms || 1} room(s)</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-users"></i>
            <span>${booking.guests || 1} guest(s)</span>
          </div>
        </div>
        <div class="booking-price">
          <span class="price-label">Total:</span>
          <span class="price-amount">${booking.currency || '$'}${booking.totalPrice?.toLocaleString() || '0'}</span>
        </div>
      </div>
      <div class="booking-card-footer">
        <button onclick="viewBookingDetails('${booking._id}')" class="btn-view-details">
        ${paymentStatus !== 'paid' && bookingStatus !== 'cancelled' ? 
          `<button onclick="payForBooking('${booking._id}', ${booking.totalPrice})" class="btn-pay-now">
            <i class="fas fa-credit-card"></i> Pay Now
          </button>` : ''}
        ${bookingStatus !== 'cancelled' && !isPast ? 
          `<button onclick="cancelBooking('${booking._id}')" class="btn-cancel">
            <i class="fas fa-times"></i> Cancel
          </button>` : ''}
      </div>
    </div>
  `;
}

// Get payment status badge
function getPaymentBadge(status) {
  const badges = {
    'completed': '<span class="status-badge paid"><i class="fas fa-check-circle"></i> Paid</span>',
    'pending': '<span class="status-badge pending"><i class="fas fa-clock"></i> Payment Pending</span>',
    'failed': '<span class="status-badge failed"><i class="fas fa-times-circle"></i> Payment Failed</span>',
    'refunded': '<span class="status-badge refunded"><i class="fas fa-undo"></i> Refunded</span>'
  };
  return badges[status] || badges['pending'];
}

// Get booking status badge
function getBookingStatusBadge(status) {
  const badges = {
    'confirmed': '<span class="status-badge confirmed"><i class="fas fa-check"></i> Confirmed</span>',
    'pending': '<span class="status-badge pending"><i class="fas fa-hourglass-half"></i> Pending</span>',
    'cancelled': '<span class="status-badge cancelled"><i class="fas fa-ban"></i> Cancelled</span>',
    'refunded': '<span class="status-badge refunded"><i class="fas fa-undo"></i> Refunded</span>'
  };
  return badges[status] || badges['pending'];
}

// Format date
function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

// View booking details
function viewBookingDetails(bookingId) {
  window.location.href = `/bookings.html?id=${bookingId}`;
}

// Pay for booking - Open payment modal
async function payForBooking(bookingId, amount) {
  try {
    // Fetch booking details
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to load booking details');
    }

    const result = await response.json();
    const booking = result.data || result;

    // Open payment modal with booking details
    openPaymentModal(booking);
  } catch (error) {
    console.error('Error loading booking:', error);
    showNotification('Failed to load booking details', 'error');
  }
}

// Open payment modal
function openPaymentModal(booking) {
  const modal = document.getElementById('paymentModal');
  const summaryDiv = document.getElementById('paymentBookingSummary');
  const amountSpan = document.getElementById('paymentAmount');

  // Store booking ID for payment submission
  window.currentBookingId = booking._id;
  window.currentBookingAmount = booking.totalPrice;

  // Display booking summary
  let summaryHTML = '';
  
  switch(booking.bookingType) {
    case 'flight':
      summaryHTML = `
        <div class="summary-item"><strong>Flight:</strong> ${booking.airline || 'N/A'} ${booking.flightNumber || ''}</div>
        <div class="summary-item"><strong>Route:</strong> ${booking.origin || booking.from} → ${booking.destination || booking.to}</div>
        <div class="summary-item"><strong>Date:</strong> ${booking.departureDate ? new Date(booking.departureDate).toLocaleDateString() : 'N/A'}</div>
        <div class="summary-item"><strong>Passengers:</strong> ${booking.passengers?.length || 1}</div>
      `;
      break;
    case 'hotel':
      summaryHTML = `
        <div class="summary-item"><strong>Hotel:</strong> ${booking.hotelName || 'N/A'}</div>
        <div class="summary-item"><strong>Check-in:</strong> ${booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'N/A'}</div>
        <div class="summary-item"><strong>Check-out:</strong> ${booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : 'N/A'}</div>
        <div class="summary-item"><strong>Guests:</strong> ${booking.guests || 1}</div>
      `;
      break;
    case 'taxi':
      summaryHTML = `
        <div class="summary-item"><strong>Vehicle:</strong> ${booking.vehicleType || 'N/A'}</div>
        <div class="summary-item"><strong>From:</strong> ${booking.pickupLocation || 'N/A'}</div>
        <div class="summary-item"><strong>To:</strong> ${booking.dropoffLocation || 'N/A'}</div>
        <div class="summary-item"><strong>Date:</strong> ${booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : 'N/A'}</div>
      `;
      break;
    case 'tour':
      summaryHTML = `
        <div class="summary-item"><strong>Tour:</strong> ${booking.tourName || 'N/A'}</div>
        <div class="summary-item"><strong>Location:</strong> ${booking.location || 'N/A'}</div>
        <div class="summary-item"><strong>Start Date:</strong> ${booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'}</div>
        <div class="summary-item"><strong>Participants:</strong> ${booking.participants || 1}</div>
      `;
      break;
    case 'park':
      summaryHTML = `
        <div class="summary-item"><strong>Park:</strong> ${booking.parkName || 'N/A'}</div>
        <div class="summary-item"><strong>Visit Date:</strong> ${booking.visitDate ? new Date(booking.visitDate).toLocaleDateString() : 'N/A'}</div>
        <div class="summary-item"><strong>Visitors:</strong> ${booking.visitors || 1}</div>
      `;
      break;
  }

  summaryDiv.innerHTML = summaryHTML;
  amountSpan.textContent = `$${booking.totalPrice.toLocaleString()}`;

  // Show modal
  modal.style.display = 'flex';

  // Setup payment method tabs
  setupPaymentMethodTabs();

  // Setup form submission
  setupPaymentFormSubmission();

  // Setup card input formatting
  setupCardInputFormatting();
}

// Close payment modal
function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  modal.style.display = 'none';
  document.getElementById('paymentForm').reset();
}

// Setup payment method tabs
function setupPaymentMethodTabs() {
  const tabs = document.querySelectorAll('.payment-method-tab');
  const forms = document.querySelectorAll('.payment-method-form');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and forms
      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));

      // Add active class to clicked tab
      this.classList.add('active');

      // Show corresponding form
      const method = this.dataset.method;
      const formId = `${method}PaymentForm`;
      document.getElementById(formId).classList.add('active');
    });
  });
}

// Setup card input formatting
function setupCardInputFormatting() {
  const cardNumber = document.getElementById('cardNumber');
  const cardExpiry = document.getElementById('cardExpiry');
  const cardCVV = document.getElementById('cardCVV');

  // Format card number
  if (cardNumber && !cardNumber.dataset.formatted) {
    cardNumber.dataset.formatted = 'true';
    cardNumber.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s/g, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formattedValue;
    });
  }

  // Format expiry date
  if (cardExpiry && !cardExpiry.dataset.formatted) {
    cardExpiry.dataset.formatted = 'true';
    cardExpiry.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      e.target.value = value;
    });
  }

  // Only allow numbers in CVV
  if (cardCVV && !cardCVV.dataset.formatted) {
    cardCVV.dataset.formatted = 'true';
    cardCVV.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
}

// Setup payment form submission
function setupPaymentFormSubmission() {
  const form = document.getElementById('paymentForm');
  
  // Remove existing listeners
  const newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);
  
  newForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = newForm.querySelector('.btn-pay-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    try {
      // Get selected payment method
      const activeTab = document.querySelector('.payment-method-tab.active');
      const paymentMethod = activeTab.dataset.method;

      let paymentData = {
        booking: window.currentBookingId,
        amount: window.currentBookingAmount,
        paymentMethod: paymentMethod
      };

      // Add method-specific data
      if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCVV = document.getElementById('cardCVV').value;
        const cardName = document.getElementById('cardName').value;

        // Validate card details
        if (cardNumber.length < 13 || cardNumber.length > 19) {
          throw new Error('Invalid card number');
        }
        if (!cardExpiry.match(/^\d{2}\/\d{2}$/)) {
          throw new Error('Invalid expiry date format');
        }
        if (cardCVV.length < 3) {
          throw new Error('Invalid CVV');
        }

        paymentData.cardDetails = {
          number: cardNumber,
          expiry: cardExpiry,
          cvv: cardCVV,
          name: cardName
        };
      } else if (paymentMethod === 'mobile') {
        const provider = document.getElementById('mobileProvider').value;
        const phoneNumber = document.getElementById('mobileNumber').value;

        if (!provider) {
          throw new Error('Please select a mobile money provider');
        }
        if (!phoneNumber) {
          throw new Error('Please enter phone number');
        }

        paymentData.mobileMoneyDetails = {
          provider: provider,
          phoneNumber: phoneNumber
        };
      }

      // Create payment intent first
      const intentResponse = await fetch(`${API_BASE_URL}/payments/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          bookingId: window.currentBookingId,
          amount: window.currentBookingAmount
        })
      });

      if (!intentResponse.ok) {
        const intentError = await intentResponse.json();
        throw new Error(intentError.message || 'Failed to create payment intent');
      }

      const intentResult = await intentResponse.json();

      // Process payment
      const paymentResponse = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...paymentData,
          paymentIntentId: intentResult.data?.clientSecret || 'test_intent'
        })
      });

      const paymentResult = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentResult.message || 'Payment failed');
      }

      // Close payment modal
      closePaymentModal();

      // Show success modal
      showSuccessModal();

      // Reload bookings after 2 seconds
      setTimeout(() => {
        closeSuccessModal();
        loadAllBookings();
      }, 2000);

    } catch (error) {
      console.error('Payment error:', error);
      showNotification(error.message || 'Payment failed. Please try again.', 'error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// Show success modal
function showSuccessModal() {
  const modal = document.getElementById('successModal');
  modal.style.display = 'flex';
}

// Close success modal
function closeSuccessModal() {
  const modal = document.getElementById('successModal');
  modal.style.display = 'none';
}

// Cancel booking
async function cancelBooking(bookingId) {
  if (confirm('Are you sure you want to cancel this booking?')) {
    try {
      console.log('🚫 Cancelling booking:', bookingId);
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const result = await response.json();
      console.log('Cancel response:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to cancel booking');
      }

      showNotification('Booking cancelled successfully', 'success');
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      console.error('Cancel error:', error);
      showNotification('Failed to cancel booking. Please try again.', 'error');
    }
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Setup logout functionality
function setupLogout() {
  const logoutBtns = document.querySelectorAll('.btn-logout, #logoutBtn, .logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
  });
}

// Setup filter tabs for bookings section
function setupFilterTabs() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get filter type
      const filter = this.dataset.filter;
      
      // Filter bookings
      filterBookingsByTab(filter);
    });
  });
}

// Filter bookings based on tab selection
function filterBookingsByTab(filter) {
  const bookingCards = document.querySelectorAll('.booking-card');
  const now = new Date();
  
  bookingCards.forEach(card => {
    const status = card.dataset.status;
    const paymentStatus = card.dataset.paymentStatus;
    const dateStr = card.dataset.date;
    const bookingDate = dateStr ? new Date(dateStr) : null;
    
    let shouldShow = false;
    
    switch(filter) {
      case 'all':
        shouldShow = true;
        break;
      case 'confirmed':
        shouldShow = status === 'confirmed';
        break;
      case 'upcoming':
        shouldShow = bookingDate && bookingDate > now && status !== 'cancelled';
        break;
      case 'pending':
        shouldShow = paymentStatus === 'pending';
        break;
    }
    
    card.style.display = shouldShow ? 'flex' : 'none';
  });
}

// Populate activity timeline from bookings
function populateActivityTimeline(bookings) {
  const timelineContainer = document.querySelector('.activity-timeline');
  
  if (!timelineContainer) {
    console.warn('Activity timeline container not found');
    return;
  }
  
  // Sort bookings by createdAt date (most recent first)
  const sortedBookings = [...bookings].sort((a, b) => {
    return new Date(b.createdAt || b.bookingDate) - new Date(a.createdAt || b.bookingDate);
  });
  
  // Take only the last 10 activities
  const recentBookings = sortedBookings.slice(0, 10);
  
  if (recentBookings.length === 0) {
    timelineContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-clock"></i>
        <h3>No recent activity</h3>
        <p>Your booking history will appear here</p>
      </div>
    `;
    return;
  }
  
  // Generate activity items
  const activityHTML = recentBookings.map(booking => generateActivityItem(booking)).join('');
  timelineContainer.innerHTML = activityHTML;
}

// Generate activity timeline item
function generateActivityItem(booking) {
  const bookingDate = new Date(booking.createdAt || booking.bookingDate);
  const timeAgo = getTimeAgo(bookingDate);
  
  let activityType = 'booking';
  let activityIcon = 'fas fa-calendar-check';
  let activityTitle = '';
  let activityDescription = '';
  
  // Determine activity based on booking type
  switch(booking.bookingType) {
    case 'flight':
      activityTitle = `Booked Flight: ${booking.airline || 'Flight'}`;
      activityDescription = `${booking.origin} → ${booking.destination}`;
      activityIcon = 'fas fa-plane';
      break;
    case 'hotel':
      activityTitle = `Booked Hotel: ${booking.hotelName || 'Hotel'}`;
      activityDescription = `Check-in: ${booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'N/A'}`;
      activityIcon = 'fas fa-hotel';
      break;
    case 'taxi':
      activityTitle = `Booked Taxi: ${booking.vehicleType || 'Ride'}`;
      activityDescription = `${booking.pickupLocation} → ${booking.dropoffLocation}`;
      activityIcon = 'fas fa-taxi';
      break;
    case 'tour':
      activityTitle = `Booked Tour: ${booking.tourName || 'Tour'}`;
      activityDescription = `Location: ${booking.location || 'N/A'}`;
      activityIcon = 'fas fa-map-marked-alt';
      break;
    case 'park':
      activityTitle = `Booked Park Visit: ${booking.parkName || 'Park'}`;
      activityDescription = `Visit date: ${booking.visitDate ? new Date(booking.visitDate).toLocaleDateString() : 'N/A'}`;
      activityIcon = 'fas fa-tree';
      break;
  }
  
  // Determine activity type class based on payment status
  if (booking.paymentStatus === 'paid') {
    activityType = 'payment';
    activityIcon = 'fas fa-check-circle';
  } else if (booking.status === 'cancelled') {
    activityType = 'cancellation';
    activityIcon = 'fas fa-times-circle';
  }
  
  return `
    <div class="activity-item">
      <div class="activity-icon-wrapper ${activityType}">
        <i class="${activityIcon}"></i>
      </div>
      <div class="activity-details">
        <h4>${activityTitle}</h4>
        <p>${activityDescription}</p>
        <div class="activity-time">
          <i class="fas fa-clock"></i>
          <span>${timeAgo}</span>
        </div>
      </div>
    </div>
  `;
}

// Get time ago string
function getTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSeconds < 60) {
    return 'Just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
}
