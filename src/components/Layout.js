// src/components/Layout.js

import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <style jsx>{`
        main {
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
