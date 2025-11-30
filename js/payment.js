// Payment Page JavaScript

let bookingData = null;
let selectedPaymentMethod = 'card';

// Initialize payment page
document.addEventListener('DOMContentLoaded', async () => {
  // Check authentication
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Get booking ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookingId = urlParams.get('bookingId');

  if (!bookingId) {
    alert('No booking selected for payment');
    window.location.href = 'bookings.html';
    return;
  }

  // Load booking details
  await loadBookingDetails(bookingId);

  // Setup payment method switching
  setupPaymentMethods();

  // Setup form validation
  setupFormValidation();

  // Setup payment form submission
  setupPaymentForm(bookingId);
});

// Load booking details
async function loadBookingDetails(bookingId) {
  try {
    const response = await api.get(`/api/bookings/${bookingId}`);
    
    if (response.success) {
      bookingData = response.data;
      displayBookingSummary(bookingData);
    } else {
      throw new Error('Failed to load booking details');
    }
  } catch (error) {
    console.error('Error loading booking:', error);
    alert('Failed to load booking details. Redirecting...');
    window.location.href = 'bookings.html';
  }
}

// Display booking summary
function displayBookingSummary(booking) {
  const summaryHtml = `
    <div class="booking-details">
      <h4>${(booking.bookingType || booking.type || 'Booking').toUpperCase()}</h4>
      ${getBookingSpecificDetails(booking)}
    </div>

    <div class="summary-item">
      <span class="summary-label">Booking ID</span>
      <span class="summary-value">${booking._id.substring(0, 8)}...</span>
    </div>

    <div class="summary-item">
      <span class="summary-label">Status</span>
      <span class="summary-value">${booking.status}</span>
    </div>

    <div class="summary-item">
      <span class="summary-label">Subtotal</span>
      <span class="summary-value">$${booking.totalPrice?.toFixed(2) || '0.00'}</span>
    </div>

    <div class="summary-item">
      <span class="summary-label">Tax (0%)</span>
      <span class="summary-value">$0.00</span>
    </div>

    <div class="summary-item summary-total">
      <span class="summary-label">Total</span>
      <span class="summary-value">$${booking.totalPrice?.toFixed(2) || '0.00'}</span>
    </div>
  `;

  document.getElementById('bookingSummary').innerHTML = summaryHtml;
}

// Get booking type specific details
function getBookingSpecificDetails(booking) {
  const type = booking.bookingType || booking.type;
  
  switch(type) {
    case 'flight':
      return `
        <p><strong>From:</strong> ${booking.origin || booking.from || 'N/A'}</p>
        <p><strong>To:</strong> ${booking.destination || booking.to || 'N/A'}</p>
        <p><strong>Date:</strong> ${booking.departureDate ? new Date(booking.departureDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Passengers:</strong> ${booking.passengers?.length || 1}</p>
      `;
    case 'hotel':
      return `
        <p><strong>Hotel:</strong> ${booking.hotelName || 'N/A'}</p>
        <p><strong>Check-in:</strong> ${booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Check-out:</strong> ${booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Guests:</strong> ${booking.guests || 1}</p>
      `;
    case 'taxi':
    case 'car':
      return `
        <p><strong>Vehicle:</strong> ${booking.vehicleModel || booking.vehicleType || 'N/A'}</p>
        <p><strong>Pickup:</strong> ${booking.pickupLocation || 'N/A'}</p>
        <p><strong>Date:</strong> ${booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : 'N/A'}</p>
      `;
    case 'tour':
      return `
        <p><strong>Tour:</strong> ${booking.tourName || 'N/A'}</p>
        <p><strong>Location:</strong> ${booking.location || 'N/A'}</p>
        <p><strong>Date:</strong> ${booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Participants:</strong> ${booking.participants || 1}</p>
      `;
    case 'park':
      return `
        <p><strong>Park:</strong> ${booking.parkName || 'N/A'}</p>
        <p><strong>Visit Date:</strong> ${booking.visitDate ? new Date(booking.visitDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Visitors:</strong> ${booking.visitors || 1}</p>
      `;
    default:
      return `<p><strong>Type:</strong> ${type}</p>`;
  }
}

// Setup payment method switching
function setupPaymentMethods() {
  const methodLabels = document.querySelectorAll('.payment-method');
  const paymentDetails = document.querySelectorAll('.payment-details');

  methodLabels.forEach(label => {
    label.addEventListener('click', () => {
      const method = label.dataset.method;
      selectedPaymentMethod = method;

      // Update active states
      methodLabels.forEach(l => l.classList.remove('active'));
      label.classList.add('active');

      // Show corresponding payment form
      paymentDetails.forEach(detail => {
        detail.classList.remove('active');
        if (detail.id === `${method}Payment`) {
          detail.classList.add('active');
        }
      });
    });
  });
}

// Setup form validation
function setupFormValidation() {
  // Card number formatting
  const cardNumberInput = document.getElementById('cardNumber');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '');
      value = value.replace(/(\d{4})/g, '$1 ').trim();
      e.target.value = value;
    });
  }

  // Expiry date formatting
  const expiryInput = document.getElementById('expiryDate');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      e.target.value = value;
    });
  }

  // CVV - numbers only
  const cvvInput = document.getElementById('cvv');
  if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
}

// Setup payment form submission
function setupPaymentForm(bookingId) {
  const form = document.getElementById('paymentForm');
  const payButton = document.getElementById('payButton');
  const errorDiv = document.getElementById('paymentError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate terms checkbox
    const agreeTerms = document.getElementById('agreeTerms');
    if (!agreeTerms.checked) {
      showError('Please agree to the terms and conditions');
      return;
    }

    // Validate payment method specific fields
    if (!validatePaymentMethod()) {
      return;
    }

    // Process payment
    payButton.disabled = true;
    payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    errorDiv.style.display = 'none';

    try {
      const paymentData = {
        bookingId: bookingId,
        paymentMethod: selectedPaymentMethod,
        amount: bookingData.totalPrice
      };

      // Add method-specific data
      if (selectedPaymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        paymentData.cardDetails = {
          last4: cardNumber.slice(-4),
          brand: detectCardBrand(cardNumber)
        };
      } else if (selectedPaymentMethod === 'mobile') {
        paymentData.mobileProvider = document.getElementById('mobileProvider').value;
        paymentData.mobileNumber = document.getElementById('mobileNumber').value;
      }

      const response = await api.post('/api/payments', paymentData);

      if (response.success) {
        // Show success modal
        showSuccessModal();
      } else {
        throw new Error(response.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      showError(error.message || 'Payment failed. Please try again.');
      payButton.disabled = false;
      payButton.innerHTML = '<i class="fas fa-lock"></i> Pay Now';
    }
  });
}

// Validate payment method
function validatePaymentMethod() {
  if (selectedPaymentMethod === 'card') {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardholderName = document.getElementById('cardholderName').value;

    if (!cardNumber || cardNumber.length < 13) {
      showError('Please enter a valid card number');
      return false;
    }
    if (!expiryDate || expiryDate.length !== 5) {
      showError('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (!cvv || cvv.length < 3) {
      showError('Please enter a valid CVV');
      return false;
    }
    if (!cardholderName) {
      showError('Please enter the cardholder name');
      return false;
    }
  } else if (selectedPaymentMethod === 'mobile') {
    const provider = document.getElementById('mobileProvider').value;
    const number = document.getElementById('mobileNumber').value;

    if (!provider) {
      showError('Please select a mobile money provider');
      return false;
    }
    if (!number) {
      showError('Please enter your mobile number');
      return false;
    }
  }

  return true;
}

// Detect card brand
function detectCardBrand(number) {
  if (/^4/.test(number)) return 'Visa';
  if (/^5[1-5]/.test(number)) return 'Mastercard';
  if (/^3[47]/.test(number)) return 'American Express';
  return 'Unknown';
}

// Show error message
function showError(message) {
  const errorDiv = document.getElementById('paymentError');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Show success modal
function showSuccessModal() {
  const modal = document.getElementById('successModal');
  modal.classList.add('show');
}

// Logout function
function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
