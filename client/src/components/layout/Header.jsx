import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='flex items-center justify-between flex-wrap bg-green-500 p-5'>
      <div className='text-white mr-6'>
        <Link to='/' className='font-semibold text-xl tracking-tight'>
          Cinema Project
        </Link>
      </div>
      <div className='text-lg'>
        <Link to='/search' className='mt-4 text-green-200 hover:text-white'>
          Search a movie
        </Link>
      </div>
    </nav>
  );
};
export default Header;
