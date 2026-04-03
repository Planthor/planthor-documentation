import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Heading from '@theme/Heading';
const SITE_URL = 'https://planthor.github.io/planthor-documentation';
const PAGE_URL = `${SITE_URL}/goal-tracker`;
const goalTrackerJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Planthor Goal Tracker",
    "description": "Planthor is a free open-source goal tracker for athletes. Create running plans, track objectives, sync with Strava, and share progress with the D2D community.",
    "url": PAGE_URL,
    "isPartOf": {
        "@type": "WebSite",
        "name": "Planthor",
        "url": SITE_URL,
    },
    "about": {
        "@type": "SoftwareApplication",
        "name": "Planthor Goal Tracker",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    },
};
const features = [
    {
        title: '🎯 Set & Track Goals',
        description: 'Create structured running plans and objectives. Planthor helps you break big goals into trackable milestones so you always know where you stand.',
    },
    {
        title: '🏃 Sync Strava Activities',
        description: 'Link your Strava account to automatically sync sport activities into your Planthor goal tracker dashboard — no manual logging needed.',
    },
    {
        title: '📊 Visualize Progress',
        description: 'View your plan progress, completed activities, and remaining targets in a clean dashboard designed for athletes on the move.',
    },
    {
        title: '🤝 Share Achievements',
        description: 'Post progress to the D2D social feed and celebrate milestones with a community that shares your "keep moving forward" mindset.',
    },
    {
        title: '🔓 100% Open Source',
        description: 'Planthor is fully open-source. Inspect the code, contribute features, or self-host your own instance. No lock-in, no hidden fees.',
    },
    {
        title: '🌐 Community-First',
        description: 'Built for the Dragging to Dream (D2D) community. Every feature is designed around the collective journey of athletes helping each other grow.',
    },
];
export default function GoalTrackerPage() {
    return (<Layout title="Planthor Goal Tracker – Track Your Goals & Running Plans" description="Planthor is a free, open-source goal tracker for athletes. Track running plans, sync with Strava, and share achievements with the Dragging to Dream (D2D) community.">
      <Head>
        <link rel="canonical" href={PAGE_URL}/>
        <meta property="og:title" content="Planthor Goal Tracker – Track Your Goals & Running Plans"/>
        <meta property="og:description" content="Free open-source goal tracker for athletes. Create running plans, track objectives, sync Strava."/>
        <meta property="og:url" content={PAGE_URL}/>
        <meta property="og:image" content={`${SITE_URL}/img/planthor-logo.png`}/>
        <meta name="twitter:title" content="Planthor Goal Tracker – Track Your Goals & Running Plans"/>
        <meta name="twitter:description" content="Free open-source goal tracker for athletes. Create running plans, track objectives, sync Strava."/>
        <meta name="twitter:image" content={`${SITE_URL}/img/planthor-logo.png`}/>
        <script type="application/ld+json">{JSON.stringify(goalTrackerJsonLd)}</script>
      </Head>

      {/* Hero */}
      <header style={{
            background: 'var(--ifm-color-primary)',
            color: '#fff',
            padding: '4rem 0 3rem',
            textAlign: 'center',
        }}>
        <div className="container">
          <Heading as="h1" style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1rem' }}>
            Planthor Goal Tracker
          </Heading>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.9 }}>
            A free, open-source goal tracker built for athletes in the{' '}
            <strong>Dragging to Dream (D2D)</strong> community. Set objectives,
            track running plans, sync Strava, and share your progress.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="button button--secondary button--lg" to="/docs/">
              Read the Docs
            </Link>
            <Link className="button button--outline button--secondary button--lg" to="https://github.com/planthor">
              View on GitHub
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* What is Planthor Goal Tracker */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="row" style={{ alignItems: 'center' }}>
              <div className="col col--8 col--offset-2" style={{ textAlign: 'center' }}>
                <Heading as="h2">What is the Planthor Goal Tracker?</Heading>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--ifm-color-emphasis-700)' }}>
                  The <strong>Planthor goal tracker</strong> is the core of the Planthor application.
                  It gives athletes a structured way to define objectives — whether training for a
                  marathon, a 5K, or any personal milestone — and track real progress over time.
                  Integrated with Strava, Planthor automatically pulls in your sport activities so
                  your plan always reflects your actual effort.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--ifm-color-emphasis-700)' }}>
                  Unlike generic to-do apps, <strong>Planthor</strong> is purpose-built for the
                  athletic journey: every feature — from plan creation to social sharing — is
                  designed to keep you moving forward.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '3rem 0', background: 'var(--ifm-color-emphasis-100)' }}>
          <div className="container">
            <Heading as="h2" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              Goal Tracker Features
            </Heading>
            <div className="row">
              {features.map((feature, i) => (<div key={i} className="col col--4" style={{ marginBottom: '2rem' }}>
                  <div style={{
                background: 'var(--ifm-card-background-color)',
                borderRadius: 0,
                padding: '1.5rem',
                height: '100%',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
                    <p style={{ color: 'var(--ifm-color-emphasis-700)', fontSize: '0.95rem', margin: 0 }}>
                      {feature.description}
                    </p>
                  </div>
                </div>))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <Heading as="h2" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              How Planthor Goal Tracking Works
            </Heading>
            <div className="row">
              {[
            { step: '1', title: 'Create a Running Plan', desc: 'Define your goal — distance target, timeframe, or milestone. Planthor structures it into a trackable plan.' },
            { step: '2', title: 'Sync Your Activities', desc: 'Link Strava to automatically import sport sessions. Your progress updates in real-time.' },
            { step: '3', title: 'Track & Share Progress', desc: 'View your plan completion, share achievements to the D2D social feed, and stay accountable.' },
        ].map((item) => (<div key={item.step} className="col col--4" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: 0,
                background: 'var(--ifm-color-primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 700,
                margin: '0 auto 1rem',
            }}>
                    {item.step}
                  </div>
                  <h3>{item.title}</h3>
                  <p style={{ color: 'var(--ifm-color-emphasis-700)' }}>{item.desc}</p>
                </div>))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
            padding: '4rem 0',
            background: 'var(--ifm-color-primary)',
            color: '#fff',
            textAlign: 'center',
        }}>
          <div className="container">
            <Heading as="h2" style={{ color: '#fff', marginBottom: '1rem' }}>
              Start Tracking Your Goals with Planthor
            </Heading>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '550px', margin: '0 auto 2rem' }}>
              Read the full documentation, explore the architecture, or contribute to the
              open-source Planthor goal tracker today.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link className="button button--secondary button--lg" to="/docs/">
                Get Started
              </Link>
              <Link className="button button--outline button--secondary button--lg" to="/about">
                About Planthor
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>);
}
