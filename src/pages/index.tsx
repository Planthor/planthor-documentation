import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroContent}>
          <img
            src={useBaseUrl('img/planthor-logo.png')}
            alt="Planthor Logo"
            className={styles.heroLogo}
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

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Planthor is an open-source goal/objectives tracking application.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <CommunitySection />
      </main>
    </Layout>
  );
}

