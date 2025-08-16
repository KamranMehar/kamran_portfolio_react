import React, { useEffect, useState } from 'react';
import '../summary/summary.css';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Summary = React.forwardRef((_, ref) => {
    const [summary, setSummary] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSummary() {
            const snap = await getDoc(doc(db, 'portfolio_content', 'about_me'));
            if (snap.exists()) {
                setSummary(snap.data().summary || '');
                setBio(snap.data().bio || '');
            }
            setLoading(false);
        }
        fetchSummary();
    }, []);

    if (loading) {
        return (
            <section id="summary" ref={ref} className="summary-section">
                <div className="skeleton skeleton-title" />
                <div className="summary-text">
                    <div className="skeleton skeleton-summary" style={{ width: '80%' }} />
                    <div className="skeleton skeleton-summary" style={{ width: '60%' }} />
                </div>
                <div className="bio-wrapper">
                    <div className="accent-bar" />
                    <div className="bio-text">
                        <div className="skeleton skeleton-bio" style={{ width: '90%' }} />
                        <div className="skeleton skeleton-bio" style={{ width: '95%' }} />
                        <div className="skeleton skeleton-bio" style={{ width: '80%' }} />
                        <div className="skeleton skeleton-bio" style={{ width: '85%' }} />
                        <div className="skeleton skeleton-bio" style={{ width: '70%' }} />
                        <div className="skeleton skeleton-bio" style={{ width: '60%' }} />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="summary" ref={ref} className="summary-section">
            <h1 className="summary-title">Summary</h1>
            <div className="summary-text">
                <p className="summary-paragraph">{summary}</p>
            </div>
            <div className="bio-wrapper">
                <div className="accent-bar" />
                <div className="bio-text">
                    <p className="bio-paragraph">{bio}</p>
                </div>
            </div>
        </section>
    );
});

export default Summary;