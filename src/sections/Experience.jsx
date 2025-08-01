// src/sections/AboutMe.jsx
import React from 'react'

const Experience = React.forwardRef((_, ref) => (
    <section id="experience" ref={ref} className="section">
        <h1>Experience</h1>
        <p>I’m Kamran — mobile-turned-web dev.</p>
    </section>
))
export default Experience