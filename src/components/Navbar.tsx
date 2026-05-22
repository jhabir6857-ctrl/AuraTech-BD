"use client";
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const openCart = () => window.dispatchEvent(new Event('open-cart'));

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          AuraTech <span>BD</span>
        </Link>
        <div className={styles.links}>
          <Link href="#smartphones">Smartphones</Link>
          <Link href="#audio">Audio</Link>
          <Link href="#accessories">Accessories</Link>
        </div>
        <div className={styles.actions}>
          <ThemeToggle />
          <button className={styles.cartBtn} onClick={openCart}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className={styles.cartCount}>{totalItems}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
