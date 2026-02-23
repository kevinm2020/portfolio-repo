import React from 'react';
import './AboutMeBlock.css';

const AboutMeBlock = () => {
  return (
    <div className="about-me-block">

        {/* Top section: two pictures */}
        <div className="about-me-images">
            <img
            src="/images/pic1.jpg"
            alt="Profile 1"
            className="about-me-image"
            />
            <img
            src="/images/pic2.jpg"
            alt="Profile 2"
            className="about-me-image"
            />
        </div>

        {/* Title */}
        <h2 className="about-me-title">About Me</h2>

        {/* Info section */}
        <div className="about-me-info">
            <p>
            <strong>Location:</strong> Richardson, TX
            </p>
            <p>
            <strong>Phone:</strong> (512) 203-1640
            </p>
            <p>
            <strong>Email:</strong> kevinm2020@icloud.com
            </p>
        </div>
        </div>
    );
};
export default AboutMeBlock;