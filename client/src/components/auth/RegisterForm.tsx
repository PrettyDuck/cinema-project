import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import showPassIcon from '../../res/show-pass-icon.svg';
import showHidePassword from '../utils/Show-HidePassword';
import FormAlert from '../layout/FormAlert';
import alertHandler from '../utils/AlertHandler';
import REGISTER_USER from '../../graphql/mutations/RegisterUser';

const RegisterForm: React.FC = () => {
  const history = useHistory();

  const [register] = useMutation(REGISTER_USER);

  const [name, setName] = useState('');
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const [email, setEmail] = useState('');
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const [password, setPassword] = useState('');
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const onChangePasswordRepeat = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordRepeat(e.target.value);

  const [alertMessage, setAlertMessage] = useState('');
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (name === '' || email === '' || password === '') {
        console.error('Please enter all fields');
        if (alertMessage === '') {
          alertHandler(setAlertMessage, 'Please enter all fields');
        }
      } else if (password !== passwordRepeat) {
        console.error('Passwords do not match');
        if (alertMessage === '') {
          alertHandler(setAlertMessage, 'Passwords do not match');
        }
      } else {
        const res = await register({
          variables: {
            name: name,
            email: email,
            password: password,
          },
        });
        console.log(res);
        history.push('/login');
      }
    } catch (error) {
      console.log(error);
      if (alertMessage === '') {
        alertHandler(setAlertMessage, 'Registration failed. Please try again');
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div
        className='container flex flex-col justify-center items-center rounded-md w-2/6 mt-24'
        style={{ backgroundColor: '#333333' }}>
        <div className='text-white text-xl mt-6 mb-5'>Register</div>
        <form className='w-full flex flex-col' onSubmit={onSubmit}>
          <div className='mb-3 px-5'>
            <label htmlFor='name' className='uppercase text-white '>
              Name
            </label>
            <br />
            <input
              type='text'
              name='name'
              className='w-full h-12 px-4 text-lg border border-gray-500 rounded-md outline-none'
              placeholder='John Doe'
              value={name}
              maxLength={30}
              onChange={onChangeName}
            />
          </div>
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
              value={email}
              maxLength={30}
              onChange={onChangeEmail}
            />
          </div>
          <div className='mb-3 px-5 relative'>
            <label htmlFor='password' className='uppercase text-white'>
              Password
            </label>
            <br />
            <input
              type='password'
              name='password'
              className='w-full h-12 px-4 text-lg bg-customGray border border-gray-500 rounded-md outline-none'
              value={password}
              maxLength={30}
              onChange={onChangePassword}
            />
            <img
              src={showPassIcon}
              alt='show-password'
              className='absolute'
              onClick={showHidePassword}
              style={{ left: 575, top: 40 }}
            />
          </div>
          <div className='mb-3 px-5 relative'>
            <label htmlFor='passwordRepeat' className='uppercase text-white'>
              Repeat Password
            </label>
            <br />
            <input
              type='password'
              name='passwordRepeat'
              className='w-full h-12 px-4 text-lg bg-customGray border border-gray-500 rounded-md outline-none'
              value={passwordRepeat}
              maxLength={30}
              onChange={onChangePasswordRepeat}
            />
            <img
              src={showPassIcon}
              alt='show-password'
              className='absolute'
              onClick={showHidePassword}
              style={{ left: 575, top: 40 }}
            />
          </div>
          <input
            type='submit'
            value='Register'
            className='h-16 my-5 mx-6 text-xl text-white cursor-pointer border-none rounded py-2 px-6 outline-none bg-teal-700'
          />
        </form>
      </div>
      <FormAlert alertMessage={alertMessage} />
      <div
        className='container flex justify-center items-center rounded-md w-2/6 h-20  my-6'
        style={{ backgroundColor: '#333333' }}>
        <span className='text-white'>I already have an account,</span>
        <Link to='/login' className=' cursor-pointer uppercase text-teal-500'>
          Log in
        </Link>
      </div>
    </div>
  );
};
export default RegisterForm;
