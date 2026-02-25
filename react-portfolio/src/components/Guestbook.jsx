import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import FlameText from './FlameText';

const Guestbook = () => {
    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        comment: '',
        isPublic: false
    });
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [dbError, setDbError] = useState(!supabase);

    // Fetch messages on mount + real-time subscription
    useEffect(() => {
        if (!supabase) {
            setLoading(false);
            return;
        }

        fetchMessages();

        // Real-time subscription: new comments appear instantly
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
            setDbError(true);
        } else {
            setEntries(data || []);
            setDbError(false);
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

        if (!supabase) {
            alert("Database connection not configured.");
            return;
        }

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
            // No need to fetch manually due to realtime
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
                    <button type="submit" className="btn-primary" disabled={sending || !supabase}>
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