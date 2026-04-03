import clsx from 'clsx';
import Heading from '@theme/Heading';
// We need to point back to the original styles if we want to reuse them
import styles from '@site/src/components/HomepageFeatures/styles.module.css';
const FeatureList = [
    {
        title: 'Efficient Tech-Stacks',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (<>
        Planthor sử dụng các **Efficient Tech-Stacks** cho các giải pháp, tuân thủ các
        **Industrial Best-Practices** để đảm bảo hiệu suất và khả năng mở rộng.
      </>),
    },
    {
        title: 'Open-Source Framework',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (<>
        Là một **Open-Source Framework**, Planthor khuyến khích mọi người đóng góp
        và cùng nhau phát triển như một cộng đồng.
      </>),
    },
    {
        title: 'Keep Moving Forward',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (<>
        Được xây dựng để hỗ trợ cộng đồng "Dragging to Dream", Planthor thúc đẩy
        tinh thần tiến bộ liên tục và chia sẻ thành tựu.
      </>),
    },
];
function Feature({ title, Svg, description }) {
    return (<div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img"/>
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>);
}
export default function HomepageFeatures() {
    return (<section className={styles.features}>
      <div className="container">
        <div className="text--center padding-bottom--lg">
          <Heading as="h2" className={styles.sectionTitle}>Xây dựng cho sự Kiên trì</Heading>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (<Feature key={idx} {...props}/>))}
        </div>
      </div>
    </section>);
}
