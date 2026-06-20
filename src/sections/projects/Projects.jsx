import React, { useEffect, useState, useRef } from 'react';
import '../projects/projects.css';
import { FiArrowUpRight } from 'react-icons/fi';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

const PROJECTS_DATA = [
    {
        id: 'pilatix',
        title: 'PILATIX',
        description: 'Fitness, Workout & E-Commerce Platform. Delivered a dual-purpose fitness and e-commerce app for iOS and Android. Complete mobile architecture, Shopify API integration, and real-time workout tracking. Built real-time exercise monitoring with rep counting, rest timers, and progress persistence via Firebase Firestore. Implemented an admin dashboard for content managers to publish workouts, schedule programs, and track user engagement metrics.',
        images: [
            '/assets/projects/Pilatix/01.PNG',
            '/assets/projects/Pilatix/02.PNG',
            '/assets/projects/Pilatix/03.PNG',
            '/assets/projects/Pilatix/04.PNG',
            '/assets/projects/Pilatix/05.PNG',
        ],
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.pilatix.app',
        appStoreUrl: 'https://apps.apple.com/de/app/pilatix/id6758964188',
        liveLink: 'https://pilatix.co.il/',
        badge: 'Featured',
    },
    {
        id: 'flittogo',
        title: 'FlirtToGo',
        description: 'Real-time location-based social platform. Built live map integration with continuous location updates, multi-profile switching, proximity-based user discovery, real-time chat system, and secure payment processing.',
        images: [
            '/assets/projects/FlirtToGo/01.PNG',
            '/assets/projects/FlirtToGo/02.PNG',
            '/assets/projects/FlirtToGo/03.PNG',
            '/assets/projects/FlirtToGo/04.PNG',
            '/assets/projects/FlirtToGo/05.PNG',
        ],
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.maahey.android.FlirtToGo',
        appStoreUrl: 'https://apps.apple.com/app/com.maahey.ios.FlirtToGo',
        liveLink: 'https://www.flirttogo.de/',
        badge: '',
    },
    {
        id: 'wellptthrives',
        title: 'WellPT Thrives',
        description: 'Safety-first digital health platform for adults 50+. Built progressive exercise programming with condition-specific tracks, functional test tracking with chart visualization, wearable integration for steps and sleep, micro-learning education system, weekly habit coaching, AI chatbot with evidence-based responses, capped community groups, and subscription gating with soft conversion prompts.',
        images: [
            '/assets/projects/WellPTThrives/01.PNG',
            '/assets/projects/WellPTThrives/02.PNG',
            '/assets/projects/WellPTThrives/03.PNG',
            '/assets/projects/WellPTThrives/04.PNG',
            '/assets/projects/WellPTThrives/05.PNG',
            '/assets/projects/WellPTThrives/06.PNG',
            '/assets/projects/WellPTThrives/07.PNG',
        ],
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.maahey.weiipt.weiipt_thrive',
        appStoreUrl: 'https://apps.apple.com/app/com.maahey.wellpt.wellptThrive',
        liveLink: 'https://wellpt.webviews.online/',
        badge: '',
    },
];

const Projects = React.forwardRef((_, ref) => {
    const [projects, setProjects] = useState([]);
    const visRef = useRef();
    const loadedOnce = useRef(false);

    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loadedOnce.current) {
                    loadedOnce.current = true;
                    setProjects(PROJECTS_DATA);
                }
            },
            { threshold: 0.1 }
        );
        if (visRef.current) io.observe(visRef.current);
        return () => io.disconnect();
    }, []);

    return (
        <section id="projects" ref={ref} className="projects-section">
            <div className="projects-wrapper" ref={visRef}>
                <h1 className="projects-title">Projects</h1>
                {projects.map((p) => <ProjectTile key={p.id} {...p} />)}
            </div>
        </section>
    );
});

const ProjectTile = ({ title, description, images, playStoreUrl, appStoreUrl, liveLink, badge }) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="project-tile">
            <div className="tile-content">
                <div className="tile-text">
                    <h3 className="tile-title">{title.toUpperCase()}</h3>
                    <p className="tile-desc">{description}</p>
                    <div className="store-links">
                        {playStoreUrl && (
                            <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="store-link play-store">
                                <FaGooglePlay className="store-icon" />
                                <span>Play Store</span>
                            </a>
                        )}
                        {appStoreUrl && (
                            <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="store-link app-store">
                                <FaApple className="store-icon" />
                                <span>App Store</span>
                            </a>
                        )}
                        {liveLink && (
                            <a href={liveLink} target="_blank" rel="noopener noreferrer" className="tile-link">
                                Live Project
                                <FiArrowUpRight className="tile-arrow" />
                            </a>
                        )}
                    </div>
                </div>
                <div className="tile-video">
                    <PhoneMockup images={images} currentImage={currentImage} badge={badge} />
                </div>
            </div>
        </div>
    );
};

const PhoneMockup = ({ images, currentImage, badge }) => (
    <div className="phone-mockup">
        {badge && <span className="project-badge">{badge}</span>}
        <div className="phone-notch" />
        <div className="phone-btn-mute" />
        <div className="phone-btn-vol-up" />
        <div className="phone-btn-vol-down" />
        <div className="phone-btn-power" />
        <div className="phone-screen">
            <ImageCarousel images={images} currentImage={currentImage} />
            <div className="phone-home-indicator" />
        </div>
    </div>
);

const ImageCarousel = ({ images, currentImage }) => (
    <div className="image-carousel-wrap">
        {images.map((img, idx) => (
            <img
                key={idx}
                src={img}
                alt={`Screenshot ${idx + 1}`}
                className={`carousel-image ${idx === currentImage ? 'active' : ''}`}
                loading="lazy"
            />
        ))}
    </div>
);

export default Projects;