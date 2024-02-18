import React from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function LoggedLayout({ children }) {
  return (
    <div className="loggedLauout">
      <main>
        <div className="outer grid">
          <Navigation />
          <div className="content-area bg-[#2B2929] text-stone-100 py-20 px-40">{children}</div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
