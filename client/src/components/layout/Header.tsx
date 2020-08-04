import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Header: React.FC = () => {
  const history = useHistory();
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push('/addFilm', { filmId: 0 });
  };
  return (
    <nav className='flex items-center justify-between bg-teal-700 p-5'>
      <div className='text-white'>
        <Link to='/' className='font-semibold text-xl tracking-tight'>
          Cinema Project
        </Link>
      </div>
      <div className='flex items-center justify-between w-2/12'>
        <div className='text-lg'>
          <Link to='/addActor' className=' text-white hover:text-teal-300'>
            Add Actor
          </Link>
        </div>
        <div className='text-lg'>
          <button
            className='focus:outline-none  text-white hover:text-teal-300'
            onClick={clickHandler}>
            Add Film
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Header;
