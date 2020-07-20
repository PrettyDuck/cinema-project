import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className='flex items-center justify-between bg-green-500 p-5'>
      <div className='text-white'>
        <Link to='/' className='font-semibold text-xl tracking-tight'>
          Cinema Project
        </Link>
      </div>
      <div className='flex items-center justify-between w-2/12'>
        <div className='text-lg'>
          <Link to='/addActor' className='text-green-200 hover:text-white'>
            Add Actor
          </Link>
        </div>
        <div className='text-lg'>
          <Link to='/addFilm' className='text-green-200 hover:text-white'>
            Add Film
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Header;
