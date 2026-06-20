import React, { forwardRef } from 'react';
import '../skills/SkillsEducation.css';
import {
    FiCode, FiLayers, FiZap, FiServer, FiSettings, FiShoppingCart,
    FiUpload, FiDollarSign, FiMonitor, FiCpu, FiDatabase, FiCloud,
    FiTerminal, FiLayout, FiBox, FiRefreshCw, FiSearch, FiTool
} from 'react-icons/fi';
import {
    FaGraduationCap, FaAward, FaGlobe, FaMobileAlt, FaCodeBranch,
    FaFigma, FaPalette, FaRocket, FaFire
} from 'react-icons/fa';

const STATIC_DATA = {
    programingLanguage: [
        { id: 'dart', name: 'Dart', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', icon: <FiCode size={22} /> },
        { id: 'javascript', name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', icon: <FiCode size={22} /> },
        { id: 'java', name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', icon: <FiCode size={22} /> },
        { id: 'php', name: 'PHP', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', icon: <FiCode size={22} /> },
    ],
    frameworkLibraries: [
        { id: 'flutter', name: 'Flutter', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', icon: <FaMobileAlt size={22} /> },
        { id: 'bloc', name: 'BLoC', iconUrl: '', icon: <FiLayers size={22} /> },
        { id: 'riverpod', name: 'Riverpod', iconUrl: '', icon: <FiDatabase size={22} /> },
        { id: 'provider', name: 'Provider', iconUrl: '', icon: <FiBox size={22} /> },
        { id: 'getx', name: 'GetX', iconUrl: '', icon: <FiZap size={22} /> },
        { id: 'react', name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', icon: <FiCode size={22} /> },
        { id: 'laravel', name: 'Laravel', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', icon: <FiServer size={22} /> },
    ],
    toolsTechnologies: [
        { id: 'firebase', name: 'Firebase', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', icon: <FaFire size={22} /> },
        { id: 'supabase', name: 'Supabase', iconUrl: '', icon: <FiDatabase size={22} /> },
        { id: 'github-actions', name: 'GitHub Actions', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', icon: <FaCodeBranch size={22} /> },
        { id: 'codemagic', name: 'CodeMagic', iconUrl: '', icon: <FiRefreshCw size={22} /> },
        { id: 'git', name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', icon: <FaCodeBranch size={22} /> },
        { id: 'vscode', name: 'VS Code', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', icon: <FiTerminal size={22} /> },
        { id: 'android-studio', name: 'Android Studio', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg', icon: <FaMobileAlt size={22} /> },
        { id: 'xcode', name: 'Xcode', iconUrl: '', icon: <FiMonitor size={22} /> },
        { id: 'figma', name: 'Figma', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', icon: <FaFigma size={22} /> },
        { id: 'play-console', name: 'Google Play Console', iconUrl: '', icon: <FiShoppingCart size={22} /> },
        { id: 'app-store', name: 'App Store Connect', iconUrl: '', icon: <FiUpload size={22} /> },
        { id: 'admob', name: 'AdMob', iconUrl: '', icon: <FiDollarSign size={22} /> },
        { id: 'revenuecat', name: 'RevenueCat', iconUrl: '', icon: <FiDollarSign size={22} /> },
    ],
    skills: [
        { id: 'mobile-arch', name: 'Mobile Architecture', level: 0.95, icon: <FaMobileAlt size={18} /> },
        { id: 'state-mgmt', name: 'State Management', level: 0.95, icon: <FiLayers size={18} /> },
        { id: 'real-time', name: 'Real-time Systems', level: 0.9, icon: <FiRefreshCw size={18} /> },
        { id: 'firebase', name: 'Firebase Ecosystem', level: 0.9, icon: <FaFire size={18} /> },
        { id: 'ci-cd', name: 'CI/CD Pipelines', level: 0.85, icon: <FaCodeBranch size={18} /> },
        { id: 'api', name: 'RESTful API Integration', level: 0.9, icon: <FiServer size={18} /> },
        { id: 'performance', name: 'Performance Optimization', level: 0.85, icon: <FiZap size={18} /> },
        { id: 'testing', name: 'Testing (Unit/Widget/Integration)', level: 0.8, icon: <FiSettings size={18} /> },
        { id: 'deployment', name: 'Store Deployment', level: 0.9, icon: <FaRocket size={18} /> },
        { id: 'ui-ux', name: 'UI/UX Design (Figma)', level: 0.75, icon: <FaPalette size={18} /> },
        { id: 'ads', name: 'Ad Integration', level: 0.85, icon: <FiDollarSign size={18} /> },
        { id: 'rd', name: 'Research & Development', level: 0.5, icon: <FiSearch size={18} /> },
    ],
    educations: [
        { id: 'bs', fieldOfStudy: 'Bachelor of Software Engineering', school: 'Virtual University of Pakistan', startDate: '2019-01-01', endDate: '2023-12-01', icon: <FaGraduationCap size={20} /> },
        { id: 'fsc', fieldOfStudy: 'FSC Pre-Engineering', school: 'GIFT College Gujranwala', startDate: '2017-01-01', endDate: '2019-12-01', icon: <FaGraduationCap size={20} /> },
    ],
    certificates: [
        { id: 'android-cert', title: 'Certification in Android Development', issuingOrganization: 'AppTech Gujranwala', issuedDate: '2020-01-01', icon: <FaAward size={20} /> },
    ],
    languages: [
        { id: 'urdu', name: 'Urdu', level: 0.95, icon: <FaGlobe size={18} /> },
        { id: 'punjabi', name: 'Punjabi', level: 0.9, icon: <FaGlobe size={18} /> },
        { id: 'english', name: 'English', level: 0.85, icon: <FaGlobe size={18} /> },
        { id: 'hindi', name: 'Hindi', level: 0.75, icon: <FaGlobe size={18} /> },
    ],
};

const AnimatedProgress = ({ value }) => {
    const [width, setWidth] = React.useState(0);
    const ref = React.useRef();
    React.useEffect(() => {
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

const IconImage = ({ url, id, alt, className, fallbackIcon }) => {
    const [failed, setFailed] = React.useState(false);
    const handleError = () => setFailed(true);

    if (failed || !url) {
        return (
            <div className={`icon-fallback ${className || ''}`}>
                {fallbackIcon || <FiCpu size={22} />}
            </div>
        );
    }
    return <img src={url} alt={alt} onError={handleError} className={className} loading="lazy" />;
};

const SkillsEducation = forwardRef((_, ref) => {
    const data = STATIC_DATA;

    return (
        <section id="skills_education" ref={ref} className="skills-education">
            <div className="skills-education-wrapper">
                <h1 className="section-title">
                    <FiZap className="title-icon" size={28} />
                    Skills & Education
                </h1>

                <div className="section-block glass-card">
                    <div className="section-header">
                        <div className="header-icon-wrap"><FiCode size={18} /></div>
                        <h2>Programming Languages</h2>
                    </div>
                    <div className="p-lang-grid">
                        {data.programingLanguage.map((p) => (
                            <SkillRow icon={p.iconUrl} id={p.id} name={p.name} key={p.id} fallbackIcon={p.icon} />
                        ))}
                    </div>
                </div>

                <div className="section-block glass-card">
                    <div className="section-header">
                        <div className="header-icon-wrap"><FiLayers size={18} /></div>
                        <h2>Frameworks & Libraries</h2>
                    </div>
                    <Grid>
                        {data.frameworkLibraries.map((f) => (
                            <GridItem icon={f.iconUrl} id={f.id} name={f.name} key={f.id} fallbackIcon={f.icon} />
                        ))}
                    </Grid>
                </div>

                <div className="section-block glass-card">
                    <div className="section-header">
                        <div className="header-icon-wrap"><FiTool size={18} /></div>
                        <h2>Tools & Technologies</h2>
                    </div>
                    <Grid>
                        {data.toolsTechnologies.map((t) => (
                            <GridItem icon={t.iconUrl} id={t.id} name={t.name} key={t.id} fallbackIcon={t.icon} />
                        ))}
                    </Grid>
                </div>

                <div className="section-block glass-card">
                    <div className="section-header">
                        <div className="header-icon-wrap"><FiZap size={18} /></div>
                        <h2>Core Skills</h2>
                    </div>
                    <div className="skills-list">
                        {data.skills.map((s) => (
                            <SkillProgress key={s.id} name={s.name} level={s.level} icon={s.icon} />
                        ))}
                    </div>
                </div>

                <div className="section-block glass-card">
                    <div className="section-header">
                        <div className="header-icon-wrap"><FaGraduationCap size={18} /></div>
                        <h2>Education</h2>
                    </div>
                    <Timeline>
                        {data.educations.map((e) => (
                            <TimelineItem
                                key={e.id}
                                title={e.fieldOfStudy}
                                sub={e.school}
                                date={`${fmt(e.startDate)} - ${fmt(e.endDate)}`}
                                icon={e.icon}
                            />
                        ))}
                    </Timeline>
                </div>

                <div className="section-block glass-card">
                    <div className="section-header">
                        <div className="header-icon-wrap"><FaAward size={18} /></div>
                        <h2>Certificates</h2>
                    </div>
                    <Timeline>
                        {data.certificates.map((c) => (
                            <TimelineItem
                                key={c.id}
                                title={c.title}
                                sub={c.issuingOrganization}
                                date={fmt(c.issuedDate)}
                                icon={c.icon}
                            />
                        ))}
                    </Timeline>
                </div>

                <div className="section-block glass-card">
                    <div className="section-header">
                        <div className="header-icon-wrap"><FaGlobe size={18} /></div>
                        <h2>Languages</h2>
                    </div>
                    <div className="skills-list">
                        {data.languages.map((l) => (
                            <SkillProgress key={l.id} name={l.name} level={l.level} icon={l.icon} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

const Grid = ({ children }) => <div className="grid">{children}</div>;

const GridItem = ({ icon, id, name, fallbackIcon }) => (
    <div className="grid-item">
        <IconImage url={icon} id={id} alt={name} fallbackIcon={fallbackIcon} />
        <span>{name}</span>
    </div>
);

const SkillRow = ({ icon, id, name, fallbackIcon }) => (
    <div className="skill-row">
        <IconImage url={icon} id={id} alt={name} className="skill-icon" fallbackIcon={fallbackIcon} />
        <span>{name}</span>
    </div>
);

const SkillProgress = ({ name, level, icon }) => (
    <div className="skill-progress">
        <div className="skill-label">
            <span className="skill-icon-small">{icon}</span>
            <span>{name}</span>
        </div>
        <AnimatedProgress value={level} />
        <span className="skill-percent">{Math.round(level * 100)}%</span>
    </div>
);

const Timeline = ({ children }) => <div className="timeline">{children}</div>;
const TimelineItem = ({ title, sub, date, icon }) => (
    <div className="timeline-item">
        <div className="timeline-icon">{icon}</div>
        <div className="content">
            <div className="title-row">
                <h3>{title}</h3>
                <span className="date">{date}</span>
            </div>
            <p>{sub}</p>
        </div>
    </div>
);

const fmt = (str) =>
    new Date(str).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

export default SkillsEducation;