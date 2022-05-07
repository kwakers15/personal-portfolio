import React, { useState, useEffect, useRef } from 'react';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import emailjs from '@emailjs/browser';
import './index.scss'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const refForm = useRef();
  const { REACT_APP_EMAIL_API_KEY, REACT_APP_EMAIL_TEMPLATE_KEY, REACT_APP_EMAIL_SERVICE_KEY } = process.env;

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000);
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        REACT_APP_EMAIL_SERVICE_KEY,
        REACT_APP_EMAIL_TEMPLATE_KEY,
        refForm.current,
        REACT_APP_EMAIL_API_KEY
      );
      alert('Message successfully sent!');
      window.location.reload(false);
    } catch {
      alert('Failed to send the message - please try again.')
    }
  }

  return (
    <>
      <div className='container contact-page'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
              letterClass={letterClass} />
          </h1>
          <p>
            I am interested in these things. However, if you have other requests
            or question, don't hesitate to contact me using the below form.
          </p>
          <div className='contact-form'>
            <form ref={refForm} onSubmit={(e) => sendEmail(e)}>
              <ul>
                <li className='half'>
                  <input
                    type='text'
                    name='name'
                    placeholder='Name'
                    required
                  />
                </li>
                <li className='half'>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder='Subject'
                    type='text'
                    name='subject'
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder='Message'
                    name='message'
                    required
                  ></textarea>
                </li>
                <li>
                  <input
                    type='submit'
                    className='flat-button'
                    value='SEND'
                  />
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className='info-map'>
          Minjun Kwak,
          <br />
          United States,
          <br />
          Boise, Idaho <br />
          <span>minjunkwak@gmail.com</span>
        </div>
        <div className='map-wrap'>
          <MapContainer center={[43.6153450012207, -116.20197296142578]} zoom={11}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker position={[43.6153450012207, -116.20197296142578]}>
              <Popup>Minjun lives here :)</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type='pacman' />
    </>
  )
}

export default Contact;