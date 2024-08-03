import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">The Crypto Lab</Link>
      </div>
      <ul className={styles.navLinks}>
        <li className={router.pathname === '/' ? styles.active : ''}>
          <Link href="/">Home</Link>
        </li>
        <li className={router.pathname === '/about' ? styles.active : ''}>
          <Link href="/about">About</Link>
        </li>
        <li className={router.pathname === '/news' ? styles.active : ''}>
          <Link href="/news">News</Link>
        </li>
        <li className={router.pathname === '/exchanges' ? styles.active : ''}>
          <Link href="/exchanges">Exchanges</Link>
        </li>
        <li className={router.pathname === '/crypto' ? styles.active : ''}>
          <Link href="/crypto">List of Cryptos</Link>
        </li>
      </ul>
    </nav>
  );
}
