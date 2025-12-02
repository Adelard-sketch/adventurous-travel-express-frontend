class FlightSearchWidget {
  constructor() {
    this.apiURL = 'https://adventurous-travel-express-backend.vercel.app/api/flights';
    this.selectedFlight = null;
  }

  /**
   * Search flights
   */
  async searchFlights(params) {
    try {
      // Show loading indicator
      this.showLoading(true);
      
      const { from, to, departureDate, returnDate, adults, cabinClass, tripType } = params;
      
      // Log search parameters
      console.log('Searching flights with params:', params);
      
      let url = `${this.apiURL}/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&departureDate=${departureDate}&adults=${adults || 1}`;
      
      if (returnDate && tripType === 'roundtrip') {
        url += `&returnDate=${returnDate}&tripType=roundtrip`;
      } else {
        url += `&tripType=oneway`;
      }
      
      if (cabinClass) {
        url += `&cabinClass=${cabinClass}`;
      }

      console.log('API Request URL:', url);

      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data);
      
      // Hide loading indicator
      this.showLoading(false);
      
      if (data.success) {
        this.displayFlights(data.data);
        
        // Show appropriate message
        if (data.isMockData) {
          this.showWarning(`Found ${data.count} sample flights. ${data.message || 'Subscribe to API for real data.'}`);
        } else {
          this.showSuccess(`Found ${data.count} flights from ${from} to ${to}`);
        }
        
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Flight search error:', error);
      this.showLoading(false);
      this.showError(error.message || 'Failed to search flights. Please try again.');
      throw error;
    }
  }

  /**
   * Show/hide loading indicator
   */
  showLoading(show) {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) {
      loadingDiv.style.display = show ? 'block' : 'none';
    }
  }

  /**
   * Show success message
   */
  showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    successDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; background: #10b981; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: slideIn 0.3s ease; max-width: 400px;';
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
      successDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => successDiv.remove(), 300);
    }, 4000);
  }

  /**
   * Show warning message
   */
  showWarning(message) {
    const warningDiv = document.createElement('div');
    warningDiv.className = 'alert alert-warning';
    warningDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    warningDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; background: #f59e0b; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: slideIn 0.3s ease; max-width: 400px;';
    document.body.appendChild(warningDiv);
    
    setTimeout(() => {
      warningDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => warningDiv.remove(), 300);
    }, 6000);
  }

  /**
   * Display flight results
   */
  displayFlights(flights) {
    const container = document.getElementById('flight-results');
    
    if (!flights || flights.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <i class="fas fa-plane-slash"></i>
          <h3>No flights found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      `;
      return;
    }

    container.innerHTML = flights.map(flight => {
      const departTime = new Date(flight.departureAt).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toUpperCase();
      
      const arriveTime = new Date(flight.arrivalAt).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toUpperCase();
      
      const hours = Math.floor(flight.duration / 60);
      const minutes = flight.duration % 60;
      const durationText = `${hours}h ${minutes}m`;
      
      // Get day difference for next day indicator
      const departDate = new Date(flight.departureAt);
      const arriveDate = new Date(flight.arrivalAt);
      const dayDiff = arriveDate.getDate() - departDate.getDate();
      
      // Build stops text
      let stopsText = '';
      if (flight.stops === 0) {
        stopsText = '';
      } else if (flight.stops === 1 && flight.segments && flight.segments.length > 1) {
        stopsText = `<div class="stops-info">${flight.stops} stop ${flight.segments[0].destination}</div>`;
      } else {
        stopsText = `<div class="stops-info">${flight.stops} stop${flight.stops > 1 ? 's' : ''}</div>`;
      }
      
      // Get airline logo - use actual logo if available, otherwise use airline code API
      const airlineCode = flight.airlineCode || flight.airline?.substring(0, 2).toUpperCase() || 'XX';
      const airlineLogo = flight.airlineLogo || `https://images.kiwi.com/airlines/64/${airlineCode}.png`;
      
      return `
      <div class="flight-card" data-booking-token="${flight.bookingToken}" style="position: relative;">
        <i class="far fa-heart favorite-icon" onclick="event.stopPropagation(); this.classList.toggle('active'); this.classList.toggle('far'); this.classList.toggle('fas');"></i>
        <div class="flight-header">
          <div class="airline-logo-container">
            <img class="airline-logo" src="${airlineLogo}" 
                 onerror="this.onerror=null; this.src='https://via.placeholder.com/64x64/0066CC/FFFFFF?text=${flight.airline.charAt(0)}';" 
                 alt="${flight.airline}">
          </div>
          <div class="airline-info">
            <h3>${flight.airline}</h3>
          </div>
        </div>
        
        <div class="flight-route">
          <div class="route-point">
            <div class="time">${departTime}</div>
            <div class="airport">${flight.from.code}</div>
          </div>
          
          <div class="route-middle">
            <div class="duration">${durationText}</div>
            <div class="route-line"></div>
            ${stopsText}
          </div>
          
          <div class="route-point">
            <div class="time">${arriveTime}${dayDiff > 0 ? '<sup style="color: #c62828; font-size: 0.7rem;">+' + dayDiff + '</sup>' : ''}</div>
            <div class="airport">${flight.to.code}</div>
          </div>
        </div>
        
        <div class="flight-footer">
          <div class="price-section">
            <div class="booking-options">4 booking options</div>
            <div class="price">${flight.price.formatted}</div>
          </div>
          <button class="btn-primary btn-select" onclick="flightSearch.selectFlight('${flight.bookingToken}', ${JSON.stringify(flight).replace(/"/g, '&quot;')})">
            Select
          </button>
        </div>
      </div>
    `;
    }).join('');
  }

  /**
   * Select flight for booking
   */
  async selectFlight(bookingToken, flightData) {
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.showError('Please login to book a flight');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
      return;
    }

    if (!confirm('Do you want to book this flight?')) {
      return;
    }

    try {
      console.log('Booking flight with data:', flightData);

      // Extract price from flight data
      let totalPrice = 0;
      if (flightData.price) {
        if (typeof flightData.price === 'number') {
          totalPrice = flightData.price;
        } else if (flightData.price.amount) {
          totalPrice = parseFloat(flightData.price.amount);
        } else if (flightData.price.formatted) {
          totalPrice = parseFloat(flightData.price.formatted.replace(/[^0-9.]/g, ''));
        }
      }

      console.log('Extracted total price:', totalPrice);

      // Extract origin and destination
      const fromCity = flightData.from?.city || flightData.from?.name || flightData.from?.code || 'Origin';
      const toCity = flightData.to?.city || flightData.to?.name || flightData.to?.code || 'Destination';
      const fromCode = flightData.from?.code || 'XXX';
      const toCode = flightData.to?.code || 'XXX';

      console.log('Extracted locations:', { fromCity, toCity, fromCode, toCode });

      // Create booking directly
      const bookingData = {
        bookingType: 'flight',
        airline: flightData.airline || 'Airline',
        flightNumber: flightData.flightNumber || 'N/A',
        from: fromCode,
        to: toCode,
        origin: fromCity,
        destination: toCity,
        departureDate: flightData.departureAt,
        arrivalDate: flightData.arrivalAt,
        departureTime: new Date(flightData.departureAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        seatClass: 'economy',
        passengers: [{ firstName: 'Passenger', lastName: '1' }],
        totalPrice: totalPrice,
        currency: flightData.price?.currency || 'USD',
        status: 'confirmed',
        paymentStatus: 'pending'
      };

      console.log('Creating flight booking:', bookingData);

      const bookingResponse = await fetch('https://adventurous-travel-express-backend.vercel.app/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const bookingResult = await bookingResponse.json();
      console.log('Booking response:', bookingResult);

      if (!bookingResponse.ok) {
        throw new Error(bookingResult.error || 'Failed to create booking');
      }

      this.showSuccess('Flight booked successfully! Redirecting to dashboard...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);

    } catch (error) {
      console.error('Error booking flight:', error);
      this.showError(error.message || 'Failed to book flight. Please try again.');
    }
  }

  /**
   * Show booking form (deprecated - now books directly)
   */
  showBookingForm() {
    // Direct booking implemented in selectFlight
    window.location.href = 'dashboard.html';
  }

  /**
   * Show error message
   */
  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-error';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; background: #ef4444; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: slideIn 0.3s ease;';
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
  }
}

// Initialize
const flightSearch = new FlightSearchWidget();

// Setup form
document.getElementById('flight-search-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const tripType = document.querySelector('input[name="trip-type"]:checked')?.value || 'roundtrip';
  
  const formData = {
    from: document.getElementById('from').value.trim(),
    to: document.getElementById('to').value.trim(),
    departureDate: document.getElementById('departure-date').value,
    returnDate: document.getElementById('return-date')?.value,
    adults: document.getElementById('passengers')?.value || 1,
    cabinClass: document.getElementById('cabin-class')?.value || 'economy',
    tripType
  };
  
  // Validate form data
  if (!formData.from || !formData.to) {
    flightSearch.showError('Please enter departure and destination airports');
    return;
  }
  
  if (!formData.departureDate) {
    flightSearch.showError('Please select a departure date');
    return;
  }
  
  if (tripType === 'roundtrip' && !formData.returnDate) {
    flightSearch.showError('Please select a return date for round-trip flights');
    return;
  }
  
  console.log('Form submitted with data:', formData);
  
  try {
    await flightSearch.searchFlights(formData);
    
    // Scroll to results
    document.getElementById('flight-results')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  } catch (error) {
    console.error('Search failed:', error);
  }
});