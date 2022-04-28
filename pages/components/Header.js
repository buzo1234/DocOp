import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Header({ reg }) {
  const [set, setSet] = useState(false);

  return (
    <div className='flex sticky top-0 bg-white z-20 shadow-md justify-between items-center pr-5'>
      <Link href='/'>
        <div className='flex mx-3 p-5 text-4xl cursor-pointer '>DocOp</div>
      </Link>
      {set ? (
        <button className='bg-bgg text-white text-xl py-1 h-fit px-2 rounded-lg font-semibold'>
          Logout
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default Header;
