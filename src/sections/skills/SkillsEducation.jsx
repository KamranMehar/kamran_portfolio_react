/* SkillsEducation.jsx */
import React, { forwardRef, useEffect, useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './SkillsEducation.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

/* ---- Supabase public bucket base ---- */
const SUPABASE_ICON_URL =
    'https://waezyuycuuwepssofegp.supabase.co/storage/v1/object/public/skills-icons';

/* ---- Firestore fetch ---- */
const fetchData = async () => {
    const snap = await getDoc(doc(db, 'portfolio_content', 'skills_education'));
    if (!snap.exists()) throw new Error('No data');

    const d = snap.data();
    return {
        programingLanguage: d.programing_language ?? [],
        frameworkLibraries: d.framworks_liberaries ?? [],
        toolsTechnologies: d.tools_technologies ?? [],
        skills: d.skills ?? [],
        educations: d.education ?? [],
        certificates: d.certificates ?? [],
        languages: d.languages ?? [],
    };
};

/* ---- animated progress ---- */
const AnimatedProgress = ({ value }) => {
    const [width, setWidth] = useState(0);
    const ref = useRef();
    useEffect(() => {
        const io = new IntersectionObserver(
            ([e]) => e.isIntersecting && setWidth(value),
            { threshold: 0.4 }
        );
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, [value]);
    return (
        <div className="progress-bar" ref={ref}>
            <div style={{ width: `${width * 100}%` }} />
        </div>
    );
};


const IconImage = ({ url, id, alt, className }) => {
    // Start with provided URL if any; otherwise go straight to Supabase guess
    const initial = url && url.trim().length > 0 ? url : `${SUPABASE_ICON_URL}/${id}.png`;
    const [src, setSrc] = useState(initial);
    const [triedSupabase, setTriedSupabase] = useState(
        initial.startsWith(SUPABASE_ICON_URL)
    );
    const [failed, setFailed] = useState(false);

    const handleError = () => {
        if (!triedSupabase) {
            setTriedSupabase(true);
            setSrc(`${SUPABASE_ICON_URL}/${id}`);
        } else {
            setFailed(true);
        }
    };

    if (failed) {
        return <span className={`text-icon ${className || ''}`}>{'</>'}</span>;
    }
    return <img src={src} alt={alt} onError={handleError} className={className} />;
};

/* ---- main component ---- */
const SkillsEducation = forwardRef((_, ref) => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: {},
    });

    useEffect(() => {
        fetchData()
            .then((data) => setState({ loading: false, data }))
            .catch((err) => setState({ loading: false, error: err.message }));
    }, []);

    const { loading, error, data } = state;

    return (
        <section id="skills_education" ref={ref} className="skills-education">
            <div className="skills-education-wrapper">
                <h1 className="section-title">Skills & Education</h1>

                {error && <p className="error">{error}</p>}

                {/* Programming Languages */}
                {data.programingLanguage?.length > 0 && (
                    <div className="section-block">
                        <div className="section-header">
                            <span className="dot" />
                            <h2>Programming Languages</h2>
                        </div>
                        <div className="p-lang-grid">
                            {loading
                                ? Array(4)
                                    .fill(0)
                                    .map((_, i) => <SkeletonCard key={i} />)
                                : data.programingLanguage.map((p) => (
                                    <SkillRow icon={p.iconUrl} id={p.id} name={p.name} key={p.id} />
                                ))}
                        </div>
                    </div>
                )}

                {/* Frameworks & Libraries */}
                {data.frameworkLibraries?.length > 0 && (
                    <div className="section-block">
                        <div className="section-header">
                            <span className="dot" />
                            <h2>Frameworks & Libraries</h2>
                        </div>
                        <Grid>
                            {loading
                                ? Array(5)
                                    .fill(0)
                                    .map((_, i) => <SkeletonCard key={i} />)
                                : data.frameworkLibraries.map((f) => (
                                    <GridItem icon={f.iconUrl} id={f.id} name={f.name} key={f.id} />
                                ))}
                        </Grid>
                    </div>
                )}

                {/* Tools & Technologies */}
                {data.toolsTechnologies?.length > 0 && (
                    <div className="section-block">
                        <div className="section-header">
                            <span className="dot" />
                            <h2>Tools & Technologies</h2>
                        </div>
                        <Grid>
                            {loading
                                ? Array(5)
                                    .fill(0)
                                    .map((_, i) => <SkeletonCard key={i} />)
                                : data.toolsTechnologies.map((t) => (
                                    <GridItem icon={t.iconUrl} id={t.id} name={t.name} key={t.id} />
                                ))}
                        </Grid>
                    </div>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <div className="section-block">
                        <div className="section-header">
                            <span className="dot" />
                            <h2>Skills</h2>
                        </div>
                        <div className="skills-list">
                            {loading
                                ? Array(3)
                                    .fill(0)
                                    .map((_, i) => <SkeletonSkill key={i} />)
                                : data.skills.map((s) => (
                                    <SkillProgress key={s.id} name={s.name} level={s.level} />
                                ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {data.educations?.length > 0 && (
                    <div className="section-block">
                        <div className="section-header">
                            <span className="dot" />
                            <h2>Education</h2>
                        </div>
                        <Timeline>
                            {loading
                                ? Array(2)
                                    .fill(0)
                                    .map((_, i) => <SkeletonTimeline key={i} />)
                                : data.educations.map((e) => (
                                    <TimelineItem
                                        key={e.id}
                                        title={e.fieldOfStudy}
                                        sub={e.school}
                                        date={`${fmt(e.startDate)} - ${e.endDate ? fmt(e.endDate) : 'Present'
                                            }`}
                                    />
                                ))}
                        </Timeline>
                    </div>
                )}

                {/* Certificates */}
                {data.certificates?.length > 0 && (
                    <div className="section-block">
                        <div className="section-header">
                            <span className="dot" />
                            <h2>Certificates</h2>
                        </div>
                        <Timeline>
                            {loading
                                ? Array(2)
                                    .fill(0)
                                    .map((_, i) => <SkeletonTimeline key={i} />)
                                : data.certificates.map((c) => (
                                    <TimelineItem
                                        key={c.id}
                                        title={c.title}
                                        sub={c.issuingOrganization}
                                        date={fmt(c.issuedDate)}
                                    />
                                ))}
                        </Timeline>
                    </div>
                )}

                {/* Languages */}
                {data.languages?.length > 0 && (
                    <div className="section-block">
                        <div className="section-header">
                            <span className="dot" />
                            <h2>Languages</h2>
                        </div>
                        <div className="skills-list">
                            {loading
                                ? Array(3)
                                    .fill(0)
                                    .map((_, i) => <SkeletonSkill key={i} />)
                                : data.languages.map((l) => (
                                    <SkillProgress key={l.id} name={l.name} level={l.level} />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
});

/* ---- small UI parts ---- */
const Grid = ({ children }) => <div className="grid">{children}</div>;

const GridItem = ({ icon, id, name }) => (
    <div className="grid-item">
        <IconImage url={icon} id={id} alt={name} />
        <span>{name}</span>
    </div>
);

const SkillRow = ({ icon, id, name }) => (
    <div className="skill-row">
        <IconImage url={icon} id={id} alt={name} className="skill-icon" />
        <span>{name}</span>
    </div>
);

const SkillProgress = ({ name, level }) => (
    <div className="skill-progress">
        <span>{name}</span>
        <AnimatedProgress value={level} />
    </div>
);

const Timeline = ({ children }) => <div className="timeline">{children}</div>;
const TimelineItem = ({ title, sub, date }) => (
    <div className="timeline-item">
        <div className="line" />
        <div className="content">
            <div className="title-row">
                <h3>{title}</h3>
                <span className="date">{date}</span>
            </div>
            <p>{sub}</p>
        </div>
    </div>
);

/* ---- skeletons ---- */
const SkeletonCard = () => (
    <div className="grid-item skeleton">
        <Skeleton circle height={50} width={50} />
        <Skeleton width={60} />
    </div>
);
const SkeletonSkill = () => (
    <div className="skill-progress skeleton">
        <Skeleton width={100} />
        <Skeleton height={5} style={{ width: '100%' }} />
    </div>
);
const SkeletonTimeline = () => (
    <div className="timeline-item skeleton">
        <Skeleton width={200} height={20} />
        <Skeleton width={120} height={15} />
    </div>
);

/* ---- helper ---- */
const fmt = (str) =>
    new Date(str).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

export default SkillsEducation;
