// src/sections/Summary.jsx
import React from 'react'

const Summary = React.forwardRef((_, ref) => (
    <section id="summary" ref={ref} className="section">
        <h1>Summary</h1>
        <p>I’m Kamran — mobile-turned-web dev.</p>
    </section>
))
export default Summary