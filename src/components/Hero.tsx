import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>New Arrival</span>
          <h1 className={styles.title}>AuraPods Pro</h1>
          <p className={styles.description}>
            Experience pure fidelity with active noise cancellation and spatial audio. The ultimate listening experience, now available in Bangladesh.
          </p>
          <div className={styles.cta}>
            <button className={styles.primaryBtn}>Buy Now</button>
            <Link href="#specs" className={styles.secondaryLink}>Learn more &rarr;</Link>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.productMockup}>
             <span style={{fontSize: '5rem'}}>🎧</span>
          </div>
        </div>
      </div>
    </section>
  );
}
