import React from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css'; // Import the new CSS file
import Slideshow from '../compenents/SlideShow';
import videoData from '../data/videos.json';

function Home() {
  return (
    <div className="home-container">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="soccer stats leagues" />
        <meta name="author" content="Aaron J Park" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hatttrick</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </Helmet>

      <section id="hero">
        <div className="px-4 pt-3 my-3 border-bottom">
          <div className="container">
            <h1 className="display-4 fw-bold">Our Goal</h1>
            <div className="row">
              <div className="col-lg-6">
                <p className="lead mb-4">
                  The website's goal is to deliver fast, reliable, and relevant football information to enthusiasts and professionals 
                  alike. By focusing on accuracy and timeliness, the site ensures users are always up-to-date with the latest news and 
                  scores. With a commitment to quality content, the platform aims to be the go-to source for all football-related information.
                </p>
              </div>
              <div className="col-lg-6 d-flex justify-content-center">
                <Slideshow videos={videoData.videos} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <small>Copyright © 2024. Hatttrick. All Rights Reserved.</small>
      </footer>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Home;