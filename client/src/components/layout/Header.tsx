import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import GET_CURRENT_USER_QUERY from '../../graphql/queries/GetCurrentUser';
import LOGOUT_USER from '../../graphql/mutations/LogoutUser';
import { setAccessToken } from '../../accessToken';

const Header: React.FC = () => {
  const { data } = useQuery(GET_CURRENT_USER_QUERY);
  const [logout, { client }] = useMutation(LOGOUT_USER);

  const history = useHistory();
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push('/addFilm', { filmId: 0 });
  };

  const LogoutHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await logout();
    setAccessToken('');
    await client.resetStore();
  };
  return (
    <nav className='flex items-center justify-between bg-teal-700 p-5'>
      <div className='text-white'>
        <Link to='/' className='font-semibold text-xl tracking-tight'>
          Cinema Project
        </Link>
      </div>
      <div className='flex items-center justify-between w-1/4'>
        <div className='text-lg'>
          {data && data.getCurrentUser ? (
            <span className=' text-white hover:text-teal-300'> Hi, {data.getCurrentUser.name}</span>
          ) : (
            null
          )}
        </div>

        {data && data.getCurrentUser && data.getCurrentUser.role === 'ADMIN_ROLE' ? (
          <>
            <div className='text-lg'>
              <Link to='/addActor' className=' text-white hover:text-teal-300'>
                Add Actor
              </Link>
            </div>
            <div className='text-lg'>
              <button
                className='focus:outline-none text-white hover:text-teal-300'
                onClick={clickHandler}>
                Add Film
              </button>
            </div>
          </>
        ) : null}
        <div className='text-lg'>
          {data && data.getCurrentUser ? (
            <button
              className='focus:outline-none font-semibold text-xl tracking-tight text-white hover:text-teal-300'
              onClick={LogoutHandler}>
              Logout
            </button>
          ) : (
            <Link
              to='/login'
              className='font-semibold text-xl tracking-tight text-white hover:text-teal-300'>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
