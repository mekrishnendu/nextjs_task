'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="home-item-wrap grid grid-cols-3 gap-20">
      <div className="item-box grid grid-cols-1 gap-4" onClick={() => router.push('/about')}>
        <div className="flex justify-center">
          <Image src="../images/about.svg" alt="logo" width={78} height={78} />
        </div>
        <div>
          <h2>About</h2>
        </div>
      </div>

      <div className="item-box grid grid-cols-1 gap-4" onClick={() => router.push('/profile')}>
        <div className="flex justify-center">
          <Image src="../images/profile.svg" alt="logo" width={78} height={78} />
        </div>
        <div>
          <h2>Profile</h2>
        </div>
      </div>

      <div className="item-box grid grid-cols-1 gap-4" onClick={() => router.push('/members')}>
        <div className="flex justify-center">
          <Image src="../images/members.svg" alt="logo" width={78} height={78} />
        </div>
        <div>
          <h2>Members</h2>
        </div>
      </div>

      <div className="item-box grid grid-cols-1 gap-4" onClick={() => router.push('/tasks')}>
        <div className="flex justify-center">
          <Image src="../images/about.svg" alt="logo" width={78} height={78} />
        </div>
        <div>
          <h2>Task</h2>
        </div>
      </div>

      <div className="item-box grid grid-cols-1 gap-4">
        <div className="flex justify-center">
          <Image src="../images/profile.svg" alt="logo" width={78} height={78} />
        </div>
        <div>
          <h2>XXXXXX</h2>
        </div>
      </div>

      <div className="item-box grid grid-cols-1 gap-4">
        <div className="flex justify-center">
          <Image src="../images/profile.svg" alt="logo" width={78} height={78} />
        </div>
        <div>
          <h2>XXXXXX</h2>
        </div>
      </div>
    </div>
  );
}
