import React, { useEffect, useState, useRef } from 'react';
import './projects.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FiArrowUpRight, FiPlay } from 'react-icons/fi';
import { supabase } from '../../supabase';

const Projects = React.forwardRef((_, ref) => {
    const [projects, setProjects] = useState([]);
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
        const snap = await getDoc(doc(db, 'portfolio_content', 'projects'));
        const arr = snap.data()?.data || [];
        const enriched = arr.map(p => ({
            ...p,
            videoUrl: `${supabase.supabaseUrl}/storage/v1/object/public/projects/${p.id}`
        }));

        setProjects(enriched);
        setLoading(false);
    };

    return (
        <section id="projects" ref={ref} className="projects-section">
            <div className="projects-wrapper" ref={visRef}>
                <h1 className="projects-title">Projects</h1>

                {loading
                    ? Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
                    : projects.map((p) => <ProjectTile key={p.id} {...p} />)}
            </div>
        </section>
    );
});

const ProjectTile = ({ title, description, videoUrl, liveLink }) => {
    return (
        <div className="project-tile">
            <div className="tile-content">
                <div className="tile-text">
                    <h3 className="tile-title">{title.toUpperCase()}</h3>
                    <p className="tile-desc">{description}</p>

                    {liveLink && (
                        <a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tile-link"
                        >
                            Live Project
                            <FiArrowUpRight className="tile-arrow" />
                        </a>
                    )}
                </div>

                <div className="tile-video">
                    <VideoPlayer src={videoUrl} />
                </div>
            </div>
        </div>
    );
};

const VideoPlayer = ({ src }) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(true);

    const toggle = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
            v.play();
            setPlaying(true);
        } else {
            v.pause();
            setPlaying(false);
        }
    };

    useEffect(() => {
        const v = videoRef.current;
        if (v) {
            v.muted = true;
            v.loop = true;
            v.play().catch(() => { });
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                v?.play();
                setPlaying(true);
            } else {
                v?.pause();
                setPlaying(false);
            }
        }, { threshold: 0.1 });

        if (v) observer.observe(v);
        return () => observer.disconnect();
    }, [src]);

    return (
        <div className="video-wrap" onClick={toggle}>
            <video ref={videoRef} src={src} playsInline />
            {!playing && (
                <div className="video-overlay">
                    <FiPlay className="play-icon" />
                </div>
            )}
        </div>
    );
};

const SkeletonCard = () => (
    <div className="project-tile">
        <div className="tile-content">
            <div className="tile-text">
                <Skeleton
                    width="70%"
                    height={36}
                    style={{ marginBottom: 8 }}
                    baseColor="rgba(255,255,255,0.12)"
                    highlightColor="rgba(121,121,121,0.3)"
                />
                <Skeleton
                    count={3}
                    style={{ marginBottom: 12 }}
                    baseColor="rgba(255,255,255,0.12)"
                    highlightColor="rgba(121,121,121,0.3)"
                />
                <Skeleton
                    width={120}
                    height={22}
                    baseColor="rgba(255,255,255,0.12)"
                    highlightColor="rgba(121,121,121,0.3)"
                />
            </div>

            <div className="tile-video">
                <Skeleton
                    width="100%"
                    height="70vh"
                    baseColor="rgba(255,255,255,0.12)"
                    highlightColor="rgba(121,121,121,0.3)"
                />
            </div>
        </div>
    </div>
);

export default Projects;
