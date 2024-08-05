// src/components/Layout.js

import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <style>{`
        main {
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
