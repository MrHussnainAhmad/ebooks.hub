import React, { useState, useEffect } from "react";
import "./App.css";
import { FaFacebook, FaTwitter, FaWhatsapp, FaCopy, FaEnvelope, FaInstagram } from "react-icons/fa";
import pic1 from "./assets/1.png";
import pic2 from "./assets/2.png";
import pic3 from "./assets/3.png";

const LandingPage = () => {
  const [shareOpen, setShareOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const websiteURL = "https://ebookshub.live";

  // Define showNotification function first
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(websiteURL);
    showNotification("Website link copied to clipboard!", "success");
  };


  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1)); // Fixed a0 to 0
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const slides = [pic1, pic2, pic3];
  
  // Calculate launch date (30 days from now)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);
  
  return (
    <div className="landing-page">
      <div className="bg-animation">
        <div className="bg-1"></div>
        <div className="bg-2"></div>
        <div className="bg-3"></div>
      </div>
      
      <div className="content-container">
        <div className="header">
          <div className="logo">
            <span className="logo-text">EbooksHub</span>
          </div>
          <div className="coming-soon-badge">Coming Soon</div>
        </div>
        
        <div className="main-content">
          <div className="text-section">
            <h1>A New Era of Digital Reading</h1>
            <p className="subtitle">Get ready for unlimited free ebooks, author promotions, and a community of book lovers.</p>
            
            <div className="features">
              <div className="feature">
                <div className="feature-icon">📚</div>
                <div className="feature-text">Free Access to Thousands of eBooks</div>
              </div>
              <div className="feature">
                <div className="feature-icon">🖋️</div>
                <div className="feature-text">Author Promotion Platform</div>
              </div>
              <div className="feature">
                <div className="feature-icon">💬</div>
                <div className="feature-text">Reader Community & Discussions</div>
              </div>
            </div>
            
            <div className="countdown-section">
              <h3>Launching On</h3>
              <div className="countdown">
                <div className="countdown-item">
                  <span className="count">39</span>
                  <span className="label">Days</span>
                </div>
                <div className="countdown-item">
                  <span className="count">23</span>
                  <span className="label">April</span>
                </div>
                <div className="countdown-item">
                  <span className="count1">2025</span>
                </div>
              </div>
            </div>
  
          </div>
          <div className="image-section">
            <div className="image-slider">
              {slides.map((slide, index) => (
                <img 
                  key={index} 
                  src={slide} 
                  alt={`Preview ${index + 1}`} 
                  className={`slide ${index === currentSlide ? 'active' : ''}`} 
                />
              ))}
              
              <div className="slider-dots">
                {slides.map((_, index) => (
                  <button 
                    key={index} 
                    className={`dot ${index === currentSlide ? 'active' : ''}`} 
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="social-section">
          <button className="share-button" onClick={() => setShareOpen(!shareOpen)}>
            Share This
          </button>
          
          {shareOpen && (
            <div className="share-popup">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${websiteURL}`} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="icon facebook" />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${websiteURL}`} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="icon twitter" />
              </a>
              <a href={`https://api.whatsapp.com/send?text=I Got This Website,If You want to read books ,then Stay Tuned: ${websiteURL}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="icon whatsapp" />
              </a>
              <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="icon instagram" />
              </a>
              <a href={`mailto:mrhussnainahmad@gmail.com?subject=Check out EbooksHub&body=When ${websiteURL} will be live? Time is About to end!`}>
                <FaEnvelope className="icon email" />
              </a>
              <button className="copy-link" onClick={copyLink}>
                <FaCopy className="icon copy" />
              </button>
            </div>
          )}
        </div>
        
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} EbooksHub. All rights reserved.</p>
        </footer>
      </div>
      
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default LandingPage;