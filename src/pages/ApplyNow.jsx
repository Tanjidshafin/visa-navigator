import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const ApplyNow = () => {
  const { addVisaApplications, user } = useContext(AppContext);
  const [visa, setVisa] = useState({});
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const data = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    setVisa(data.data);
  }, [data.data._id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email !== user.email) {
      toast.warning('The email you entered does not match your registered email');
      return;
    }
    const applicationData = {
      email,
      firstName,
      lastName,
      visaId: visa._id,
      fee: visa.fee,
      countryImage: visa.countryImage,
      countryName: visa.countryName,
      visaType: visa.visaType,
      processingTime: visa.processingTime,
      validity: visa.validity,
      applicationMethod: visa.applicationMethod,
    };
    addVisaApplications(applicationData);

    toast.success('Added Application');
    navigate('/allVisa');
    setEmail('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div>
      <section className='bg-gray-100 md:h-[40rem] overflow-auto'>
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5'>
            <div className='lg:col-span-2 lg:py-12'>
              <p className='max-w-xl text-lg'>
                Ensure you understand the specific requirements for your destination to streamline the process and
                increase approval chances. Applying for a visa requires careful preparation, including verifying
                passport validity, completing the application form accurately, gathering necessary documents, and
                scheduling an interview. Understanding the specific requirements for your destination can help
                streamline the process and enhance the likelihood of approval.
              </p>

              <div className='mt-8'>
                <a href='' className='text-2xl font-bold text-pink-600'>
                  VISA STARS
                </a>

                <address className='mt-2 not-italic'>Online Platform for applying visa..</address>
              </div>
            </div>

            <div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12'>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label className='sr-only' htmlFor='email'>
                    Email
                  </label>
                  <input
                    className='w-full rounded-lg border-gray-200 p-3 text-sm'
                    placeholder='Email Address'
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <label className='sr-only' htmlFor='firstName'>
                      First Name
                    </label>
                    <input
                      className='w-full rounded-lg border gray-200 p-3 text-sm'
                      placeholder='First Name'
                      type='text'
                      id='firstName'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className='sr-only' htmlFor='lastName'>
                      Last Name
                    </label>
                    <input
                      className='w-full rounded-lg border-gray-200 p-3 text-sm'
                      placeholder='Last Name'
                      type='text'
                      id='lastName'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <p className='text-2xl ml-3 font-semibold'>Fee: {visa.fee} $</p>

                <div className='mt-4'>
                  <button
                    type='submit'
                    className='inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto'>
                    Apply Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyNow;
