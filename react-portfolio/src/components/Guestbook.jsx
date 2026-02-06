import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const Guestbook = () => {
    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        comment: '',
        isPublic: false
    });
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    // Fetch messages
    useEffect(() => {
        fetchMessages();

        // Real-time subscription
        const subscription = supabase
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                setEntries(prev => [payload.new, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching messages:', error);
        } else {
            setEntries(data || []);
        }
        setLoading(false);
    };

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

        setSending(true);

        try {
            const { error } = await supabase
                .from('messages')
                .insert([
                    {
                        name: formData.name,
                        comment: formData.comment,
                        public: formData.isPublic
                    }
                ]);

            if (error) throw error;

            setFormData({ name: '', comment: '', isPublic: false });
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error adding message: ", error);
            alert("Mali ang configuration! Siguraduhin na nailagay mo ang tamang Supabase URL at Key sa src/supabase.js");
        } finally {
            setSending(false);
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
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', justifyContent: 'flex-start' }}>
                        <input
                            type="checkbox"
                            name="isPublic"
                            id="isPublic"
                            checked={formData.isPublic}
                            onChange={handleInputChange}
                            style={{ width: '18px', height: '18px', margin: 0, cursor: 'pointer' }}
                        />
                        <label htmlFor="isPublic" style={{ cursor: 'pointer', margin: 0, fontSize: '1rem', color: 'var(--text-dark)', fontWeight: '500' }}>
                            Make this public
                        </label>
                    </div>
                    <button type="submit" className="btn-primary" disabled={sending}>
                        {sending ? 'Sending...' : 'Send Message'}
                    </button>
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
