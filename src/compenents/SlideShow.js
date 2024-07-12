import React, { useState } from 'react';
import '../styles/slideshow.css';

const Slideshow = ({ videos }) => {

    const [currentSlide, setCurrentSlide] = useState(0);
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % videos.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + videos.length) % videos.length);
    };
  
    const goToSlide = (index) => {
      setCurrentSlide(index);
    };
  
    return (
      <div className="slideshow-wrapper">
        <div className="slideshow-container">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`mySlides ${index === currentSlide ? 'active' : ''}`}
              style={{ display: index === currentSlide ? 'block' : 'none' }}
            >
              <div className="numbertext">{index + 1} / {videos.length}</div>
              {video && <iframe width="500" height="295" src={video} frameBorder="0" allowFullScreen></iframe>}
            </div>
          ))}
          <a className="prev" onClick={prevSlide}>&#10094;</a>
          <a className="next" onClick={nextSlide}>&#10095;</a>
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          {videos.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    );
  };
  
  export default Slideshow;