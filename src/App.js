import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Booking from './components/Booking';
import Attractions from './components/Attractions';
import Login from './components/Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">WONDER-BLACK</Link>
          </div>
          <ul className="nav-links">
            {isLoggedIn ? (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/attractions">Attractions</Link></li>
                <li><Link to="/booking">Book Tickets</Link></li>
                <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/attractions" element={isLoggedIn ? <Attractions /> : <Navigate to="/login" />} />
          <Route path="/booking" element={isLoggedIn ? <Booking /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
