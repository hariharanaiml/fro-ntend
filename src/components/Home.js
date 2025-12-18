import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to WONDER-BLACK Amusement Park</h1>
        <p>Experience the thrill of a lifetime!</p>
        <button className="book-now-btn" onClick={() => navigate('/booking')}>Book Tickets Now</button>
      </header>
      <section className="features">
        <div className="feature">
          <h2>Rides</h2>
          <p>Thrilling roller coasters and family-friendly attractions.</p>
        </div>
        <div className="feature">
          <h2>Shows</h2>
          <p>Live performances and entertainment for all ages.</p>
        </div>
        <div className="feature">
          <h2>Dining</h2>
          <p>Delicious food and refreshments throughout the park.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
