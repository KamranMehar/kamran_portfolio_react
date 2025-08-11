import React, { useEffect, useState } from 'react';
import './AboutMe.css';
import RippleCircle from './ripple_circle/RippleCircle.jsx';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MdEmail, MdCall, MdLocationOn } from 'react-icons/md';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const iconMap = { email: <MdEmail />, whatsapp: <FaWhatsapp />, linkedIn: <FaLinkedin />, location: <MdLocationOn /> };

const defaultData = {
    image_url: '',
    name: '',
    title: '',
    bio: '',
    summary: '',
    socialLinks: []
};

const AboutMe = React.forwardRef((_, ref) => {
    const [data, setData] = useState(defaultData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const docSnap = await getDoc(doc(db, 'portfolio_content', 'about_me'));
            if (docSnap.exists()) setData(docSnap.data());
            setLoading(false);
        }
        fetchData();
    }, []);

    /* ---------- LOADING STATE (no “Open to work”) ---------- */
    if (loading) {
        return (
            <section id="about_me" ref={ref} className="about_section">
                {/* Chip row always visible */}
                <div className="chip_row">
                    <RippleCircle />
                    <span className="chip_text">Open to work</span>
                </div>

                {/* Shimmer skeletons for title, name, and social links */}
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-name" style={{ marginTop: '0.5rem' }} />

                <div className="social_wrapper">
                    <div className="social_grid">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <div key={idx} className="skeleton skeleton-link" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    /* ---------- REAL CONTENT ---------- */
    return (
        <section id="about_me" ref={ref} className="about_section">
            <div className="chip_row">
                <RippleCircle />
                <span className="chip_text">Open to work</span>
            </div>

            <p className="title">{data.title?.toUpperCase()}</p>
            <h1 className="name">{data.name?.toUpperCase()}</h1>

            <div className="social_wrapper">
                <div className="social_grid">
                    {data.socialLinks?.map((link) => (
                        <a
                            key={link.id}
                            className="social_link"
                            href={link.type === 'email' && !link.url.startsWith('mailto:')
                                ? `mailto:${link.url}`
                                : link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="icon">{iconMap[link.type]}</span>
                            <span className="label">{link.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default AboutMe;