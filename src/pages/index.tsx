import React, {useEffect} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import '../css/landing.css';

const SITE_URL = 'https://planthor.github.io/planthor-documentation';

export default function Home(): React.JSX.Element {
  useEffect(() => {
    // Basic Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.lp-observe').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <Head>
        <title>Planthor – Dragging to Dream</title>
        <meta name="description" content="Industrial-grade goal tracker for athletes who refuse to quit. Built for the persistence of the D2D community." />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:title" content="Planthor – Dragging to Dream" />
        <meta property="og:description" content="Industrial-grade goal tracker for athletes who refuse to quit. Built for the persistence of the D2D community." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/img/planthor-logo.png`} />
      </Head>

      {/* Navigation */}
      <nav className="lp-nav">
        <div className="lp-nav-container">
          <Link to="/" className="lp-logo">
            <img src={useBaseUrl('img/planthor-logo.png')} alt="Logo" />
            PLANTHOR
          </Link>
          <div className="lp-nav-links">
            <Link to="/docs/" className="lp-nav-link">Documentation</Link>
            <Link to="/about" className="lp-nav-link">About</Link>
            <Link to="https://github.com/planthor" className="lp-nav-link">GitHub</Link>
            <Link to="/docs/" className="lp-cta-button">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="lp-hero">
        <div className="lp-hero-content lp-observe">
          <h1 className="lp-hero-title">
            DRAGGING<br />TO DREAM
          </h1>
          <p className="lp-hero-subtitle">
            The industrial-grade goal tracker for athletes who refuse to quit. 
            Built for the persistence of the D2D community.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/docs/" className="lp-cta-button" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>
              Launch App
            </Link>
            <Link to="/docs/" className="lp-nav-link" style={{ alignSelf: 'center', opacity: 1, borderBottom: '2px solid' }}>
              Read the Docs →
            </Link>          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-observe" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em' }}>
              Core Objectives
            </h2>
            <p style={{ fontSize: '1.5rem', opacity: 0.6 }}>Engineered for athletic growth and community persistence.</p>
          </div>
          
          <div className="lp-grid">
            <div className="lp-card lp-observe">
              <h3 className="lp-card-title">Precision Tracking</h3>
              <p className="lp-card-text">
                Manage running plans with industrial precision. Every session counts towards your ultimate objective.
              </p>
            </div>
            <div className="lp-card lp-observe">
              <h3 className="lp-card-title">Seamless Sync</h3>
              <p className="lp-card-text">
                Automatically sync your athletic progress from Strava to maintain a single source of truth for your goals.
              </p>
            </div>
            <div className="lp-card lp-observe">
              <h3 className="lp-card-title">Social Feed</h3>
              <p className="lp-card-text">
                Connect with the D2D community. Share achievements and foster a collective mentality of progress.
              </p>
            </div>
            <div className="lp-card lp-observe">
              <h3 className="lp-card-title">Open Framework</h3>
              <p className="lp-card-text">
                Built on efficient tech-stacks. Transparent, open-source, and ready for your contributions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="lp-community">
        <div className="lp-observe">
          <h2 className="lp-community-title">The D2D Journey</h2>
          <p className="lp-community-text">
            Planthor is more than a tool; it's a structural foundation for the "Dragging to Dream" community. 
            We prioritize efficiency, practical solutions, and industrial-standard best practices.
          </p>
          <Link to="/docs/use-case" className="lp-cta-button" style={{ backgroundColor: 'white', color: 'var(--lp-navy)', padding: '1.5rem 4rem' }}>
            Explore Use Cases
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-footer-container lp-observe">
          <div className="lp-footer-col">
            <Link to="/" className="lp-footer-logo">PLANTHOR</Link>
            <p style={{ marginTop: '1rem', opacity: 0.5, fontWeight: 600 }}>© 2026 Planthor Project.</p>
          </div>
          <div className="lp-footer-links">
            <div className="lp-footer-col">
              <h4>Documentation</h4>
              <Link to="/docs/" className="lp-footer-link">Getting Started</Link>
              <Link to="/docs/api-specs" className="lp-footer-link">API Specs</Link>
              <Link to="/docs/roadmap" className="lp-footer-link">Roadmap</Link>
            </div>
            <div className="lp-footer-col">
              <h4>Community</h4>
              <Link to="https://github.com/planthor" className="lp-footer-link">GitHub</Link>
              <Link to="/about" className="lp-footer-link">About Us</Link>
              <Link to="/goal-tracker" className="lp-footer-link">Goal Tracker</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
