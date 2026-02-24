import { useState, useEffect } from 'react';

// IMPORTANT: Once you deploy your backend to Render, replace this URL with your actual Render URL.
// Example: const API_URL = 'https://your-project-name.onrender.com';
// For now, it defaults to localhost for testing if you run python app.py locally.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

const Guestbook = () => {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // GET Method: Fetch messages from Flask Backend
    const fetchMessages = async () => {
        try {
            const response = await fetch(`${API_URL}/api/guestbook`);
            if (!response.ok) {
                throw new Error('Failed to connect to backend');
            }
            const result = await response.json();
            // Expecting the backend to return { "data": [...] }
            setMessages(result.data || []);
        } catch (err) {
            console.error("Error fetching messages:", err);
            // Set empty array on error so page doesn't crash
            setMessages([]);
        }
    };

    // Load messages when component mounts
    useEffect(() => {
        fetchMessages();
    }, []);

    // POST Method: Send message to Flask Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/guestbook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, message }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // Clear form and refresh list
            setName('');
            setMessage('');
            await fetchMessages();

        } catch (err) {
            setError('Failed to send message. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="guestbook" id="guestbook">
            <div className="guestbook-container">
                <h2>Guestbook</h2>
                <p>Leave a mark! Sign my guestbook below.</p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="Your Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Signing...' : 'Sign Guestbook'}
                    </button>
                </form>

                <div className="comments-wrapper">
                    <h3>Recent Signatures</h3>
                    <div className="comments-grid">
                        {messages.length === 0 ? (
                            <p style={{ color: '#aaa', textAlign: 'center', width: '100%' }}>
                                No messages yet. Or backend is sleeping (Render free tier).
                            </p>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={msg.id || index} className="comment-card">
                                    <div className="comment-header">
                                        <strong>{msg.name}</strong>
                                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                            {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}
                                        </span>
                                    </div>
                                    <p>{msg.comment || msg.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Guestbook;