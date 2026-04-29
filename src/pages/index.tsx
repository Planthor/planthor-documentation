import React, {useEffect} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useColorMode} from '@docusaurus/theme-common';
import SearchBar from '@theme/SearchBar';
import Layout from '@theme/Layout';
import '../css/landing.css';

const SITE_URL = 'https://planthor.github.io/planthor-documentation';

/**
 * Build the URL for the given locale, preserving the current page path.
 * Mirrors the logic Docusaurus uses internally in useAlternatePageUtils.
 */
function buildLocaleUrl(
  currentPathname: string,
  targetLocale: string,
  defaultLocale: string,
  baseUrl: string,
  allLocales: readonly string[],
): string {
  // Strip any existing locale prefix from the pathname.
  // e.g. /planthor-documentation/vi/docs/intro -> /docs/intro
  let pathWithoutLocale = currentPathname;
  for (const locale of allLocales) {
    if (locale === defaultLocale) continue;
    const localePrefix = `${baseUrl}${locale}/`;
    if (currentPathname.startsWith(localePrefix)) {
      pathWithoutLocale = `${baseUrl}${currentPathname.slice(localePrefix.length)}`;
      break;
    }
    // Also handle without trailing slash (e.g. /planthor-documentation/vi)
    const localePrefixNoSlash = `${baseUrl}${locale}`;
    if (currentPathname === localePrefixNoSlash || currentPathname === localePrefixNoSlash + '/') {
      pathWithoutLocale = baseUrl;
      break;
    }
  }

  // Build target URL
  if (targetLocale === defaultLocale) {
    return pathWithoutLocale || baseUrl;
  }
  // Ensure baseUrl ends with /
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const pathSuffix = pathWithoutLocale.startsWith(base)
    ? pathWithoutLocale.slice(base.length)
    : '';
  return `${base}${targetLocale}/${pathSuffix}`;
}

// Locale switcher link — renders as <a> for alternate locales, <span> for the active one
function LocaleLink({
  locale,
  isCurrentLocale,
  defaultLocale,
  baseUrl,
  allLocales,
}: {
  locale: string;
  isCurrentLocale: boolean;
  defaultLocale: string;
  baseUrl: string;
  allLocales: readonly string[];
}) {
  if (isCurrentLocale) {
    return (
      <span
        className="lp-locale-link active"
        aria-current="true"
        style={{cursor: 'default', pointerEvents: 'none'}}
      >
        {locale.toUpperCase()}
      </span>
    );
  }

  // Build href on the client; fall back to root locale path for SSR
  const href =
    typeof window !== 'undefined'
      ? buildLocaleUrl(window.location.pathname, locale, defaultLocale, baseUrl, allLocales)
      : locale === defaultLocale
        ? baseUrl
        : `${baseUrl}${locale}/`;

  return (
    <a
      href={href}
      className="lp-locale-link"
      hrefLang={locale}
      rel="alternate"
    >
      {locale.toUpperCase()}
    </a>
  );
}


function LandingPageContent() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const {colorMode, setColorMode} = useColorMode();

  useEffect(() => {
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
      {/* Navigation */}
      <nav className="lp-nav">
        <div className="lp-nav-container">
          <Link to="/" className="lp-logo">
            <img src={useBaseUrl('img/planthor-logo.png')} alt="Logo" />
            PLANTHOR
          </Link>
          <div className="lp-nav-links">
            <Link to="/docs/" className="lp-nav-link">
              <Translate id="nav.documentation">Documentation</Translate>
            </Link>
            <Link to="/about" className="lp-nav-link">
              <Translate id="nav.about">About</Translate>
            </Link>
            <Link to="https://github.com/planthor" className="lp-nav-link">
              <Translate id="nav.github">GitHub</Translate>
            </Link>
            
            <div className="lp-nav-controls">
              <SearchBar />
              <button
                className="lp-theme-toggle"
                onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
                title={colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {colorMode === 'dark' ? '☀️' : '🌙'}
              </button>
              <div className="lp-locale-switcher">
                {i18n.locales.map((locale) => {
                  const isCurrentLocale = i18n.currentLocale === locale;
                  return (
                    <LocaleLink
                      key={locale}
                      locale={locale}
                      isCurrentLocale={isCurrentLocale}
                      defaultLocale={i18n.defaultLocale}
                      baseUrl={siteConfig.baseUrl}
                      allLocales={i18n.locales}
                    />
                  );
                })}
              </div>
            </div>

            <Link to="/docs/" className="lp-cta-button">
              <Translate id="nav.getStarted">Get Started</Translate>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="lp-hero">
        <div className="lp-hero-content lp-observe">
          <h1 className="lp-hero-title">
            <Translate id="homepage.hero.title">DRAGGING TO DREAM</Translate>
          </h1>
          <p className="lp-hero-subtitle">
            <Translate id="homepage.hero.subtitle">
              The industrial-grade goal tracker for athletes who refuse to quit. 
              Built for the persistence of the D2D community.
            </Translate>
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/docs/" className="lp-cta-button" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>
              <Translate id="homepage.hero.launchApp">Launch App</Translate>
            </Link>
            <Link to="/docs/" className="lp-nav-link" style={{ alignSelf: 'center', opacity: 1, borderBottom: '2px solid' }}>
              <Translate id="homepage.hero.readDocs">Read the Docs →</Translate>
            </Link>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-observe" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em' }}>
              <Translate id="homepage.features.title">Core Objectives</Translate>
            </h2>
            <p style={{ fontSize: '1.5rem', opacity: 0.6 }}>
              <Translate id="homepage.features.subtitle">Engineered for athletic growth and community persistence.</Translate>
            </p>
          </div>
          
          <div className="lp-grid">
            <div className="lp-card lp-observe">
              <h3 className="lp-card-title">
                <Translate id="homepage.features.goal1.title">Precision Tracking</Translate>
              </h3>
              <p className="lp-card-text">
                <Translate id="homepage.features.goal1.description">
                  Manage running plans with industrial precision. Every session counts towards your ultimate objective.
                </Translate>
              </p>
            </div>
            <div className="lp-card lp-observe">
              <h3 className="lp-card-title">
                <Translate id="homepage.features.goal2.title">Seamless Sync</Translate>
              </h3>
              <p className="lp-card-text">
                <Translate id="homepage.features.goal2.description">
                  Automatically sync your athletic progress from Strava to maintain a single source of truth for your goals.
                </Translate>
              </p>
            </div>
            <div className="lp-card lp-observe">
              <h3 className="lp-card-title">
                <Translate id="homepage.features.goal3.title">Social Feed</Translate>
              </h3>
              <p className="lp-card-text">
                <Translate id="homepage.features.goal3.description">
                  Connect with the D2D community. Share achievements and foster a collective mentality of progress.
                </Translate>
              </p>
            </div>
            <div className="lp-card lp-observe">
              <h3 className="lp-card-title">
                <Translate id="homepage.features.goal4.title">Open Framework</Translate>
              </h3>
              <p className="lp-card-text">
                <Translate id="homepage.features.goal4.description">
                  Built on efficient tech-stacks. Transparent, open-source, and ready for your contributions.
                </Translate>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="lp-community">
        <div className="lp-observe">
          <h2 className="lp-community-title">
            <Translate id="homepage.community.title">The D2D Journey</Translate>
          </h2>
          <p className="lp-community-text">
            <Translate id="homepage.community.text">
              Planthor is more than a tool; it's a structural foundation for the "Dragging to Dream" community. 
              We prioritize efficiency, practical solutions, and industrial-standard best practices.
            </Translate>
          </p>
          <Link to="/docs/use-case" className="lp-cta-button" style={{ backgroundColor: 'white', color: 'var(--lp-navy)', padding: '1.5rem 4rem' }}>
            <Translate id="homepage.community.cta">Explore Use Cases</Translate>
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
              <h4><Translate id="footer.documentation">Documentation</Translate></h4>
              <Link to="/docs/" className="lp-footer-link">
                <Translate id="footer.getStarted">Getting Started</Translate>
              </Link>
              <Link to="/docs/api-specs" className="lp-footer-link">
                <Translate id="footer.apiSpecs">API Specs</Translate>
              </Link>
              <Link to="/docs/roadmap" className="lp-footer-link">
                <Translate id="footer.roadmap">Roadmap</Translate>
              </Link>
            </div>
            <div className="lp-footer-col">
              <h4><Translate id="footer.community">Community</Translate></h4>
              <Link to="https://github.com/planthor" className="lp-footer-link">GitHub</Link>
              <Link to="/about" className="lp-footer-link">
                <Translate id="footer.about">About Us</Translate>
              </Link>
              <Link to="/goal-tracker" className="lp-footer-link">
                <Translate id="footer.goalTracker">Goal Tracker</Translate>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      noFooter
      wrapperClassName="custom-landing-page"
      title={translate({message: 'Planthor – Dragging to Dream', id: 'homepage.title'})}
      description={translate({message: 'Industrial-grade goal tracker for athletes who refuse to quit. Built for the persistence of the D2D community.', id: 'homepage.description'})}>
      <LandingPageContent />
    </Layout>
  );
}
