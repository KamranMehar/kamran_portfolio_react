import React, { useEffect, useRef, useState } from 'react'
import AboutMe from './sections/about_me/AboutMe'
import Summary from './sections/summary/Summary'
import Experience from './sections/experience/Experience'
import Projects from './sections/projects/Projects'
import SkillsEducation from './sections//skills/SkillsEducation'
import BottomNav from './components/BottomNav'
import { BACKGROUND_IMAGES } from './constants/images'

const SECTIONS = ['about_me', 'summary', 'experience', 'projects', 'skills_education']

function getBgImage() {
  if (window.innerWidth <= 480) return BACKGROUND_IMAGES.MOBILE
  if (window.innerWidth <= 1023) return BACKGROUND_IMAGES.TABLET
  return BACKGROUND_IMAGES.DESKTOP
}

export default function App() {
  const [active, setActive] = useState(SECTIONS[0])
  const [bgImage, setBgImage] = useState(getBgImage())
  const [navVisible, setNavVisible] = useState(false);
  const refs = useRef({})

  // build refs on first render
  SECTIONS.forEach(id => {
    if (!refs.current[id]) refs.current[id] = React.createRef()
  })

  // Restore previous scroll spy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Find the entry with the largest intersection ratio
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      {
        threshold: 0.2, // 30% of section visible
        rootMargin: '0px 0px -20% 0px' // bottom margin triggers earlier
      }
    );
    SECTIONS.forEach(id => {
      const el = refs.current[id]?.current;
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [])

  useEffect(() => {
    const onResize = () => setBgImage(getBgImage())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setTimeout(() => setNavVisible(true), 100);
  }, [])

  const scrollTo = id => refs.current[id]?.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div style={{ minHeight: '100vh', color: '#fff' }}>
      {/* Background image layer */}
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100vh',
          zIndex: -2
        }}
      />

      {/* Blur overlay layer - sits above background but below content */}
      <div
        className={`blur-overlay${active !== 'about_me' ? ' show' : ''}`}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100vh',
          zIndex: -1,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          opacity: active !== 'about_me' ? 1 : 0,
          transition: 'opacity 400ms ease-in-out',
          pointerEvents: 'none'
        }}
      />

      <main>
        <section id="about_me" ref={refs.current.about_me}>
          <AboutMe />
        </section>
        <section id="summary" ref={refs.current.summary}>
          <Summary />
        </section>
        <section id="experience" ref={refs.current.experience}>
          <Experience />
        </section>
        <section id="projects" ref={refs.current.projects}>
          <Projects />
        </section>
        <section id="skills_education" ref={refs.current.skills_education}>
          <SkillsEducation />
        </section>
      </main>

      <BottomNav
        sections={SECTIONS}
        active={active}
        onClick={scrollTo}
        className={navVisible ? 'visible' : ''}
      />
    </div>
  );
}