import React, { useEffect, useState, useRef } from 'react';
import './experience.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const jobTypeName = (type) => {
    switch (type?.toLowerCase()) {
        case 'fulltime':
        case 'full_time':
        case 'full-time':
            return 'Full-time';
        case 'parttime':
        case 'part_time':
        case 'part-time':
            return 'Part-time';
        case 'contract':
            return 'Contract';
        case 'freelance':
            return 'Freelance';
        case 'internship':
            return 'Internship';
        default:
            return type;
    }
};

const formatDate = (d) =>
    d
        ? new Date(d.toDate ? d.toDate() : d).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        })
        : '';

const Experience = React.forwardRef((_, ref) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const visRef = useRef();
    const loadedOnce = useRef(false);

    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loadedOnce.current) {
                    loadedOnce.current = true;
                    fetchData();
                }
            },
            { threshold: 0.1 }
        );
        if (visRef.current) io.observe(visRef.current);
        return () => io.disconnect();
    }, []);

    const fetchData = async () => {
        try {
            const snap = await getDoc(doc(db, 'portfolio_content', 'work_experiences'));
            const arr = snap.data()?.data || [];
            setItems(arr.map((exp, idx) => ({ id: idx, ...exp })));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="experience" ref={ref} className="experience-section">
            <h1 className="experience-title">Work Experience</h1>
            <div className="experience-wrapper" ref={visRef}>
                {loading
                    ? Array.from({ length: 3 }).map((_, i) => <Card key={i} skeleton />)
                    : items.map((exp, i) => (
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

const Card = ({ skeleton, ...exp }) => {
    const start = formatDate(exp.startDate);
    const end = exp.isCurrent ? 'Present' : formatDate(exp.endDate);

    if (skeleton)
        return (
            <div className="timeline-card">
                <div className="timeline-line" />
                <div className="timeline-content">
                    <div className="row">
                        <Skeleton
                            width="40%"
                            baseColor="rgba(255, 255, 255, 0.12)"
                            highlightColor="rgba(121, 121, 121, 0.3)"
                            className="sk-position"
                        />
                        <Skeleton
                            width="20%"
                            baseColor="rgba(255, 255, 255, 0.12)"
                            highlightColor="rgba(121, 121, 121, 0.3)"
                            className="sk-date"
                        />
                    </div>

                    <div className="company-row">
                        <Skeleton
                            circle
                            width={30}
                            height={30}
                            baseColor="rgba(255, 255, 255, 0.12)"
                            highlightColor="rgba(121, 121, 121, 0.3)"
                            className="logo"
                        />
                        <Skeleton
                            width={160}
                            baseColor="rgba(255, 255, 255, 0.12)"
                            highlightColor="rgba(121, 121, 121, 0.3)"
                            className="sk-company"
                        />
                        <Skeleton
                            width={80}
                            baseColor="rgba(255, 255, 255, 0.12)"
                            highlightColor="rgba(121, 121, 121, 0.3)"
                            className="type"
                        />
                    </div>

                    <Skeleton
                        count={3}
                        baseColor="rgba(255, 255, 255, 0.12)"
                        highlightColor="rgba(121, 121, 121, 0.3)"
                        className="sk-desc"
                    />
                </div>
            </div>
        );

    return (
        <div className="timeline-card">
            <div className="timeline-line" />
            <div className="timeline-content">
                <div className="row">
                    <span className="position">{exp.position}</span>
                    <span className="date">
                        {start} - {end}
                    </span>
                </div>

                <div className="company-row">
                    <img src={exp.companyLogo} alt={exp.companyName} className="logo" />
                    <a href={exp.linkedInUrl} target="_blank" rel="noopener noreferrer" className="company">
                        {exp.companyName}
                    </a>
                    <span className="type">• {jobTypeName(exp.jobType)}</span>
                </div>

                <p className="description">{exp.description}</p>
            </div>
        </div>
    );
};

export default Experience;
