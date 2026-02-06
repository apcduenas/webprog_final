import React, { useState } from 'react';
import FlameText from './FlameText';

const Gallery = () => {
    const images = [
        { src: `${import.meta.env.BASE_URL}images/Picture1.jpg`, alt: 'Picture 1' },
        { src: `${import.meta.env.BASE_URL}images/Picture2.jpg`, alt: 'Picture 2' },
        { src: `${import.meta.env.BASE_URL}images/Picture3.jpg`, alt: 'Picture 3' },
        { src: `${import.meta.env.BASE_URL}images/Picture4.jpg`, alt: 'Picture 4' }
    ];


    const [selected, setSelected] = useState(null);

    const openModal = (index) => {
        setSelected(index);
    };

    const closeModal = () => {
        setSelected(null);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        if (selected === null) return;
        setSelected((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (selected === null) return;
        setSelected((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section id="gallery" className="gallery">
            <div className="gallery-container">
                <h2><FlameText text="Photo Gallery" /></h2>
                <div className="gallery-grid">
                    {images.map((img, idx) => (
                        <div className="thumb" key={idx}>
                            <img src={img.src} alt={img.alt} onClick={() => openModal(idx)} />
                        </div>
                    ))}
                </div>

                {selected !== null && (
                    <div className="modal" onClick={closeModal}>
                        <button className="nav prev" onClick={prevImage}><i className="fas fa-chevron-left"></i></button>
                        <img
                            src={images[selected].src}
                            alt={images[selected].alt}
                            className="modal-img"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button className="nav next" onClick={nextImage}><i className="fas fa-chevron-right"></i></button>
                        <button className="close" onClick={closeModal}>×</button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Gallery;
