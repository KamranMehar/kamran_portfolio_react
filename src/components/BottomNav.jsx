import React from 'react'
import { BsPerson, BsCardText, BsBriefcase, BsCollection, BsMortarboard } from 'react-icons/bs'

const SECTIONS = [
    { id: 'about_me', icon: BsPerson, label: 'Home' },
    { id: 'summary', icon: BsCardText, label: 'Summary' },
    { id: 'experience', icon: BsBriefcase, label: 'Experience' },
    { id: 'projects', icon: BsCollection, label: 'Projects' },
    { id: 'skills_education', icon: BsMortarboard, label: 'Skills' }, // <-- FIXED HERE
]

export default function BottomNav({ active, onClick, className = '' }) {
    return (
        <nav className={`bottom-nav ${className}`}>
            {SECTIONS.map(({ id, icon: Icon, label }) => {
                const isCurrent = id === active
                return (
                    <button
                        key={id}
                        onClick={() => onClick(id)}
                        className={`nav-item ${isCurrent ? 'active' : ''}`}
                        aria-label={label}
                    >
                        <div className="nav-content">
                            <Icon size={20} />
                            <span className="nav-label">{label}</span>
                        </div>
                    </button>
                )
            })}
        </nav>
    )
}