import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Suraksha</h4>
            <p>A cutting-edge AI-powered railway safety solution by GatiRakshak, ensuring safe and efficient rail operations across India.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#safety">Safety Features</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>📍 Rail Bhavan, New Delhi</li>
              <li>📞 Emergency: 1800-111-139</li>
              <li>✉️ support@gatirakshak.in</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Railway Safety Stats</h4>
            <ul className="footer-stats">
              <li>🚉 10,000+ Stations Protected</li>
              <li>🛤️ 50,000+ km Track Coverage</li>
              <li>🚨 99.9% Alert Accuracy</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 GatiRakshak - Suraksha. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
