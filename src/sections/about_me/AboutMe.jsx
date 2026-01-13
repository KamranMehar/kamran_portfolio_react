import React, { useEffect, useState } from 'react';
import '../about_me/AboutMe.css';
import RippleCircle from './ripple_circle/RippleCircle.jsx';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MdEmail, MdCall, MdLocationOn } from 'react-icons/md';
import { FaLinkedin, FaWhatsapp, FaDownload } from 'react-icons/fa';

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
    const [resumeUrl, setResumeUrl] = useState('');
    const [resumeFileName, setResumeFileName] = useState(''); // <-- store filename

    useEffect(() => {
        async function fetchData() {
            const docSnap = await getDoc(doc(db, 'portfolio_content', 'about_me'));
            if (docSnap.exists()) setData(docSnap.data());
            setLoading(false);
        }
        fetchData();
    }, []);
    useEffect(() => {
        // read the field you created: "resume_url"
        getDoc(doc(db, 'portfolio_content', 'about_me'))
            .then((snap) => {
                const url = snap.data()?.resume_url;
                if (url) {
                    setResumeUrl(url);
                    setResumeFileName('Kamran_Shahzad_Flutter_Developer_Resume.pdf');
                }
            });
    }, []);

    return (
        <section id="about_me" ref={ref} className="about_section">
            {/* Open to work chip */}
            <div className="chip_row">
                <RippleCircle />
                <span className="chip_text">Open to work</span>
            </div>

            {loading ? (
                <>
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-name" style={{ marginTop: '0.5rem' }} />
                    <div className="social_wrapper">
                        <div className="social_grid">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <div key={idx} className="skeleton skeleton-link" />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
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
                </>
            )}

            {/* Sticky download CV button */}
            <a
                className="sticky-download-cv"
                href={resumeUrl}
                download={resumeFileName}
            >
                <span className="cv-text">Download CV</span>
                <span className="cv-icon"><FaDownload /></span>
            </a>
        </section>
    );
});

export default AboutMe;
