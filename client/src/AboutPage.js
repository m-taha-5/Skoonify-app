import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import './App.css';

function AboutPage() {
  return (
    <>
      <Helmet>
        <body className="auth-page-body" />
      </Helmet>

      <div className="main-content">
        <div className="about-box">
          <h2>About Skoonify</h2>
          <p>
            <strong>Skoonify</strong> is a modern and clean music player web application that delivers a smooth, distraction-free music listening experience. It is designed with simplicity, usability, and aesthetic in mind, using core web technologies like HTML, CSS, and JavaScript, now powered by React and Node.js!
          </p>
          <p>
            This project is developed by <strong>Meraj Ul Abdin (F2022266414)</strong> and <strong>Haroon Shah Nawaz (F2022266414)</strong> as a part of their <strong>Term Project for the Advanced Web Technologies course</strong> at the University of Management and Technology (UMT).
          </p>
          <p>
            The project is completed under the supervision of <strong>Sir Shahbaz Ali</strong>, and also serves as a real-world development experience during our internship with <strong>Devs-in Developers</strong>.
          </p>
          <h3>🎯 Key Highlights</h3>
          <ul>
            <li>Fully responsive and visually appealing UI</li>
            <li>Seamless song playback and navigation</li>
            <li>User authentication with a Node.js backend and MongoDB database</li>
            <li>Expandable architecture for future enhancements</li>
          </ul>
          <p>
            The purpose of this project is both academic and practical — bridging classroom learning with real development practices in the tech industry.
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutPage;