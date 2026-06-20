import React from 'react';
import '../about_me/AboutMe.css';
import RippleCircle from './ripple_circle/RippleCircle.jsx';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FaLinkedin, FaWhatsapp, FaDownload, FaGithub } from 'react-icons/fa';

const iconMap = {
    email: <MdEmail />,
    whatsapp: <FaWhatsapp />,
    linkedIn: <FaLinkedin />,
    location: <MdLocationOn />,
    github: <FaGithub />
};

const ABOUT_DATA = {
    image_url: '',
    name: 'Kamran Shahzad',
    title: 'Flutter Mobile Engineer',
    bio: '',
    summary: '',
    socialLinks: [
        { id: 'email', type: 'email', label: 'kamranmehar005@gmail.com', url: 'kamranmehar005@gmail.com' },
        { id: 'linkedin', type: 'linkedIn', label: 'LinkedIn', url: 'https://linkedin.com/in/kamran-shahzad' },
        { id: 'github', type: 'github', label: 'GitHub', url: 'https://github.com/KamranMehar' },
        { id: 'whatsapp', type: 'whatsapp', label: '+92 348 009 5267', url: 'https://wa.me/923480095267' },
        { id: 'location', type: 'location', label: 'Gujranwala, Punjab, Pakistan', url: '#' },
    ]
};

const RESUME_PATH = '/assets/Kamran_Shahzad_Flutter_Developer_Resume.pdf';

const AboutMe = React.forwardRef((_, ref) => {
    const data = ABOUT_DATA;

    return (
        <section id="about_me" ref={ref} className="about_section">
            {/* Open to work chip */}
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

            {/* Sticky download CV button */}
            <div className="cv-button-wrapper">
                <a
                    className="sticky-download-cv"
                    href={RESUME_PATH}
                    download="Kamran_Shahzad_Flutter_Developer_Resume.pdf"
                >
                    <span className="cv-text">Download CV</span>
                    <span className="cv-icon"><FaDownload /></span>
                </a>
            </div>
        </section>
    );
});

export default AboutMe;