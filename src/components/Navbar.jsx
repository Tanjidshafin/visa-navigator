import React, { useContext, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { NavLink } from 'react-router';
import { AppContext } from '../../context/AppContext';
import { auth } from '../firebase.init';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const ThemeChanger = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  const [isActive, setIsActive] = useState('home');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const [toggle, setToggle] = useState('');
  const handleLogout = async () => {
    try {
      toast.success('User Signed Out Successfully');
      await signOut(auth);
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className='flex mx-auto  max-w-screen-2xl items-center justify-between w-full relative bg-transparent boxShadow rounded-full px-[10px] py-[10px] md:py-[20px]'>
      <div className='flex items-center text-transparent text-xl bg-gradient-to-r bg-clip-text from-blue-600 to-blue-400 md:text-2xl font-semibold'>
        <img
          src='https://static.vecteezy.com/system/resources/previews/029/928/227/non_2x/clipboard-with-visa-application-travel-approval-immigration-visa-stock-illustration-vector.jpg'
          alt='logo'
          className='w-[60px] '
        />{' '}
        Visa Stars
      </div>
      <ul className='items-center gap-[20px] text-[1rem] text-[#424242] lg:flex hidden'>
        <NavLink
          onClick={() => (isActive === 'home' ? setIsActive('home') : setIsActive('home'))}
          to='/'
          className={`before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] pl-2 transition-all duration-300 before:left-0 cursor-pointer ${
            isActive === 'home' ? 'before:w-full text-[#3B9DF8]' : ''
          } capitalize`}>
          Home
        </NavLink>
        <NavLink
          onClick={() => (isActive === 'allvisa' ? setIsActive('allvisa') : setIsActive('allvisa'))}
          to='/allVisa'
          className={`before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] pl-2 transition-all duration-300 before:left-0 cursor-pointer ${
            isActive === 'allvisa' ? 'before:w-full text-[#3B9DF8]' : ''
          } capitalize`}>
          All Visas
        </NavLink>
        <NavLink
          onClick={() => (isActive === 'addvisa' ? setIsActive('addvisa') : setIsActive('addvisa'))}
          to='/AddVisa'
          className={`before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] pl-2 transition-all duration-300 before:left-0 cursor-pointer ${
            isActive === 'addvisa' ? 'before:w-full text-[#3B9DF8]' : ''
          } capitalize`}>
          Add Visa
        </NavLink>
        <NavLink
          onClick={() => (isActive === 'myaddedvisa' ? setIsActive('myaddedvisa') : setIsActive('myaddedvisa'))}
          to='/MyAddedVisa'
          className={`before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] pl-2 transition-all duration-300 before:left-0 cursor-pointer ${
            isActive === 'myaddedvisa' ? 'before:w-full text-[#3B9DF8]' : ''
          } capitalize`}>
          My Added Visas
        </NavLink>
        <NavLink
          onClick={() =>
            isActive === 'myvisaApplication' ? setIsActive('myvisaApplication') : setIsActive('myvisaApplication')
          }
          to='/myVisaApplication'
          className={`before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] pl-2 transition-all duration-300 before:left-0 cursor-pointer ${
            isActive === 'myvisaApplication' ? 'before:w-full text-[#3B9DF8]' : ''
          } capitalize`}>
          My Visa applications
        </NavLink>
      </ul>

      <div className='items-center gap-[10px] flex'>
        <label className='flex cursor-pointer gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <circle cx='12' cy='12' r='5' />
            <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
          </svg>
          <input onClick={ThemeChanger} type='checkbox' value='synthwave' className='toggle theme-controller' />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
          </svg>
        </label>
        {user ? (
          <div className=' md:relative hidden md:block'>
            <button
              onClick={() => (toggle !== 'active' ? setToggle('active') : setToggle(''))}
              type='button'
              className='overflow-hidden rounded-full border border-gray-300 shadow-inner'
              data-tooltip-id='user-tooltip'
              data-tooltip-content={user.displayName}>
              <span className='sr-only'>Toggle dashboard menu</span>

              <img
                src={
                  user.photoURL ||
                  'https://lh3.googleusercontent.com/proxy/2Utr68FLTC9Y-8gh8ia0CDdozsGNCinXx5N4Mci0r2N9GRiiuZ_1PCNySHWfBFLc6qn7ySugpPdH_VZ6zR53Ve2UCJpzjXZZzAOJsPovRpYZtwv89t0mY6rcnZvs96Q1MrfRDcQ'
                }
                alt=''
                className='size-10 object-cover'
              />
            </button>
            <Tooltip id='user-tooltip' place='left' />
            <div
              className={`absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ${
                toggle === 'active' ? 'block' : 'hidden'
              }`}
              role='menu'>
              <div className='p-2'>
                <a
                  className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  role='menuitem'>
                  My profile
                </a>

                <a
                  className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  role='menuitem'>
                  Billing summary
                </a>

                <a
                  className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  role='menuitem'>
                  Team settings
                </a>
              </div>

              <div className='p-2'>
                <button
                  onClick={handleLogout}
                  type='submit'
                  className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                  role='menuitem'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-4'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3' />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex gap-3'>
            <NavLink
              to='/signup'
              className='py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300 sm:flex hidden'>
              Register
            </NavLink>
            <NavLink
              to='/signin'
              className='py-[7px]  justify-center w-[6rem] text-[1rem] px-[16px] rounded-full capitalize bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300 sm:flex hidden'>
              Login
            </NavLink>
          </div>
        )}
      </div>

      <div className='dropdown md:hidden block dropdown-end'>
        <div tabIndex={0} role='button' className='m-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25' />
          </svg>
        </div>
        <ul tabIndex={0} className='dropdown-content menu gap-5 bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
          <NavLink to='/' className=' hover:text-[#3B9DF8] pl-2 transition-all duration-500 cursor-poin ter capitalize'>
            Home
          </NavLink>
          <NavLink
            to='/allVisa'
            className='hover:text-[#3B9DF8] pl-2 transition-all duration-500 cursor-poin ter capitalize'>
            All Visas
          </NavLink>
          <NavLink
            to='/addVisa'
            className='hover:text-[#3B9DF8] pl-2 transition-all duration-500 cursor-poin ter capitalize'>
            Add Visa
          </NavLink>
          <NavLink
            to='/MyAddedVisa'
            className='hover:text-[#3B9DF8] pl-2 transition-all duration-500 cursor-poin ter capitalize'>
            My Added Visa
          </NavLink>
          <NavLink
            to='/myVisaApplication'
            className='hover:text-[#3B9DF8] pl-2 transition-all duration-500 cursor-poin ter capitalize'>
            My Visa Applications
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
