import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const SITE_URL = 'https://planthor.github.io/planthor-documentation';

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Planthor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Planthor is an open-source goal and objectives tracking application designed for the Dragging to Dream (D2D) community. It helps athletes track running plans, share achievements, and stay motivated."
      }
    },
    {
      "@type": "Question",
      "name": "Is Planthor free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Planthor is completely free and open-source. You can contribute to the project on GitHub."
      }
    },
    {
      "@type": "Question",
      "name": "How do I track goals with Planthor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Planthor allows you to create and manage running plans, track progress, sync activities from Strava, and share your achievements with the D2D community."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Dragging to Dream (D2D) community?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The D2D community is a group of athletes who believe in persistence and continuous improvement. Planthor was built specifically to support their goal tracking journey."
      }
    }
  ]
};

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroContent}>
          <img
            src={useBaseUrl('img/planthor-logo.png')}
            alt="Planthor Goal Tracker Logo"
            className={styles.heroLogo}
            width="120"
            height="120"
          />
          <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
            {siteConfig.title}
          </Heading>
          <p className={clsx('hero__subtitle', styles.heroSubtitle)}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/">
              GET STARTED
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              to="https://github.com/planthor">
              VIEW GITHUB
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function CommunitySection() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <Heading as="h2">The D2D Journey</Heading>
            <p>
              Planthor is built to support the <strong>"Dragging to Dream" (D2D)</strong> community.
              We believe in industrial-grade persistence and athletic precision.
              Whether you are tracking a marathon plan or your first 5K, Planthor provides
              the structural foundation for your progress.
            </p>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Open Source</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>ATHLETIC</span>
                <span className={styles.statLabel}>Precision</span>
              </div>
            </div>
          </div>
          <div className="col col--6">
             <div className={styles.communityBox}>
                <h3>Join the Movement</h3>
                <p>
                  Connect your Strava account, set your objectives, and share your
                  achievements with a community that refuses to quit.
                </p>
                <Link
                  className="button button--primary button--block"
                  to="/docs/use-case">
                  LEARN MORE
                </Link>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section style={{ padding: '3rem 0', background: 'var(--ifm-color-emphasis-100)' }}>
      <div className="container">
        <Heading as="h2" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Frequently Asked Questions
        </Heading>
        <div className="row">
          {faqJsonLd.mainEntity.map((faq, i) => (
            <div key={i} className="col col--6" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{faq.name}</h3>
              <p style={{ color: 'var(--ifm-color-emphasis-700)', fontSize: '0.95rem' }}>
                {faq.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link className="button button--secondary" to="/goal-tracker">
            Learn about the Planthor Goal Tracker →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Planthor – Goal Tracker for the D2D Community"
      description="Planthor is a free, open-source goal tracker. Track running plans, sync Strava activities, and share achievements with the Dragging to Dream (D2D) community.">
      <Head>
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:title" content="Planthor – Goal Tracker for the D2D Community" />
        <meta property="og:description" content="Planthor is a free, open-source goal tracker. Track running plans, sync Strava activities, and share achievements with the D2D community." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/img/planthor-logo.png`} />
        <meta name="twitter:title" content="Planthor – Goal Tracker for the D2D Community" />
        <meta name="twitter:description" content="Free open-source goal tracker for athletes. Track plans, sync Strava, share achievements." />
        <meta name="twitter:image" content={`${SITE_URL}/img/planthor-logo.png`} />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <CommunitySection />
        <FaqSection />
      </main>
    </Layout>
  );
}

