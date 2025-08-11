// src/sections/AboutMe.jsx
import React, { useEffect, useState } from 'react';
import './AboutMe.css';
import RippleCircle from './ripple_circle/RippleCircle.jsx';
import { db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";
import { MdEmail, MdCall, MdLocationOn } from 'react-icons/md';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const iconMap = {
    email: <MdEmail />,
    whatsapp: <FaWhatsapp />,
    linkedIn: <FaLinkedin />,
    location: <MdLocationOn />
};

const defaultData = {
    image_url: "",
    name: "",
    title: "",
    bio: "",
    summary: "",
    socialLinks: []
};

const AboutMe = React.forwardRef((_, ref) => {
    const [data, setData] = useState(defaultData);

    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, "portfolio_content", "about_me");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setData(docSnap.data());
            }
        }
        fetchData();
    }, []);

    return (
        <section id="about_me" ref={ref} className="about_section">
            <div className="chip_row">
                <RippleCircle />
                <span className="chip_text">Open to work</span>
            </div>
            <p className="title">{data.title ? data.title.toUpperCase() : ""}</p>
            <h1 className="name">{data.name ? data.name.toUpperCase() : ""}</h1>
            <div className="social_wrapper">
                <div className="social_grid">
                    {data.socialLinks?.map((link) => (
                        <a
                            key={link.id}
                            className="social_link"
                            href={link.url.startsWith("mailto:") ? link.url : (link.type === "email" ? `mailto:${link.url}` : link.url)}
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