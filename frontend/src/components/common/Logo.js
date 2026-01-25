import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ className = '', withTagline = true }) => {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <div className="flex items-center">
        <Image
          src="/images/logo.png"
          alt="Venuity Logo"
          width={withTagline ? 325 : 175}
          height={withTagline ? 85 : 45}
          className="h-auto"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;