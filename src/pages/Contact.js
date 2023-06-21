import React from 'react'
import { IoMdContacts } from 'react-icons/io';
import contact1 from './contact1.gif'
import ContactForm from '../components/ContactForm'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaMobileAlt } from 'react-icons/fa'
import { FaEnvelope } from 'react-icons/fa'

function Contact() {
  return (
    <>
      <div className='contact'>
        <div className='contact-logo'><IoMdContacts /><span>Contact Us</span><img src={contact1} /></div>
        <div className='contact-content'>
          <div className='contact-form'>
            <ContactForm />
          </div>
          <div className='contact-details'>
            <div className='c-up'>
              <div className='up-heading'>Get In Touch</div>
              <div className='up-info'>Just hit me up on my Email. You can text me too if you want or just call me. We will try to get back to you as soon as possible.</div>
            </div>
            <div className='c-down'>
              <div className='down-heading'>My Address</div>
              <div className='down-info'>
                <ul>
                  <li><FaMapMarkerAlt /><span>Mumbai, India</span></li>
                  <li><FaEnvelope /><span>citadelindiatech@gmail.com</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
