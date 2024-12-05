import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, provider } from '../firebase.init';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    return hasUpperCase && hasLowerCase && isValidLength;
  };

  const handleEmailSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.first_name.value;
    const lastName = form.last_name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageUrl = form.image_url.value;
    navigate('/signin');
    if (!validatePassword(password)) {
      toast.warning(
        'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.'
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: imageUrl,
      });
      console.log(user);
      toast.success(`Welcome ${user.displayName || email}`);

      navigate('/');
    } catch (error) {
      console.error(error.message);
      toast.warning('Failed to sign up');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate('/');
      console.log('User  Info:', user);
      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <div className='flex md:h-[40rem] overflow-auto justify-center'>
      <div className='max-w-md space-y-6 rounded-lg border bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900'>
        <div className='flex flex-col space-y-1'>
          <h3 className='text-3xl font-bold tracking-tight'>Sign Up</h3>
          <p className='text-sm text-zinc-500 dark:text-zinc-400'>Please fill in the form to create an account.</p>
        </div>

        <div>
          <form className='space-y-6' onSubmit={handleEmailSignUp}>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2 text-sm'>
                <label
                  className='text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300'
                  htmlFor='first_name'>
                  First Name
                </label>
                <input
                  className='flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700'
                  id='first_name'
                  placeholder='Enter first name'
                  name='first_name'
                  type='text'
                  required
                />
              </div>
              <div className='space-y-2 text-sm'>
                <label
                  className='text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300'
                  htmlFor='last_name'>
                  Last Name
                </label>
                <input
                  className='flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700'
                  id='last_name'
                  placeholder='Enter last name'
                  name='last_name'
                  type='text'
                  required
                />
              </div>
            </div>

            <div className='space-y-2 text-sm'>
              <label className='text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300' htmlFor='image_url'>
                Image URL
              </label>
              <input
                className='flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc -700'
                id='image_url'
                placeholder='Enter image URL'
                name='image_url'
                type='text'
                required
              />
            </div>

            <div className='space-y-2 text-sm'>
              <label className='text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300' htmlFor='email'>
                Email
              </label>
              <input
                className='flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700'
                id='email'
                placeholder='Enter your email'
                name='email'
                type='email'
                required
              />
            </div>

            <div className='space-y-2 text-sm'>
              <label className='text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300' htmlFor='password_'>
                Password
              </label>
              <input
                className='flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700'
                id='password_'
                placeholder='Enter your password'
                name='password'
                type='password'
                required
              />
            </div>

            <div className='flex gap-5 justify-between'>
              <button className='rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700'>
                Register
              </button>

              <button
                type='button'
                onClick={handleGoogleSignIn}
                className='rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700'>
                Google
              </button>

              <NavLink
                to='/signin'
                className='rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700'>
                Login?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
