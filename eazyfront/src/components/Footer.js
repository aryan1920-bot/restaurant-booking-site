// Footer.js
import React from 'react';
import './css/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact">
      {/* Contact information */}
      <section>
        <h2 className='fields'>Phone Numbers</h2>
        {/* <p>Phone Numbers:</p> */}
        <ul>
          <li>Main Office: (+91) 89XXXXXXXX</li>
          <li>Support: (+91) 93XXXXXXXXXX </li>
        </ul>
      </section>

      {/* Email addresses */}
      <section>
        <h2 className='fields'>Email Addresses</h2>
        <p>
          General Inquiries: <a href="mailto:help@eazydiner.com">help@eazydiner.com</a>
        </p>
        <p>
          Support: <a href="mailto:support@eazydiner.com">support@eazydiner.com</a>
        </p>
      </section>

      {/* Social media handles */}
      <section>
        <h2 className='fields'>Social Media</h2>
        <p>
          Instagram: <a href="https://www.instagram.com/eazydiner" target="_blank" rel="noopener noreferrer">@eazydiner</a>
        </p>
        <p>
          X: <a href="https://twitter.com/eazydiner" target="_blank" rel="noopener noreferrer">@eazydiner</a>
        </p>
      </section>
      <div className='copy'>
        <p>&copy; {currentYear} Eazydiner</p>
      </div>
    </footer>
  );
};

export default Footer;
