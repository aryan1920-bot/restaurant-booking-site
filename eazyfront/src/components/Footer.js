// Footer.js
import React from 'react';
import './css/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact">
      
      <section>
        <h2 className='fields'>Phone Numbers</h2>
        <ul>
          <li>Main Office: (+91) 89XXXXXXXX</li>
          <li>Support: (+91) 93XXXXXXXXXX </li>
        </ul>
      </section>

      <section>
        <h2 className='fields'>Email Addresses</h2>
        <p>
          General Inquiries: <a href="mailto:help@savouryseats.com">help@savouryseats.com</a>
        </p>
        <p>
          Support: <a href="mailto:support@savouryseats.com">support@savouryseats.com</a>
        </p>
      </section>

      <section>
        <h2 className='fields'>Social Media</h2>
        <p>
          Instagram: <a href="https://www.instagram.com/savouryseats" target="_blank" rel="noopener noreferrer">@savouryseats</a>
        </p>
        <p>
          X: <a href="https://twitter.com/savouryseats" target="_blank" rel="noopener noreferrer">@savouryseats</a>
        </p>
      </section>
      <div className='copy'>
        <p>&copy; {currentYear} SavourySeats</p>
      </div>
    </footer>
  );
};

export default Footer;
