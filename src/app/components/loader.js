import React from 'react';
import Image from 'next/image';

export default function Loader() {
  return (
    <div>
      <Image src="/images/gear.gif" alt="loading" width={50} height={50} />
    </div>
  );
}
