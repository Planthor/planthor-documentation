import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
// Import the localized component from the same directory
import HomepageFeatures from './_HomepageFeatures';
import Heading from '@theme/Heading';

// Point to the original styles
import styles from '@site/src/pages/index.module.css';

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
              BẮT ĐẦU
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              to="https://github.com/planthor">
              XEM GITHUB
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
            <Heading as="h2">Hành trình D2D</Heading>
            <p>
              Planthor được xây dựng để hỗ trợ cộng đồng <strong>"Dragging to Dream" (D2D)</strong>. 
              Chúng tôi tin tưởng vào sự kiên trì cấp độ công nghiệp và sự chính xác trong thể thao. 
              Cho dù quý vị đang theo dõi một kế hoạch chạy marathon hay lần chạy 5K đầu tiên, Planthor cung cấp 
              nền tảng cấu trúc cho sự tiến bộ của quý vị.
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
                <h3>Tham gia Phong trào</h3>
                <p>
                  Kết nối tài khoản Strava, thiết lập mục tiêu và chia sẻ 
                  thành tựu của quý vị với một cộng đồng không bao giờ từ bỏ.
                </p>
                <Link
                  className="button button--primary button--block"
                  to="/docs/use-case">
                  TÌM HIỂU THÊM
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
      title={`Chào mừng đến với ${siteConfig.title}`}
      description="Planthor là một ứng dụng theo dõi mục tiêu/định hướng nguồn mở.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <CommunitySection />
      </main>
    </Layout>
  );
}
