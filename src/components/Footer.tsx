import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandInfo}>
          <h2 className={styles.logo}>AuraTech <span>BD</span></h2>
          <p>Premium tech accessories delivered nationwide in Bangladesh.</p>
        </div>
        <div className={styles.trustBadges}>
          <p className={styles.secureText}>100% Secure Checkout</p>
          <div className={styles.badges}>
            <span className={styles.badge} style={{backgroundColor: '#e2136e', color: 'white'}}>bKash</span>
            <span className={styles.badge} style={{backgroundColor: '#f26822', color: 'white'}}>Nagad</span>
            <span className={styles.badge} style={{backgroundColor: '#1d1d1b', color: 'white'}}>SSLCommerz</span>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} AuraTech BD. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
