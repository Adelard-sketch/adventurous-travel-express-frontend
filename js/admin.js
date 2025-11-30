// Admin Dashboard JavaScript

const API_URL = '/api';
let currentSection = 'dashboard';
let allBookingsData = [];

// Check authentication
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadDashboardData();
  setupEventListeners();
});

// Check if user is authenticated and is admin
async function checkAuth() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  console.log('Checking auth...', { hasToken: !!token, user: user });
  
  if (!token) {
    console.log('No token found, redirecting to login');
    window.location.href = 'login.html';
    return;
  }

  // Check if user has admin role
  if (user.role !== 'admin') {
    console.log('User is not admin:', user.role);
    alert('Access denied. Admin privileges required.');
    localStorage.clear();
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Auth check response status:', response.status);

    if (response.status === 401) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Token invalid:', errorData);
      alert('Your session has expired. Please login again.');
      localStorage.clear();
      window.location.href = 'login.html';
      return;
    }

    if (response.status === 403) {
      alert('Access denied. Admin privileges required.');
      localStorage.clear();
      window.location.href = 'login.html';
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Get user info from localStorage and display
    if (user.name) {
      document.getElementById('adminName').textContent = user.name;
    }
    
    console.log('Auth check successful');
  } catch (error) {
    console.error('Auth error:', error);
    alert(`Authentication error: ${error.message}. Please login again.`);
    localStorage.clear();
    window.location.href = 'login.html';
  }
}

// Setup event listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const section = item.dataset.section;
      switchSection(section);
    });
  });

  // Filters
  document.getElementById('filterType')?.addEventListener('change', () => loadAllBookings());
  document.getElementById('filterStatus')?.addEventListener('change', () => loadAllBookings());

  // Modal close
  document.querySelector('.close')?.addEventListener('click', closeModal);
  document.getElementById('bookingModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'bookingModal') closeModal();
  });
}

// Switch sections
function switchSection(section) {
  currentSection = section;

  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`[data-section="${section}"]`).classList.add('active');

  // Update content
  document.querySelectorAll('.content-section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(section).classList.add('active');

  // Load section data
  switch(section) {
    case 'dashboard':
      loadDashboardData();
      break;
    case 'bookings':
      loadAllBookings();
      break;
    case 'pending':
      loadPendingBookings();
      break;
    case 'users':
      loadUsers();
      break;
  }
}

// Load dashboard data
async function loadDashboardData() {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_URL}/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || 'Failed to load stats');
    }

    const stats = await response.json();
    console.log('Dashboard stats loaded:', stats);

    // Update stats cards
    document.getElementById('totalBookings').textContent = stats.totalBookings || 0;
    document.getElementById('pendingBookingsCount').textContent = stats.pendingBookings || 0;
    document.getElementById('confirmedBookingsCount').textContent = stats.confirmedBookings || 0;
    document.getElementById('totalUsers').textContent = stats.totalUsers || 0;
    document.getElementById('pendingCount').textContent = stats.pendingBookings || 0;

    // Display booking types
    displayBookingTypes(stats.bookingsByType || []);

    // Display recent bookings
    displayRecentBookings(stats.recentBookings || []);

  } catch (error) {
    console.error('Error loading dashboard:', error);
    showError(`Failed to load dashboard data: ${error.message}`);
  }
}

// Display booking types
function displayBookingTypes(types) {
  const container = document.getElementById('bookingTypes');
  
  if (!types || types.length === 0) {
    container.innerHTML = '<p style="padding: 20px; text-align: center; color: #666;">No bookings by type yet</p>';
    return;
  }

  container.innerHTML = types.map(type => `
    <div class="type-card">
      <h4>${type.count}</h4>
      <p>${(type._id || 'Unknown').charAt(0).toUpperCase() + (type._id || 'Unknown').slice(1)}</p>
    </div>
  `).join('');
}

// Display recent bookings
function displayRecentBookings(bookings) {
  const container = document.getElementById('recentBookingsList');
  
  if (!bookings || bookings.length === 0) {
    container.innerHTML = '<p style="padding: 20px; text-align: center; color: #666;">No bookings yet. Bookings will appear here once users make reservations.</p>';
    return;
  }

  container.innerHTML = bookings.map(booking => `
    <div class="booking-item" onclick="viewBooking('${booking._id}')">
      <div class="booking-info">
        <h4>${booking.type ? booking.type.toUpperCase() : 'Booking'} - ${booking.userId?.name || 'User'}</h4>
        <p>${new Date(booking.createdAt).toLocaleDateString()} | ${booking.userId?.email || ''}</p>
      </div>
      <span class="booking-status ${booking.status}">${booking.status}</span>
    </div>
  `).join('');
}

// Load all bookings
async function loadAllBookings() {
  const token = localStorage.getItem('token');
  const type = document.getElementById('filterType')?.value || '';
  const status = document.getElementById('filterStatus')?.value || '';
  
  try {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (status) params.append('status', status);

    const response = await fetch(`${API_URL}/admin/bookings?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to load bookings');

    const data = await response.json();
    allBookingsData = data.bookings || [];
    
    displayBookingsTable(allBookingsData, 'allBookingsList');

  } catch (error) {
    console.error('Error loading bookings:', error);
    showError('Failed to load bookings');
  }
}

// Load pending bookings
async function loadPendingBookings() {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_URL}/admin/bookings?status=pending`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to load pending bookings');

    const data = await response.json();
    displayBookingsTable(data.bookings || [], 'pendingBookingsList');

  } catch (error) {
    console.error('Error loading pending bookings:', error);
    showError('Failed to load pending bookings');
  }
}

// Display bookings table
function displayBookingsTable(bookings, containerId) {
  const container = document.getElementById(containerId);
  
  if (bookings.length === 0) {
    container.innerHTML = '<div style="padding: 24px; text-align: center;">No bookings found</div>';
    return;
  }

  const tableHTML = `
    <table class="bookings-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Type</th>
          <th>Date</th>
          <th>Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${bookings.map(booking => `
          <tr onclick="viewBooking('${booking._id}')">
            <td>${booking._id.substring(0, 8)}...</td>
            <td>${booking.userId?.name || 'N/A'}<br><small>${booking.userId?.email || ''}</small></td>
            <td><strong>${booking.type ? booking.type.toUpperCase() : 'N/A'}</strong></td>
            <td>${new Date(booking.createdAt).toLocaleDateString()}</td>
            <td><strong>$${booking.totalPrice || 0}</strong></td>
            <td><span class="booking-status ${booking.status}">${booking.status}</span></td>
            <td onclick="event.stopPropagation()" class="table-actions">
              ${booking.status === 'pending' ? `
                <button class="btn-action btn-confirm" onclick="confirmBooking('${booking._id}')">
                  <i class="fas fa-check"></i> Confirm
                </button>
                <button class="btn-action btn-cancel" onclick="cancelBooking('${booking._id}')">
                  <i class="fas fa-times"></i> Cancel
                </button>
              ` : `
                <button class="btn-action btn-view" onclick="viewBooking('${booking._id}')">
                  <i class="fas fa-eye"></i> View
                </button>
              `}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  container.innerHTML = tableHTML;
}

// View booking details
async function viewBooking(bookingId) {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_URL}/admin/bookings/${bookingId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to load booking details');

    const booking = await response.json();
    displayBookingModal(booking);

  } catch (error) {
    console.error('Error loading booking details:', error);
    showError('Failed to load booking details');
  }
}

// Display booking modal
function displayBookingModal(booking) {
  const modal = document.getElementById('bookingModal');
  const detailsContainer = document.getElementById('bookingDetails');

  const detailsHTML = `
    <div class="booking-detail-section">
      <h3>Booking Information</h3>
      <div class="detail-row">
        <span class="detail-label">Booking ID:</span>
        <span class="detail-value">${booking._id}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Type:</span>
        <span class="detail-value">${booking.type ? booking.type.toUpperCase() : 'N/A'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Status:</span>
        <span class="booking-status ${booking.status}">${booking.status}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Total Price:</span>
        <span class="detail-value"><strong>$${booking.totalPrice || 0}</strong></span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Created:</span>
        <span class="detail-value">${new Date(booking.createdAt).toLocaleString()}</span>
      </div>
    </div>

    <div class="booking-detail-section">
      <h3>User Information</h3>
      <div class="detail-row">
        <span class="detail-label">Name:</span>
        <span class="detail-value">${booking.userId?.name || 'N/A'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Email:</span>
        <span class="detail-value">${booking.userId?.email || 'N/A'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Phone:</span>
        <span class="detail-value">${booking.userId?.phone || 'N/A'}</span>
      </div>
    </div>

    ${getBookingTypeDetails(booking)}

    ${booking.status === 'pending' ? `
      <div class="modal-actions">
        <button class="btn-confirm" onclick="confirmBooking('${booking._id}'); closeModal();">
          <i class="fas fa-check"></i> Confirm Booking
        </button>
        <button class="btn-cancel" onclick="cancelBooking('${booking._id}'); closeModal();">
          <i class="fas fa-times"></i> Cancel Booking
        </button>
      </div>
    ` : ''}
  `;

  detailsContainer.innerHTML = detailsHTML;
  modal.classList.add('show');
}

// Get booking type specific details
function getBookingTypeDetails(booking) {
  let details = '<div class="booking-detail-section"><h3>Booking Details</h3>';

  switch(booking.type) {
    case 'flight':
      details += `
        <div class="detail-row">
          <span class="detail-label">Flight:</span>
          <span class="detail-value">${booking.flightNumber || 'N/A'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Route:</span>
          <span class="detail-value">${booking.from || booking.origin || 'N/A'} → ${booking.to || booking.destination || 'N/A'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">${booking.departureDate ? new Date(booking.departureDate).toLocaleDateString() : 'N/A'}</span>
        </div>
      `;
      break;
    case 'taxi':
    case 'car':
      details += `
        <div class="detail-row">
          <span class="detail-label">Vehicle:</span>
          <span class="detail-value">${booking.vehicleType || booking.vehicleModel || 'N/A'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Pickup:</span>
          <span class="detail-value">${booking.pickupLocation || 'N/A'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Dropoff:</span>
          <span class="detail-value">${booking.dropoffLocation || 'N/A'}</span>
        </div>
      `;
      break;
    case 'tour':
      details += `
        <div class="detail-row">
          <span class="detail-label">Tour:</span>
          <span class="detail-value">${booking.tourName || 'N/A'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Location:</span>
          <span class="detail-value">${booking.location || 'N/A'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Participants:</span>
          <span class="detail-value">${booking.participants || 'N/A'}</span>
        </div>
      `;
      break;
    case 'hotel':
      details += `
        <div class="detail-row">
          <span class="detail-label">Hotel:</span>
          <span class="detail-value">${booking.hotelName || 'N/A'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-in:</span>
          <span class="detail-value">${booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-out:</span>
          <span class="detail-value">${booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : 'N/A'}</span>
        </div>
      `;
      break;
    case 'park':
      details += `
        <div class="detail-row">
          <span class="detail-label">Park:</span>
          <span class="detail-value">${booking.parkName || 'N/A'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Visit Date:</span>
          <span class="detail-value">${booking.visitDate ? new Date(booking.visitDate).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Visitors:</span>
          <span class="detail-value">${booking.visitors || 'N/A'}</span>
        </div>
      `;
      break;
  }

  details += '</div>';
  return details;
}

// Close modal
function closeModal() {
  document.getElementById('bookingModal').classList.remove('show');
}

// Confirm booking
async function confirmBooking(bookingId) {
  if (!confirm('Are you sure you want to confirm this booking?')) return;

  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_URL}/admin/bookings/${bookingId}/confirm`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Failed to confirm booking');

    alert('Booking confirmed successfully!');
    
    // Reload current section
    switchSection(currentSection);

  } catch (error) {
    console.error('Error confirming booking:', error);
    showError('Failed to confirm booking');
  }
}

// Cancel booking
async function cancelBooking(bookingId) {
  const reason = prompt('Please enter cancellation reason:');
  if (!reason) return;

  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_URL}/admin/bookings/${bookingId}/cancel`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reason })
    });

    if (!response.ok) throw new Error('Failed to cancel booking');

    alert('Booking cancelled successfully!');
    
    // Reload current section
    switchSection(currentSection);

  } catch (error) {
    console.error('Error cancelling booking:', error);
    showError('Failed to cancel booking');
  }
}

// Load users
async function loadUsers() {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to load users');

    const data = await response.json();
    displayUsersTable(data.users || []);

  } catch (error) {
    console.error('Error loading users:', error);
    showError('Failed to load users');
  }
}

// Display users table
function displayUsersTable(users) {
  const container = document.getElementById('usersList');
  
  if (users.length === 0) {
    container.innerHTML = '<div style="padding: 24px; text-align: center;">No users found</div>';
    return;
  }

  const tableHTML = `
    <table class="bookings-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Joined</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(user => `
          <tr>
            <td><strong>${user.name || 'N/A'}</strong></td>
            <td>${user.email || 'N/A'}</td>
            <td>${user.phone || 'N/A'}</td>
            <td><span class="booking-status ${user.role === 'admin' ? 'confirmed' : 'pending'}">${user.role || 'user'}</span></td>
            <td>${new Date(user.createdAt).toLocaleDateString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  container.innerHTML = tableHTML;
}

// Logout
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }
}

// Show error
function showError(message) {
  alert(message);
}
