/**
 * Flight Booking Widget
 * Add this to your flights.html page
 */

class FlightBookingWidget {
  constructor(apiUrl = 'http://localhost:5000/api') {
    this.apiUrl = apiUrl;
    this.selectedFlight = null;
    this.selectedSeats = [];
  }

  /**
   * Search for flights
   */
  async searchFlights(searchParams) {
    const { from, to, date, passengers, seatClass } = searchParams;
    
    let url = `${this.apiUrl}/flights?`;
    if (from) url += `from=${from}&`;
    if (to) url += `to=${to}&`;
    if (date) url += `date=${date}&`;
    if (passengers) url += `passengers=${passengers}&`;
    if (seatClass) url += `class=${seatClass}&`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to search flights');
      }

      return data.data;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  /**
   * Get flight details
   */
  async getFlightDetails(flightId) {
    try {
      const response = await fetch(`${this.apiUrl}/flights/${flightId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to get flight details');
      }

      this.selectedFlight = data.data;
      return data.data;
    } catch (error) {
      console.error('Error fetching flight:', error);
      throw error;
    }
  }

  /**
   * Get seat availability map
   */
  async getSeatMap(flightId, seatClass = null) {
    try {
      let url = `${this.apiUrl}/flights/${flightId}/seats`;
      if (seatClass) {
        url += `?class=${seatClass}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to get seat map');
      }

      return data;
    } catch (error) {
      console.error('Error fetching seats:', error);
      throw error;
    }
  }

  /**
   * Book a flight
   */
  async bookFlight(flightId, seatIds, passengers, passengerDetails) {
    try {
      // Get token from storage
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      if (!token) {
        throw new Error('Please login to book flights');
      }

      const bookingPayload = {
        seatIds,
        passengers,
        passengerDetails
      };
      console.log('Creating flight booking:', bookingPayload);

      const response = await fetch(`${this.apiUrl}/flights/${flightId}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          seatIds,
          passengers,
          passengerDetails
        })
      });

      const data = await response.json();
      console.log('Flight booking response:', data);

      if (!data.success) {
        console.error('Flight booking failed:', data);
        throw new Error(data.message || 'Booking failed');
      }

      console.log('Flight booking created successfully:', data.data);
      return data.data;
    } catch (error) {
      console.error('Booking error:', error);
      throw error;
    }
  }

  /**
   * Display flight search results
   */
  displayFlightResults(flights, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`Container ${containerId} not found`);
      return;
    }

    if (flights.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <i class="fas fa-plane-slash"></i>
          <p>No flights found matching your criteria</p>
        </div>
      `;
      return;
    }

    container.innerHTML = flights.map(flight => `
      <div class="flight-card" data-flight-id="${flight._id}">
        <div class="flight-header">
          <div class="airline-info">
            <h3>${flight.airline}</h3>
            <span class="flight-number">${flight.flightNumber}</span>
          </div>
          <div class="price-info">
            ${flight.seatsByClass.economy.minPrice ? 
              `<span class="price">$${flight.seatsByClass.economy.minPrice}</span>` : 
              '<span class="sold-out">Sold Out</span>'
            }
            <span class="price-label">per person</span>
          </div>
        </div>
        
        <div class="flight-route">
          <div class="departure">
            <div class="time">${new Date(flight.departureAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            <div class="airport">${flight.from.code}</div>
            <div class="city">${flight.from.city}</div>
          </div>
          
          <div class="flight-duration">
            <i class="fas fa-plane"></i>
            <span>${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m</span>
            <div class="flight-line"></div>
          </div>
          
          <div class="arrival">
            <div class="time">${new Date(flight.arrivalAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            <div class="airport">${flight.to.code}</div>
            <div class="city">${flight.to.city}</div>
          </div>
        </div>
        
        <div class="flight-footer">
          <div class="seat-info">
            <span><i class="fas fa-chair"></i> ${flight.totalAvailableSeats} seats available</span>
            ${flight.seatsByClass.economy.available > 0 ? 
              `<span class="badge">Economy from $${flight.seatsByClass.economy.minPrice}</span>` : ''
            }
            ${flight.seatsByClass.business.available > 0 ? 
              `<span class="badge">Business from $${flight.seatsByClass.business.minPrice}</span>` : ''
            }
            ${flight.seatsByClass.first.available > 0 ? 
              `<span class="badge">First from $${flight.seatsByClass.first.minPrice}</span>` : ''
            }
          </div>
          <button class="btn-select-flight" onclick="bookingWidget.selectFlight('${flight._id}')">
            Select Flight
          </button>
        </div>
      </div>
    `).join('');
  }

  /**
   * Display seat map
   */
  async displaySeatMap(flightId, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`Container ${containerId} not found`);
      return;
    }

    try {
      const seatData = await this.getSeatMap(flightId);
      
      container.innerHTML = `
        <div class="seat-map-header">
          <h3>${seatData.airline} ${seatData.flightNumber}</h3>
          <p>${seatData.route}</p>
        </div>
        
        <div class="seat-map-legend">
          <span><i class="fas fa-square" style="color: #28a745;"></i> Available</span>
          <span><i class="fas fa-square" style="color: #dc3545;"></i> Booked</span>
          <span><i class="fas fa-square" style="color: #0071c2;"></i> Selected</span>
        </div>
        
        <div class="seat-classes">
          ${this.renderSeatClass('First Class', seatData.seats.first)}
          ${this.renderSeatClass('Business Class', seatData.seats.business)}
          ${this.renderSeatClass('Economy Class', seatData.seats.economy)}
        </div>
        
        <div class="seat-selection-summary">
          <h4>Selected Seats: <span id="selected-seats-count">0</span></h4>
          <p>Total: $<span id="total-price">0</span></p>
          <button class="btn-proceed" onclick="bookingWidget.proceedToBooking()" disabled>
            Proceed to Booking
          </button>
        </div>
      `;
      
      this.updateSeatSelection();
    } catch (error) {
      container.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          <p>Failed to load seat map: ${error.message}</p>
        </div>
      `;
    }
  }

  /**
   * Render seat class section
   */
  renderSeatClass(className, seats) {
    if (seats.available.length === 0 && seats.booked.length === 0) {
      return '';
    }

    const allSeats = [...seats.available, ...seats.booked];
    
    return `
      <div class="seat-class-section">
        <h4>${className}</h4>
        <div class="seats-grid">
          ${allSeats.map(seat => {
            const isBooked = seats.booked.some(s => s.id === seat.id);
            const isSelected = this.selectedSeats.some(s => s.id === seat.id);
            
            return `
              <button 
                class="seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}"
                data-seat-id="${seat.id}"
                data-seat-number="${seat.seatNumber}"
                data-seat-price="${seat.price}"
                ${isBooked ? 'disabled' : ''}
                onclick="bookingWidget.toggleSeat('${seat.id}', '${seat.seatNumber}', ${seat.price})"
              >
                ${seat.seatNumber}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Toggle seat selection
   */
  toggleSeat(seatId, seatNumber, price) {
    const index = this.selectedSeats.findIndex(s => s.id === seatId);
    
    if (index > -1) {
      // Deselect
      this.selectedSeats.splice(index, 1);
    } else {
      // Select
      this.selectedSeats.push({ id: seatId, seatNumber, price });
    }
    
    this.updateSeatSelection();
  }

  /**
   * Update seat selection display
   */
  updateSeatSelection() {
    const countEl = document.getElementById('selected-seats-count');
    const priceEl = document.getElementById('total-price');
    const proceedBtn = document.querySelector('.btn-proceed');
    
    if (countEl) countEl.textContent = this.selectedSeats.length;
    
    const totalPrice = this.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    if (priceEl) priceEl.textContent = totalPrice;
    
    if (proceedBtn) {
      proceedBtn.disabled = this.selectedSeats.length === 0;
    }
    
    // Update seat button states
    document.querySelectorAll('.seat').forEach(btn => {
      const seatId = btn.dataset.seatId;
      const isSelected = this.selectedSeats.some(s => s.id === seatId);
      btn.classList.toggle('selected', isSelected);
    });
  }

  /**
   * Proceed to booking form
   */
  proceedToBooking() {
    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    // Show booking form
    this.showBookingForm();
  }

  /**
   * Show booking form
   */
  showBookingForm() {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
      <div class="booking-modal-content">
        <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
        <h2>Passenger Information</h2>
        
        <form id="passenger-form">
          <div id="passenger-inputs"></div>
          
          <div class="form-actions">
            <button type="button" class="btn-cancel" onclick="this.closest('.booking-modal').remove()">
              Cancel
            </button>
            <button type="submit" class="btn-confirm">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Generate passenger input fields
    const inputsContainer = modal.querySelector('#passenger-inputs');
    this.selectedSeats.forEach((seat, index) => {
      inputsContainer.innerHTML += `
        <div class="passenger-section">
          <h4>Passenger ${index + 1} (Seat ${seat.seatNumber})</h4>
          <div class="form-row">
            <input type="text" name="firstName_${index}" placeholder="First Name" required />
            <input type="text" name="lastName_${index}" placeholder="Last Name" required />
          </div>
          <div class="form-row">
            <input type="date" name="dob_${index}" placeholder="Date of Birth" required />
            <input type="text" name="passport_${index}" placeholder="Passport Number" required />
          </div>
          <div class="form-row">
            <input type="text" name="nationality_${index}" placeholder="Nationality" required />
          </div>
        </div>
      `;
    });
    
    // Handle form submission
    modal.querySelector('#passenger-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitBooking(new FormData(e.target));
    });
  }

  /**
   * Submit booking
   */
  async submitBooking(formData) {
    try {
      const passengerDetails = [];
      
      this.selectedSeats.forEach((seat, index) => {
        passengerDetails.push({
          firstName: formData.get(`firstName_${index}`),
          lastName: formData.get(`lastName_${index}`),
          dateOfBirth: formData.get(`dob_${index}`),
          passportNumber: formData.get(`passport_${index}`),
          nationality: formData.get(`nationality_${index}`)
        });
      });
      
      console.log('Submitting flight booking with passenger details:', passengerDetails);
      
      const booking = await this.bookFlight(
        this.selectedFlight._id,
        this.selectedSeats.map(s => s.id),
        {
          adults: this.selectedSeats.length,
          children: 0
        },
        passengerDetails
      );
      
      console.log('Flight booking complete:', booking);
      
      // Success!
      alert(`Booking confirmed! Booking ID: ${booking._id}`);
      
      // Redirect to dashboard
      window.location.href = 'dashboard.html';
      
    } catch (error) {
      alert(`Booking failed: ${error.message}`);
    }
  }

  /**
   * Select a flight
   */
  async selectFlight(flightId) {
    try {
      await this.getFlightDetails(flightId);
      await this.displaySeatMap(flightId, 'seat-map-container');
    } catch (error) {
      alert(`Failed to load flight: ${error.message}`);
    }
  }
}

// Initialize the widget
const bookingWidget = new FlightBookingWidget();
