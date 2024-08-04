import Head from 'next/head';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div>
      <Head>
        <title>About - The Crypto Lab</title>
        <meta name="description" content="About CoinChain, built by Sumeet Sonawane for The Selection Lab" />
      </Head>

      <header className='hero-header'>
        <h1>About The Crypto Lab</h1>
      </header>

      <main className={styles.container}>
<section className={styles.introduction}>
          <h2>Project Overview</h2>
          <p>
            The Crypto Lab is a cryptocurrency tracking platform built by Sumeet Sonawane as an assignment for The Selection Lab.
            The project demonstrates the application of modern web development practices and technologies.
          </p>
          <p>
            This project integrates various APIs and libraries to deliver a robust user experience with real-time data and
            interactive features.
          </p>
          <p>
            P.S. If you reject my application, I might have to update this About page to "The Rejection Lab!" 😉
          </p>
        </section>

        <section className={styles.details}>
          <h2>Complex Issues Addressed</h2>
          <ul className={styles.ulClass}>
            <li className={styles.liClass}>Implementation of a real-time data caching mechanism to optimize performance.</li>
            <li className={styles.liClass}>Dynamic fetching of news and cryptocurrency data with error handling.</li>
            <li className={styles.liClass}>Integration of a parallax scrolling effect for enhanced visual appeal.</li>
            <li className={styles.liClass}>Creation of a responsive layout with slider components for displaying news.</li>
          </ul>
        </section>

        <section className={styles.techStack}>
          <h2>Technologies and APIs Used</h2>
          <ul className={styles.ulClass}>
            <li className={styles.liClass}><strong>React.js:</strong> Front-end library for building user interfaces.</li>
            <li className={styles.liClass}><strong>Next.js:</strong> Framework for server-side rendering and static site generation.</li>
            <li className={styles.liClass}><strong>axios:</strong> Promise-based HTTP client for making API requests.</li>
            <li className={styles.liClass}><strong>React Slick:</strong> Carousel library for displaying news in a slider.</li>
            <li className={styles.liClass}><strong>NewsAPI:</strong> Free API for fetching news articles about cryptocurrencies.</li>
            <li className={styles.liClass}><strong>CoinGecko API:</strong> Free API for fetching cryptocurrency data.</li>
            <li className={styles.liClass}><strong>CSS Modules:</strong> Scoped CSS to avoid style conflicts.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default About;
