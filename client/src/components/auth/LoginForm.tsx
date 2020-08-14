import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import showPassIcon from '../../res/show-pass-icon.svg';
import showHidePassword from '../utils/Show-HidePassword';
import FormAlert from '../layout/FormAlert';
import alertHandler from '../utils/AlertHandler';
import LOGIN_USER from '../../graphql/mutations/LoginUser';
import { setAccessToken } from '../../accessToken';
import GET_CURRENT_USER_QUERY from '../../graphql/queries/GetCurrentUser';

const LoginForm: React.FC = () => {
  const history = useHistory();
  const [login] = useMutation(LOGIN_USER);

  const [email, setEmail] = useState('');
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const [password, setPassword] = useState('');
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const [alertMessage, setAlertMessage] = useState('');
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (email === '' || password === '') {
        console.error('Please enter all fields');
        if (alertMessage === '') {
          alertHandler(setAlertMessage, 'Please enter all fields');
        }
      } else {
        const res = await login({
          variables: {
            email: email,
            password: password,
          },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }
            store.writeQuery({
              query: GET_CURRENT_USER_QUERY,
              data: {
                getCurrentUser: data.login.user,
              },
            });
          },
        });
        if (res.data) {
          setAccessToken(res.data.login.accessToken);
        }
        history.push('/');
      }
    } catch (error) {
      console.log();
      if (alertMessage === '') {
        alertHandler(setAlertMessage, 'Login Error. Check your e-mail address or password');
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div
        className='container flex flex-col justify-center items-center rounded-md w-2/6 mt-24'
        style={{ backgroundColor: '#333333' }}>
        <div className='text-white text-xl mt-6 mb-5'>Login</div>
        <form className='w-full flex flex-col' onSubmit={onSubmit}>
          <div className='mb-3 px-5'>
            <label htmlFor='email' className='uppercase text-white '>
              Email
            </label>
            <br />
            <input
              type='email'
              name='email'
              className='w-full h-12 px-4 text-lg border border-gray-500 rounded-md outline-none'
              placeholder='johndoe@gmail.com'
              maxLength={30}
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div className='mb-3 px-5 relative'>
            <label htmlFor='password' className='uppercase text-white '>
              Password
            </label>
            <br />
            <input
              type='password'
              name='password'
              className='w-full h-12 px-4 text-lg bg-customGray border border-gray-500 rounded-md outline-none'
              maxLength={30}
              value={password}
              onChange={onChangePassword}
            />
            <img
              src={showPassIcon}
              alt='show-password'
              className='absolute'
              onClick={showHidePassword}
              style={{ marginLeft: '450px', marginTop: '-30px' }}
            />
          </div>
          <input
            type='submit'
            value='Login'
            className='h-16 my-5 mx-6 text-xl text-white cursor-pointer border-none rounded py-2 px-6 outline-none bg-teal-700'
          />
        </form>
      </div>
      <FormAlert alertMessage={alertMessage} />
      <div
        className='container flex justify-center items-center rounded-md w-2/6 h-20  my-6'
        style={{ backgroundColor: '#333333' }}>
        <span className='text-white'>I have no account,</span>
        <Link to='/register' className=' cursor-pointer uppercase text-teal-500'>
          Register now
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
