
import React from 'react';

const ContactInfo = () => {
    return (
        <section id="contact-info" className="get-in-touch">
            <div className="contact-info-container">
                <h2><span className="accent">Information</span></h2>
                <div className="contact-info-grid">
                    <div className="info-card">
                        <div className="info-icon">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="info-content">
                            <h3>Full Name</h3>
                            <p>Anthony Salik Duenas</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">
                            <i className="fas fa-calendar-alt"></i>
                        </div>
                        <div className="info-content">
                            <h3>Date of Birth</h3>
                            <p>March 28, 2006</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="info-content">
                            <h3>Address</h3>
                            <p>Imus, Cavite, Philippines</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">
                            <i className="fas fa-flag"></i>
                        </div>
                        <div className="info-content">
                            <h3>Nationality</h3>
                            <p>Filipino</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="info-content">
                            <h3>Email</h3>
                            <p>asduenas@student.apc.edu.ph</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">
                            <i className="fas fa-phone"></i>
                        </div>
                        <div className="info-content">
                            <h3>Phone</h3>
                            <p>09608720768</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactInfo;
