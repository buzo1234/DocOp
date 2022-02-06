import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className='flex sticky top-0 bg-white z-20 shadow-md '>
      <Link href='/'>
        <div className='flex mx-3 p-5 text-4xl cursor-pointer '>DocOp</div>
      </Link>
    </div>
  );
}

export default Header;
