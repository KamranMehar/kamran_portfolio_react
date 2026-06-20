import React from 'react';
import '../summary/summary.css';
import { FiUser, FiMapPin, FiCode, FiSmartphone, FiDatabase, FiGitBranch } from 'react-icons/fi';

const SUMMARY_TEXT = `Flutter Mobile Engineer with 4 years of experience shipping production iOS and Android apps live on the Play Store and App Store. I own the full mobile lifecycle — architecture, state management, CI/CD, and store deployment. Strong in real-time systems (chat, streaming, calling), Firebase, and advanced state management (BLoC, Riverpod, Provider). Proven track record collaborating with international teams across healthcare, travel, logistics, fitness, and social.`;

const BIO_TEXT = `Based in Gujranwala, Punjab, Pakistan. I specialize in building high-performance cross-platform mobile applications using Flutter. My expertise spans real-time messaging, audio/video calling integration, live streaming monetization, e-commerce platforms, and complex booking systems. I have hands-on experience with Firebase ecosystem (Auth, Firestore, Cloud Functions, FCM), RESTful APIs, and backend integration. I also mentor junior developers and establish CI/CD pipelines to streamline release cycles.`;

const HIGHLIGHTS = [
    { icon: <FiSmartphone size={16} />, label: '4+ Years', sub: 'Experience' },
    { icon: <FiCode size={16} />, label: 'Flutter', sub: 'Expert' },
    { icon: <FiDatabase size={16} />, label: 'Firebase', sub: 'Specialist' },
    { icon: <FiGitBranch size={16} />, label: 'CI/CD', sub: 'DevOps' },
];

const HIGHLIGHT_WORDS = [
    'Flutter', 'iOS', 'Android', 'Play', 'Store', 'App', 'BLoC', 'Riverpod', 'Provider', 'Firebase',
    'architecture', 'state', 'management', 'CI/CD', 'real-time', 'chat,', 'streaming,', 'calling),'
];

const Summary = React.forwardRef((_, ref) => {
    return (
        <section id="summary" ref={ref} className="summary-section">
            <div className="section-header">
                <FiUser className="header-icon" size={24} />
                <h1 className="summary-title">About Me</h1>
            </div>

            <div className="summary-text">
                <p className="summary-paragraph">
                    {SUMMARY_TEXT.split(' ').map((word, i) => {
                        const cleanWord = word.replace(/[.,;:!?]$/, '');
                        const isHighlight = HIGHLIGHT_WORDS.some(h =>
                            cleanWord.toLowerCase() === h.toLowerCase() ||
                            word.toLowerCase().includes(h.toLowerCase())
                        );
                        return (
                            <React.Fragment key={i}>
                                <span
                                    className={isHighlight ? 'word-highlight' : 'word-normal'}
                                    style={{ animationDelay: `${i * 0.015}s` }}
                                >
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        );
                    })}
                </p>
            </div>

            <div className="highlights-grid">
                {HIGHLIGHTS.map((h, i) => (
                    <div key={i} className="highlight-card" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                        <div className="highlight-icon">{h.icon}</div>
                        <div className="highlight-text">
                            <span className="highlight-label">{h.label}</span>
                            <span className="highlight-sub">{h.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bio-wrapper">
                <div className="accent-bar" />
                <div className="bio-glass">
                    <div className="bio-header">
                        <FiMapPin size={16} />
                        <span>Gujranwala, Punjab, Pakistan</span>
                    </div>
                    <p className="bio-paragraph">{BIO_TEXT}</p>
                </div>
            </div>
        </section>
    );
});

export default Summary;