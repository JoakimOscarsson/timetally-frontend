import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const links = [
    { name: 'GitHub', url: 'https://github.com/yourusername' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yourprofile' },
    { name: 'Twitter', url: 'https://twitter.com/yourhandle' },
    // Add more links as needed
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-content">
        <p>&copy; 2024 Your Name. All rights reserved.</p>
        <ul className="footer-links">
          {links.map((link, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.footer>
  );
};

export default Footer;
