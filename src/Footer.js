import React from 'react';
//import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  return (
    <footer className="container-fluid bg-dark text-white d-flex flex-column justify-content-center align-items-center py-3">
      <div className="d-flex justify-content-center">
        <a href="https://www.facebook.com/imdb" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://twitter.com/imdb" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="https://www.instagram.com/imdb/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/company/imdb-com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <i className="bi bi-linkedin"></i>
        </a>
        <a href="https://www.youtube.com/imdb" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <i className="bi bi-youtube"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;