'use client';
import React, { useState, useEffect } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { useSession, getSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function LoggedLayout({ children }) {
  useEffect(() => {});
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return redirect('/');
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
