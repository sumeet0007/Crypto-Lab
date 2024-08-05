import Head from 'next/head';
import { useState } from 'react';
import News from '../components/News';
import TrendingCrypto from '../components/TrendingCrypto';
import TrendingNfts from '../components/TrendingNfts';
import Confetti from 'react-confetti';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

export default function Home() {
  const [email, setEmail] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show confetti
    setShowConfetti(true);

    // Clear the email field
    setEmail('');

    // Hide confetti after a few seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 10000); // Duration of the confetti effect
  };

  return (
    <div>
      <Head>
        <title>Crypto Tracker</title>
        <meta name="description" content="Live cryptocurrency price tracker" />
      </Head>

      <header className="hero-header">
        <h1>Live Cryptocurrency Price Tracker</h1>
      </header>

      <main>
        <News />
        <TrendingCrypto />
        <TrendingNfts />
        <header style={{ marginTop: '40px' }} className="hero-header">
          <section>
            <h2>Subscribe to Our Newsletter</h2>
            <p>Please don't submit There might be an easter egg </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
              />
              <button type="submit">Subscribe</button>
            </form>

            {/* Confetti Effect */}
            {showConfetti && <Confetti style={canvasStyles} />}

            {/* Optional additional message */}
            {showConfetti && (
              <div className='confettiMessage'>
                <h2 style={{fontSize:"15px"}}>🎉 You Found an Easter Egg! 🎉</h2>
              </div>
            )}
          </section>
        </header>
      </main>

      <style>{`
        .confettiMessage {
          text-align: center;
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
