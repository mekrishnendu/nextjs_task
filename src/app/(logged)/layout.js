import React from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function LoggedLayout({ children }) {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }

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
