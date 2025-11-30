// Tours page JavaScript
console.log('Tours page loaded');

// Tour Booking Function
window.bookTour = async function(tourData) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    alert('Please login to book a tour');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const bookingData = {
      bookingType: 'tour',
      tourName: tourData.name,
      location: tourData.location,
      startDate: tourData.date,
      endDate: tourData.endDate || tourData.date,
      duration: tourData.duration || '1 day',
      participants: tourData.participants || 1,
      totalPrice: tourData.price,
      currency: 'USD',
      status: 'confirmed',
      paymentStatus: 'pending'
    };
    
    console.log('Creating tour booking:', bookingData);
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
    });
    
    console.log('Tour booking response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Tour booking failed:', errorData);
      throw new Error('Failed to create booking');
    }
    
    const result = await response.json();
    console.log('Tour booking created successfully:', result);
    alert(`Tour booked successfully! Booking ID: ${result.data._id}`);
    window.location.href = 'dashboard.html';
    
  } catch (error) {
    console.error('Booking error:', error);
    alert('Failed to create booking. Please try again.');
  }
};

// Add event listeners for tour booking buttons
document.addEventListener('DOMContentLoaded', function() {
  console.log('Setting up tour booking buttons...');
  
  document.querySelectorAll('.btn-book-tour').forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Tour booking button clicked');
      const tourCard = this.closest('.tour-card');
      
      // Extract tour data from card elements
      const tourName = tourCard.querySelector('h3')?.textContent || 'Tour Package';
      const locationEl = tourCard.querySelector('.tour-location');
      const location = locationEl ? locationEl.textContent.replace(/.*?\s+/, '').trim() : 'Unknown Location';
      const priceEl = tourCard.querySelector('.tour-price h4');
      const priceText = priceEl ? priceEl.textContent.replace(/[^0-9.]/g, '') : '0';
      const price = parseFloat(priceText) || 0;
      const durationEl = tourCard.querySelector('.tour-duration');
      const duration = durationEl ? durationEl.textContent.trim() : '1 Day';
      
      const tourData = {
        name: tourName,
        location: location,
        price: price,
        duration: duration,
        date: new Date(),
        participants: 1
      };
      
      console.log('Booking tour with data:', tourData);
      bookTour(tourData);
    });
  });
  
  console.log('Found', document.querySelectorAll('.btn-book-tour').length, 'tour booking buttons');
});