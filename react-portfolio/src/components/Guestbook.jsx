import React, { useState } from 'react';

const Guestbook = () => {
    const [entries, setEntries] = useState([
        { name: 'Ghost Rider Fan', comment: 'This portfolio is on fire! 🔥', public: true, liked: false, date: '2023-10-27' },
        { name: 'Web Dev Recruiter', comment: 'Impressive design skills. Keep it up!', public: true, liked: true, date: '2023-10-28' }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        comment: '',
        isPublic: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.comment.trim()) return;

        const newEntry = {
            name: formData.name,
            comment: formData.comment,
            public: formData.isPublic,
            liked: false,
            date: new Date().toISOString().split('T')[0]
        };

        setEntries([newEntry, ...entries]);
        setFormData({ name: '', comment: '', isPublic: false });
    };

    const toggleLike = (index) => {
        const newEntries = [...entries];
        newEntries[index].liked = !newEntries[index].liked;
        setEntries(newEntries);
    };

    return (
        <section id="guestbook" className="guestbook">
            <div className="guestbook-container">
                <h2>Get In <span className="accent">Touch</span></h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Leave your feedback and connect with me!</p>
                <form className="guestbook-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            placeholder="Your Message..."
                            required
                        ></textarea>
                    </div>
                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="isPublic"
                                checked={formData.isPublic}
                                onChange={handleInputChange}
                            />
                            Make this public
                        </label>
                    </div>
                    <button type="submit" className="btn-primary">Send Message</button>
                </form>
                <div className="comments-wrapper">
                    <h3>Recent Messages</h3>
                    {entries.map((entry, idx) => (
                        <div key={idx} className="comment-card">
                            <div className="comment-header">
                                <h3>{entry.name}</h3>
                            </div>
                            <p>{entry.comment}</p>
                            {/* Removed date/like for cleaner look matching screenshot if needed, or keeping it */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Guestbook;
