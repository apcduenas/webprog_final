import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

const Guestbook = () => {
    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        comment: '',
        isPublic: false
    });
    const [loading, setLoading] = useState(true);

    // Fetch messages in real-time
    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ id: doc.id, ...doc.data() });
            });
            setEntries(messages);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.comment.trim()) return;

        try {
            await addDoc(collection(db, "messages"), {
                name: formData.name,
                comment: formData.comment,
                public: formData.isPublic,
                createdAt: serverTimestamp()
            });

            setFormData({ name: '', comment: '', isPublic: false });
        } catch (error) {
            console.error("Error adding message: ", error);
            alert("Nagkaroon ng error sa pag-send ng message. Siguraduhin na tama ang iyong Firebase config.");
        }
    };

    return (
        <section id="guestbook" className="guestbook">
            <div className="guestbook-container">
                <h2>Get In <span className="accent">Touch</span></h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Leave your feedback and connect with me!</p>
                <form className="contact-form" onSubmit={handleSubmit}>
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
                    <div className="form-group checkbox">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="isPublic"
                                checked={formData.isPublic}
                                onChange={handleInputChange}
                            />
                            <span>Make this public</span>
                        </label>
                    </div>
                    <button type="submit" className="btn-primary">Send Message</button>
                </form>


                <div className="comments-wrapper">
                    <h3>Recent Messages</h3>
                    {loading ? (
                        <p style={{ textAlign: 'center' }}>Loading messages...</p>
                    ) : entries.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>No messages yet. Be the first one!</p>
                    ) : (
                        entries.map((entry) => (
                            <div key={entry.id} className="comment-card">
                                <div className="comment-header">
                                    <h3>{entry.name}</h3>
                                </div>
                                <p>{entry.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Guestbook;

