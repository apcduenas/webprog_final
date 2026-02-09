import React, { useState, useEffect, useRef } from 'react';
import './AIAssistant.css';

const AIAssistant = ({ isOpen, setIsOpen }) => {
    // const [isOpen, setIsOpen] = useState(false); // Controlled by App.jsx now
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi, my name is Anthony Duenas. I am a second-year BSIT student at Asia Pacific College (APC). You can ask me anything about me. Is there something you want to know?",
            sender: 'ai'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user'
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = generateResponse(newUserMessage.text);
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: aiResponse,
                sender: 'ai'
            }]);
            setIsTyping(false);
        }, 1500);
    };

    const generateResponse = (text) => {
        const lowerText = text.toLowerCase();

        // Simple Tagalog Detection
        // Improved Tagalog Detection
        const tagalogKeywords = [
            'ka', 'mo', 'ako', 'kita', 'tayo', 'sila', 'saan', 'kailan', 'paano', 'bakit', 'ano',
            'sino', 'taga', 'ba', 'kamusta', 'bata', 'ilang', 'ilan', 'kayo', 'niyo', 'niya',
            'nila', 'ko', 'akin', 'amin', 'atin', 'inyo', 'kanino', 'po', 'opo', 'yung', 'ang',
            'ng', 'sa', 'na', 'pa', 'nga', 'din', 'rin', 'daw', 'raw', 'naman', 'pala', 'kaya',
            'mga', 'kapatid', 'pamilya', 'magulang', 'tatay', 'nanay', 'tira', 'bahay',
            'aral', 'gwapo', 'pogi', 'ganda', 'pangalan', 'kumusta', 'nilalayon', 'gawa', 'kababayan'
        ];

        // Clean text of punctuation for better matching
        const cleanText = lowerText.replace(/[?!.,]/g, '');
        const words = cleanText.split(/\s+/);

        const isTagalog = tagalogKeywords.some(keyword => words.includes(keyword)) ||
            lowerText.includes('tagalog') ||
            lowerText.includes('kaba') || // handle common contraction 'ka ba' -> 'kaba'
            lowerText.includes('ano') ||
            lowerText.includes('naman');

        // --- PERSONAL INFO LOGIC ---

        // Identity / Name
        if (lowerText.includes('who are you') || lowerText.includes('your name') || lowerText.includes('sino ka') || lowerText.includes('pangalan mo')) {
            return isTagalog
                ? "Ako si Anthony Duenas, isang second-year BSIT student sa APC."
                : "I am Anthony Duenas, a 2nd year BSIT student at APC.";
        }

        if (lowerText.includes('full name') || (lowerText.includes('name') && lowerText.includes('real')) || lowerText.includes('tunay') || lowerText.includes('buong pangalan')) {
            return isTagalog
                ? "Ang tunay na pangalan ko ay Anthony Salik Duenas."
                : "My real name is Anthony Salik Duenas.";
        }

        // Age / Birthdate - Improved matching
        if (lowerText.includes('how old') || lowerText.includes('age') || lowerText.includes('ilang taon')) {
            const birthDate = new Date('2006-03-28');
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return isTagalog
                ? `Ako ay ${age} taong gulang na.`
                : `I am ${age} years old.`;
        }

        if (lowerText.includes('birthdate') || lowerText.includes('birthday') || lowerText.includes('born') || lowerText.includes('kaarawan') || lowerText.includes('pinanganak')) {
            return isTagalog
                ? "Pinanganak ako noong March 28, 2006."
                : "I was born on March 28, 2006.";
        }

        // Siblings
        if (lowerText.includes('siblings') || lowerText.includes('brother') || lowerText.includes('sister') || lowerText.includes('family') || lowerText.includes('kapatid') || lowerText.includes('pamilya')) {
            return isTagalog
                ? "Tatlo kaming magkakapatid at ako ang panganay. Ang pangalan ng kapatid kong pangalawa ay Ace Duenas (Lalaki, pinanganak noong December 13, 2010) at ang bunso naman ay Althea Duenas (Babae, pinanganak noong December 7, 2012)."
                : "There are three of us siblings and I am the eldest. My second sibling is Ace Duenas (Male, born December 13, 2010), and the youngest is Althea Duenas (Female, born December 7, 2012).";
        }

        // Relationship Status
        if (lowerText.includes('girlfriend') || lowerText.includes('gf') || lowerText.includes('jowa') || lowerText.includes('kasintahan')) {
            return isTagalog
                ? "Wala pa siyang girlfriend, Pwede kaba?"
                : "He doesn't have a girlfriend yet. Are you available?";
        }

        // Education / School
        if (lowerText.includes('school') || lowerText.includes('study') || lowerText.includes('university') || lowerText.includes('college') || lowerText.includes('aral') || lowerText.includes('pasok') || lowerText.includes('course') || lowerText.includes('year')) {
            return isTagalog
                ? "Nag-aaral ako bilang 2nd year BSIT student sa Asia Pacific College (APC)."
                : "I am a 2nd year BSIT student at Asia Pacific College (APC).";
        }

        // Address / Location / Origin
        if (lowerText.includes('address') || lowerText.includes('live') || lowerText.includes('location') || lowerText.includes('tira') || lowerText.includes('saan ka') || lowerText.includes('bahay') || lowerText.includes('from') || lowerText.includes('origin') || lowerText.includes('taga') || lowerText.includes('probinsya')) {
            return isTagalog
                ? "Nakatira ako ngayon sa Boston Heights, Toclong, Kawit, Cavite Blk 9 Lot 6 Phase 2."
                : "I am from Boston Heights, Toclong, Kawit, Cavite Blk 9 Lot 6 Phase 2.";
        }

        // Parents
        if (lowerText.includes('mother') || lowerText.includes('mom') || lowerText.includes('mama') || lowerText.includes('nanay')) {
            return isTagalog
                ? "Ang pangalan ng mama ko ay Baisahara Salik Duenas."
                : "My mother's name is Baisahara Salik Duenas.";
        }

        if (lowerText.includes('father') || lowerText.includes('dad') || lowerText.includes('papa') || lowerText.includes('tatay') || lowerText.includes('ama')) {
            return isTagalog
                ? "Ang pangalan ng aking ama ay Anastacio Aclan Duenas."
                : "My father's name is Anastacio Aclan Duenas.";
        }

        if (lowerText.includes('parents') || lowerText.includes('magulang')) {
            return isTagalog
                ? "Ang mama ko ay si Baisahara Salik Duenas at ang papa ko ay si Anastacio Aclan Duenas."
                : "My parents are Baisahara Salik Duenas (Mother) and Anastacio Aclan Duenas (Father).";
        }

        // Favorites / Idols
        if (lowerText.includes('idol') || lowerText.includes('rap') || lowerText.includes('artist') || lowerText.includes('singer') || lowerText.includes('music') || lowerText.includes('musika')) {
            return isTagalog
                ? "Ang mga idol ko ay sila Shanti Dope, Hellmerry, Flow G, at Bugoy na Koykoy."
                : "My idols are Shanti Dope, Hellmerry, Flow G, and Bugoy na Koykoy.";
        }

        // General Portfolio Logic
        if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('kamusta')) {
            return isTagalog
                ? "Hello! Pwede mo akong tanungin tungkol sa aking sarili, mga gawa, o kakayahan."
                : "Hello! You can ask me about my personal info, projects, or skills.";
        }

        if (lowerText.includes('project') || lowerText.includes('work') || lowerText.includes('gawa')) {
            return isTagalog
                ? "Marami na akong nagawang magagandang projects, kasama na ang portfolio na ito! Tignan mo ang Projects section para sa iba pa."
                : "I have worked on several impressive projects, including this portfolio! Check out the Projects section for more details.";
        }

        if (lowerText.includes('skill') || lowerText.includes('stack') || lowerText.includes('kakayahan') || lowerText.includes('alam')) {
            return isTagalog
                ? "Magaling ako sa React, JavaScript, HTML, CSS, at marami pang iba. Patuloy pa akong nag-aaral ng mga bagong technologies!"
                : "I am proficient in React, JavaScript, HTML, CSS, and more. I'm always learning new technologies!";
        }

        if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('celapon') || lowerText.includes('mensahe')) {
            return isTagalog
                ? "Pwede mo akong kontakin gamit ang Contact section sa baba, o mag-iwan ng mensahe sa Guestbook."
                : "You can reach me through the Contact section below, or leave a message in the Guestbook.";
        }

        if (lowerText.includes('pogi') || lowerText.includes('gwapo') || lowerText.includes('handsome') || lowerText.includes('cute')) {
            return isTagalog
                ? "Oo tanong mopa sa mama ko"
                : "Yes, just ask my mom!";
        }

        if (lowerText.includes('cool') || lowerText.includes('wow') || lowerText.includes('nice') || lowerText.includes('astig') || lowerText.includes('galing')) {
            return isTagalog
                ? "Salamat! Masaya ako na nagustuhan mo."
                : "Glad you like it! Thanks for the compliment.";
        }

        return isTagalog
            ? "Pasensya na, pinag-aaralan ko pa yan. Subukan mong magtanong tungkol sa aking pamilya, kaarawan, tirahan, o mga projects!"
            : "I'm still learning. Try asking about my family, birthday, address, or projects!";
    };

    return (
        <div className={`ai-assistant-container ${isOpen ? 'open' : ''}`}>
            {/* Chat Window */}
            <div className={`ai-chat-window ${isOpen ? 'visible' : ''}`}>
                <div className="ai-header">
                    <div className="ai-avatar">
                        <img src="/webprog_final/images/Picture1.jpg" alt="Anthony" />
                    </div>
                    <div className="ai-info">
                        <h3>Anthony Duenas</h3>
                        <span className="status-dot"></span> Online
                    </div>
                    <button className="close-btn" onClick={toggleChat}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="ai-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.sender}`}>
                            <div className="message-content">
                                {msg.text}
                            </div>
                            <div className="message-time">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message ai typing">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="ai-input-area" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" disabled={!inputValue.trim()}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>

            {/* Floating Toggle Button */}
            <button className={`ai-toggle-btn ${isOpen ? 'open-state' : 'closed-state'}`} onClick={toggleChat}>
                {isOpen ? (
                    <i className="fas fa-chevron-down"></i>
                ) : (
                    <div className="ai-pill-content">
                        <div className="ai-pill-avatar">
                            <img src="/webprog_final/images/Picture1.jpg" alt="Anthony" />
                        </div>
                        <span className="online-indicator"></span>
                        <span className="ai-pill-text">Online, Chat with Anthony</span>
                    </div>
                )}
                <span className="pulse-ring"></span>
            </button>
        </div>
    );
};

export default AIAssistant;
