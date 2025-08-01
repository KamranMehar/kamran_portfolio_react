// src/sections/AboutMe.jsx
import React from 'react'

const AboutMe = React.forwardRef((_, ref) => (
    <section id="about_me" ref={ref} className="section">
        <h1>👋 About Me</h1>
        <p>I’m Kamran — mobile-turned-web dev.</p>
    </section>
))
export default AboutMe