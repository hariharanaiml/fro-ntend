import React, { useState, useEffect } from 'react';
import './Booking.css';
import { ticketAPI, rideAPI } from '../services/api';

function Booking() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    visitDate: '',
    quantity: 1,
    ticketType: 'adult',
    rideId: '',
    rideName: ''
  });

  const [rides, setRides] = useState([]);
  const [orderNumber, setOrderNumber] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const data = await rideAPI.getAll();
        setRides(data);
      } catch (error) {
        console.error('Failed to fetch rides:', error);
      }
    };
    fetchRides();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getTotalAmount = () => {
    const selectedRide = rides.find(r => r._id === formData.rideId);
    if (!selectedRide) return 0;
    
    const priceMap = {
      adult: selectedRide.adultPrice,
      child: selectedRide.childPrice,
      senior: selectedRide.seniorPrice
    };
    return priceMap[formData.ticketType] * formData.quantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedRide = rides.find(r => r._id === formData.rideId);
      const ticketData = {
        ...formData,
        rideName: selectedRide?.name || '',
        totalPrice: getTotalAmount()
      };

      await ticketAPI.create(ticketData);
      const newOrderNo = "ORD" + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(newOrderNo);
      setIsBooked(true);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isBooked) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <div className="success-section">
            <div className="success-icon">🎟️</div>
            <h2>Booking Confirmed!</h2>
            
            <div className="ticket-details">
              <div className="detail-row">
                <span className="detail-label">Order Number:</span>
                <span className="detail-value">{orderNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{formData.customerName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{formData.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Ride:</span>
                <span className="detail-value">{formData.rideName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Visit Date:</span>
                <span className="detail-value">{formData.visitDate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Tickets:</span>
                <span className="detail-value">{formData.quantity} × {formData.ticketType.toUpperCase()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Total Amount:</span>
                <span className="detail-value">₹{getTotalAmount()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>🎡 Book Your Adventure</h1>
          <p>Select your favorite rides and secure your tickets</p>
        </div>

        <div className="booking-form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="input-group">
                <label>Visit Date</label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group form-grid-full">
                <label>Select Ride</label>
                <select name="rideId" value={formData.rideId} onChange={handleChange} required>
                  <option value="">Choose your adventure</option>
                  {rides.map((ride) => (
                    <option key={ride._id} value={ride._id}>
                      {ride.name} - Adult: ₹{ride.adultPrice}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Number of Tickets</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="10"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Ticket Type</label>
                <select name="ticketType" value={formData.ticketType} onChange={handleChange}>
                  <option value="adult">Adult</option>
                  <option value="child">Child</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            </div>

            {formData.rideId && (
              <div className="price-display">
                <h3>Total Amount</h3>
                <p className="price-amount">₹{getTotalAmount()}</p>
              </div>
            )}

            <button type="submit" className="submit-button" disabled={loading || !formData.rideId}>
              {loading && <span className="loading-spinner"></span>}
              {loading ? 'Processing...' : `Book Now ${formData.rideId ? `- ₹${getTotalAmount()}` : ''}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;