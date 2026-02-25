import { useState, useEffect } from 'react';
import FlameText from './FlameText';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

const Guestbook = () => {
    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        comment: '',
        isPublic: false
    });
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [dbError, setDbError] = useState(false);

    // Fetch messages on mount
    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/guestbook`);
            if (!response.ok) throw new Error('Failed to fetch');
            const result = await response.json();
            setEntries(result.data || result || []);
            setDbError(false);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setDbError(true);
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
            const response = await fetch(`${API_URL}/api/guestbook`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    comment: formData.comment,
                    isPublic: formData.isPublic
                })
            });

            if (!response.ok) throw new Error('Failed to send comment');

            setFormData({ name: '', comment: '', isPublic: false });
            fetchMessages(); // Refresh list manually
        } catch (error) {
            console.error('Error adding comment: ', error);
            alert('Failed to send comment. Please try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="guestbook" className="guestbook">
            <div className="guestbook-container">
                <h2><FlameText text="Guestbook" /></h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Leave a mark! Drop a comment below.</p>
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
                        {sending ? 'Sending...' : 'Comment'}
                    </button>
                </form>

                <div className="comments-wrapper">
                    <h3>Recent Messages</h3>
                    {dbError ? (
                        <p style={{ color: '#aaa', textAlign: 'center' }}>
                            Comments unavailable. Database not configured.
                        </p>
                    ) : loading ? (
                        <p style={{ textAlign: 'center' }}>Loading comments...</p>
                    ) : entries.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>No comments yet. Be the first one!</p>
                    ) : (
                        <div className="comments-grid">
                            {entries.map((entry) => (
                                <div key={entry.id} className="comment-card">
                                    <div className="comment-header">
                                        <h3>{entry.name}</h3>
                                    </div>
                                    <p>{entry.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Guestbook;