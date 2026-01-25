import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Brand Logo */}
        <div className={styles.brand}>
          <Link href="/" className={styles.brandLink}>
            <div className={styles.logoContainer}>
              <Image 
                src="/images/logo.png" 
                alt="Venuity Logo" 
                width={320} 
                height={80}
                className={styles.logo}
                priority
              />
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/venues" className={styles.navLink}>Venues</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className={styles.authButtons}>
          <Link href="/login" className={`${styles.authButton} ${styles.loginButton}`}>
            Log In
          </Link>
          <Link href="/signup" className={`${styles.authButton} ${styles.signupButton}`}>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;