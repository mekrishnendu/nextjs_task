import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Login() {
  return (
    <main>
      Login
      <br />
      <Link href="/dashboard">Dasboard</Link>
      <br />
      <Link href="/about">about</Link>
    </main>
  );
}
