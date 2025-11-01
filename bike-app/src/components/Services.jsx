//import { ReactNode } from "react";
//import React from "react";

// once the .env is added and the S3 bucket is linked, use the S3 bucket images, until then use the public images directory
// S3 bucket implementation occurs in lab 2
// const imageUrl = import.meta.env.VITE_APP_S3_BUCKET_URL ? import.meta.env.VITE_APP_S3_BUCKET_URL : 'images';

import repairImage from '../assets/images/repair.jpeg'
import specialistImage from '../assets/images/specialist.png'

const Services = () => {
  return (
    <div className="services" id="services">
      <h2>Services</h2>
      <div className="services-row">
        <div className="services-img">
          <img src={repairImage} alt="" />
        </div>
        <div className="services-text">
          <p>
            Do you need help installing your bicycle replacement parts or does
            your bike need adjustment? We can help with that. Call one of our
            store locations to schedule an appointment and to get a service
            quote.
          </p>
          <p>
            All of our experienced service technicians have passed a rigorous
            certification program that has industry-wide recognition.
          </p>
          <p>
            <b>We offer a wide variety of services including:</b>
          </p>
          <ul>
            <li>Parts installation</li>
            <li>Bicycle tune ups</li>
            <li>Flat tire repair</li>
            <li>Derailleur adjustment</li>
            <li>Brake caliper adjustment</li>
          </ul>
          <p>
            We specialize in custom bike builds to meet your specific needs.
            Tell us what type of conditions you plan to do most of your riding
            in and our service technicians can recommend the type of frame,
            tires, and groupset that would be most suitable for that
            environment.
          </p>
        </div>
        <div className="services-cert">
          <img src={specialistImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Services;