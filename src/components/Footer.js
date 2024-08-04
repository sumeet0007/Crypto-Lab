import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>About The Crypto Lab</h3>
          <p>
            The Crypto Lab is a cryptocurrency tracking platform built by Sumeet Sonawane as an assignment for The Selection Lab.
          </p>
        </div>
        <div className={styles.footerSection}>
          <h3>Contact</h3>
          <p>Email: sumeetsonawane997@gmail.com</p>
          <p>Phone: +91 8291151735</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <ul className={styles.socialLinks}>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://linkedin.com/in/sumeetsonawane-connect" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/sumeet0007" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} The Crypto Lab. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
