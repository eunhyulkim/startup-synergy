import { useState, useEffect } from 'react';
import { Countdown } from '../components/conference/Countdown';
import { Introduction } from '../components/conference/Introduction';
import { Timetable } from '../components/conference/Timetable';
import { Speakers } from '../components/conference/Speakers';
import { FAQ } from '../components/conference/FAQ';
import '../styles/Conference.css';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'timetable', label: 'Timetable' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'faq', label: 'FAQ' },
];

export function Conference() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 60;
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="conf-page">
      {/* Navigation */}
      <nav className="conf-nav" role="navigation" aria-label="섹션 네비게이션">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`conf-nav-link ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Hero */}
      <section className="conf-hero">
        <h1 className="conf-hero-title">Strength</h1>
        <p className="conf-hero-subtitle">Weaving Session</p>
        <p className="conf-hero-date">2026년 2월 11일(수) 14:00</p>
        <Countdown />
      </section>

      {/* About */}
      <Introduction />

      {/* Timetable */}
      <Timetable />

      {/* Speakers */}
      <Speakers />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <footer className="conf-footer">
        <p className="conf-footer-text">
          Strength Weaving Session | CliftonStrengths 기반
        </p>
      </footer>
    </div>
  );
}
