// Parks page JavaScript
console.log('Parks page loaded');

// Park Booking Function
window.bookPark = async function(parkData) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    alert('Please login to book park tickets');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const bookingData = {
      bookingType: 'park',
      parkName: parkData.name,
      visitDate: parkData.date || new Date(),
      visitors: parkData.visitors || 1,
      ticketType: parkData.ticketType || 'General Admission',
      totalPrice: parkData.price,
      currency: 'USD',
      status: 'confirmed',
      paymentStatus: 'pending'
    };
    
    console.log('Creating park booking:', bookingData);
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
    });
    
    console.log('Park booking response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Park booking failed:', errorData);
      throw new Error('Failed to create booking');
    }
    
    const result = await response.json();
    console.log('Park booking created successfully:', result);
    alert(`Park tickets booked successfully! Booking ID: ${result.data._id}`);
    window.location.href = 'dashboard.html';
    
  } catch (error) {
    console.error('Booking error:', error);
    alert('Failed to create booking. Please try again.');
  }
};

// Add event listeners for park booking buttons
document.addEventListener('DOMContentLoaded', function() {
  console.log('Setting up park booking buttons...');
  
  document.querySelectorAll('.btn-book').forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Park booking button clicked');
      const parkCard = this.closest('.park-card');
      
      // Extract park data from card elements
      const parkName = parkCard.querySelector('h3')?.textContent || 'Park Visit';
      const priceEl = parkCard.querySelector('.park-price h4');
      const priceText = priceEl ? priceEl.textContent.replace(/[^0-9.]/g, '') : '0';
      const price = parseFloat(priceText) || 0;
      
      const parkData = {
        name: parkName,
        price: price,
        visitors: 1,
        ticketType: 'General Admission',
        date: new Date()
      };
      
      console.log('Booking park with data:', parkData);
      bookPark(parkData);
    });
  });
  
  console.log('Found', document.querySelectorAll('.btn-book').length, 'park booking buttons');
});