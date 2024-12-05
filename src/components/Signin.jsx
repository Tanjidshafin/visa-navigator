import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.init';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const Signin = () => {
  const { isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const handleEmailSignIn = async (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.email.value;

    const password = form.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User  Info:', user);
      toast.success(`Welcome back ${user.displayName || email}`);
      const redirectPath = localStorage.getItem('redirectPath') || '/';
      localStorage.removeItem('redirectPath');
      navigate(redirectPath);
    } catch (error) {
      console.error('Sign In Error:', error.message);

      toast.warning(`Failed to sign in: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User  Info:', user);
      toast.success(`Welcome ${user.displayName}`);
      const redirectPath = localStorage.getItem('redirectPath') || '/';
      localStorage.removeItem('redirectPath');
      navigate(redirectPath);
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);

      toast.warning('Error signing in with Google: ' + error.message);
    }
  };

  return (
    <div className='mx-auto md:h-[40rem] overflow-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-lg'>
        <h1 className='text-center text-2xl font-bold text-indigo-600 sm:text-3xl'>Get started today</h1>
        <form className='mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8' onSubmit={handleEmailSignIn}>
          <p className='text-center text-lg font-medium'>Sign in to your account</p>
          <div>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>
            <input
              type='email'
              className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder='Enter email'
              name='email'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <input
              type='password'
              className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder='Enter password'
              name='password'
              required
            />
          </div>
          <button
            type='submit'
            className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white'>
            Sign in
          </button>
          <button
            type='button'
            onClick={handleGoogleSignIn}
            className='block w-full mt-4 rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white'>
            Sign in with Google
          </button>
          <div className='flex items-center justify-between'>
            <p className='text-center text-sm text-gray-500'>
              <NavLink className='underline'> Forget Password?</NavLink>
            </p>
            <p className='text-center text-sm text-gray-500'>
              No account?
              <NavLink to='/Signup' className='underline'>
                {' '}
                Sign up
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
