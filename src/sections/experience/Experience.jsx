import React, { useEffect, useRef, useState } from 'react';
import '../experience/experience.css';
import { FiBriefcase } from 'react-icons/fi';

const jobTypeName = (type) => {
    switch (type?.toLowerCase()) {
        case 'fulltime': case 'full_time': case 'full-time': return 'Full-time';
        case 'parttime': case 'part_time': case 'part-time': return 'Part-time';
        case 'contract': return 'Contract';
        case 'freelance': return 'Freelance';
        case 'internship': return 'Internship';
        default: return type;
    }
};

const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const EXPERIENCE_DATA = [
    {
        id: 1,
        position: 'Flutter Mobile Engineer',
        companyName: 'Maahey Technologies, Inc',
        companyLogo: '',
        linkedInUrl: '',
        jobType: 'full-time',
        startDate: '2025-08-01',
        endDate: null,
        isCurrent: true,
        description: 'Shipped UR\'CHOICE social platform with real-time chat, audio/video calling, live streaming, and geolocation. Live on the Google Play Store. End-to-end ownership. Built real-time messaging with Firebase Firestore, presence indicators, media sharing, and delivery receipts. Integrated Agora SDK for peer-to-peer and group calling with background handling and adaptive bitrate. Developed live-streaming monetization: superchat, virtual coin economy, audience gifting. Implemented Google Maps with live location, proximity-based discovery, and country filtering. Refactored legacy codebase, resolved production crashes/ANRs, and established code review.',
    },
    {
        id: 2,
        position: 'Flutter Mobile App Developer',
        companyName: 'Techticks',
        companyLogo: '',
        linkedInUrl: '',
        jobType: 'full-time',
        startDate: '2025-03-01',
        endDate: '2025-07-01',
        isCurrent: false,
        description: 'Delivered production Android/iOS apps for a multi-module travel booking platform, including flights, hotels, tours, and visas. Architected a flight booking engine with real-time search, fare comparison, multi-city routing, and seat selection. Built a hotel reservation system with availability calendars, map-based discovery, real-time inventory sync, and offline caching. Developed a visa module with multi-step forms, document upload/compression, OCR-ready handling, and progressive form. Designed an in-app admin dashboard for flight inventory, hotel partnerships, visa reviews, and booking analytics. Orchestrated 5+ third-party APIs, including aviation GDS, hotel aggregators, and visa services. Engineered BLoC pattern with dependency injection for scalable state management. Built production AAB/IPA releases. QA via Firebase App Distribution.',
    },
    {
        id: 3,
        position: 'Full Stack Mobile App Developer',
        companyName: 'Bytes Software House',
        companyLogo: '',
        linkedInUrl: '',
        jobType: 'full-time',
        startDate: '2023-04-01',
        endDate: '2024-12-01',
        isCurrent: false,
        description: 'Owned mobile development for 3 production apps in logistics and healthcare. Scalable state management and Firebase integrations serving thousands of active users. Designed Firebase backend architecture, Auth, Firestore schemas, Cloud Functions, and FCM push notifications. Real-time sync and offline resilience. Optimized performance via image compression, lazy loading, and DevTools profiling. Reduced bundle size and cold start latency. Established CI/CD pipeline with GitHub Actions and Codemagic. Automated build, test, and distribution cut release cycle time, eliminating manual errors. Conducted code reviews and mentored junior developers on Flutter best practices, state management, and automated testing.',
    },
    {
        id: 4,
        position: 'Flutter & Android Developer Intern',
        companyName: 'Abiding Tech',
        companyLogo: '',
        linkedInUrl: '',
        jobType: 'internship',
        startDate: '2022-07-01',
        endDate: '2022-08-01',
        isCurrent: false,
        description: 'Assisted in Android app development using Java and Android SDK. Worked on UI implementation, bug fixes, and performance improvements. Participated in code reviews and learned version control workflows with Git. Collaborated with senior developers on feature planning and sprint tasks in an agile environment. Gained hands-on experience with XML layouts, RecyclerViews, and API integration.',
    },
];

const Experience = React.forwardRef((_, ref) => {
    const [items, setItems] = useState([]);
    const visRef = useRef();
    const loadedOnce = useRef(false);

    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loadedOnce.current) {
                    loadedOnce.current = true;
                    setItems(EXPERIENCE_DATA);
                }
            },
            { threshold: 0.1 }
        );
        if (visRef.current) io.observe(visRef.current);
        return () => io.disconnect();
    }, []);

    return (
        <section id="experience" ref={ref} className="experience-section">
            <h1 className="experience-title">
                <FiBriefcase size={28} style={{ marginRight: '10px', color: 'var(--secondary)' }} />
                Work Experience
            </h1>
            <div className="experience-wrapper" ref={visRef}>
                {items.map((exp, i) => (
                    <Card
                        key={exp.id}
                        {...exp}
                        isFirst={i === 0}
                        isLast={i === items.length - 1}
                    />
                ))}
            </div>
        </section>
    );
});

const Card = ({ isFirst, isLast, ...exp }) => {
    const start = formatDate(exp.startDate);
    const end = exp.isCurrent ? 'Present' : formatDate(exp.endDate);

    return (
        <div className="timeline-card">
            <div className={`timeline-line ${isFirst ? 'is-first' : ''} ${isLast ? 'is-last' : ''}`} />
            <div className="timeline-content">
                <div className="row">
                    <span className="position">
                        {exp.position}
                        {exp.isCurrent && <span className="current-badge">Current</span>}
                    </span>
                    <span className="date">{start} - {end}</span>
                </div>

                <div className="company-row">
                    {exp.companyLogo ? (
                        <img src={exp.companyLogo} alt={exp.companyName} className="logo" />
                    ) : (
                        <div className="logo-placeholder">{exp.companyName?.charAt(0)}</div>
                    )}
                    <a href={exp.linkedInUrl || '#'} target="_blank" rel="noopener noreferrer" className="company">
                        {exp.companyName}
                    </a>
                    <span className="type">{jobTypeName(exp.jobType)}</span>
                </div>

                <p className="description">{exp.description}</p>
            </div>
        </div>
    );
};

export default Experience;