import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const MyVisaApp = () => {
  const { addApplications, fetchVisaApplications, user, deleteApplication } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const userApplications = addApplications.filter((app) => app.email === user?.email);

  useEffect(() => {
    fetchVisaApplications();
  }, [fetchVisaApplications]);
  const filteredApplications = userApplications.filter((app) =>
    app.countryName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className='mx-auto md:h-[40rem] overflow-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='flex justify-between'>
        <header>
          <h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>My Visa Applications</h2>

          <p className='mt-4 max-w-md text-gray-500'>
            Display the latest visa updates, showcasing remaining slots, deadlines, and essential details to help users
            plan their applications efficiently.
          </p>
        </header>
        <div>
          <div className='relative'>
            <label htmlFor='Search' className='sr-only'>
              {' '}
              Search{' '}
            </label>

            <input
              type='text'
              id='Search'
              placeholder='Search for country...'
              className='w-full border-2 pl-5 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <span className='absolute inset-y-0 end-0 grid w-10 place-content-center'>
              <button type='button' className='text-gray-600 hover:text-gray-700'>
                <span className='sr-only'>Search</span>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-4'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app, index) => (
            <div key={index} className='flex flex-col items-center justify-center md:flex-row'>
              <div className='group relative  sm:w-[350px]'>
                <img
                  width={350}
                  height={350}
                  className='h-full w-full scale-105 transform rounded-lg bg-black/70'
                  src={app.countryImage}
                  alt='card navigate ui'
                />

                <span className='absolute -bottom-6 left-1/2 z-30 flex h-[40px] w-[40px] -translate-x-1/2 transform items-center  justify-center rounded-full bg-white bg-gradient-to-tr from-[#0d87f8]  to-[#70c4ff] duration-500 group-hover:rotate-180 group-hover:shadow-[0px_0px_30px_2px_#0d87f8]'>
                  <svg width={25} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g strokeWidth='0'></g>
                    <g strokeLinecap='round' strokeLinejoin='round'></g>
                    <g>
                      <g id='style=linear'>
                        <g id='add'>
                          <path
                            id='vector'
                            d='M11.998 5.84424L11.998 18.1604'
                            stroke='#9EE6FD'
                            strokeWidth='2'
                            strokeLinecap='round'></path>
                          <path
                            id='vector_2'
                            d='M18.1561 12.002L5.83998 12.0019'
                            stroke='#9EE6FD'
                            strokeWidth='2'
                            strokeLinecap='round'></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>

                <span className='absolute -bottom-6 left-1/2 z-20 h-0 w-0 -translate-x-1/2 transform rounded-full bg-gradient-to-tr from-[#0d87f8]/80 to-[#70c4ff]/80 duration-300 group-hover:h-[50px] group-hover:w-[50px]'></span>

                <span className='absolute -bottom-6 left-1/2 z-20 h-0 w-0 -translate-x-1/2 transform rounded-full bg-gradient-to-tr from-[#0d87f8]/50 to-[#70c4ff]/50 duration-500 hover:duration-300 group-hover:h-[60px] group-hover:w-[60px] '></span>
              </div>

              <div className='min-w-[250px] max-w-[350px] space-y-12 rounded-br-lg rounded-tr-lg bg-white p-10 text-center shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)] dark:bg-[#18181B] md:w-[350px] dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)]'>
                <div className='space-y-1'>
                  <h2 className='text-center text-2xl font-medium text-gray-700 dark:text-white/90 lg:text-3xl'>
                    {app.firstName + ' ' + app.lastName}
                  </h2>

                  <p className='text-gray-500 text-lg '>{app.countryName}</p>
                  <p className='text-gray-500 '>{app.email}</p>
                  <p className='text-gray-500 '>{app.showTime}</p>
                </div>
                <div className='text-start'>
                  <p className='text-xm font-semibold text-gray-500'>
                    Visa Type: <span className='font-semibold text-black'>{app.visaType}</span>
                  </p>
                  <p className='text-xm font-semibold text-gray-500'>
                    Application Method: <span className='font-semibold text-black'>{app.applicationMethod}</span>
                  </p>
                  <p className='text-xm font-semibold text-gray-500'>
                    Processing Time: <span className='font-semibold text-black'>{app.processingTime}</span>
                  </p>
                  <p className='text-xm font-semibold text-gray-500'>
                    Validity: <span className='font-semibold text-black'>{app.validity}</span>
                  </p>
                  <p className='text-xm font-semibold text-gray-500'>
                    Fee: <span className='font-semibold text-black'>{app.fee}$</span>
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => deleteApplication(app._id)}
                    className='rounded-full border border-[#0d87f8] px-4 py-2 text-sm text-[#0d87f8] hover:bg-[#0d87f8] hover:text-white  duration-300 dark:hover:bg-transparent dark:hover:text-[#0d87f8] dark:hover:drop-shadow-[0px_0px_2px_#0d87f8]'>
                    Cancel?
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No applications submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyVisaApp;
