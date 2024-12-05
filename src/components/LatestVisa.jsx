import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router';

const LatestVisa = () => {
  const { visas } = useContext(AppContext);

  console.log(visas);
  return (
    <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
      <section>
        <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
          <header>
            <h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>Latest Visa's</h2>

            <p className='mt-4 max-w-md text-gray-500'>
              Display the latest visa updates, showcasing remaining slots, deadlines, and essential details to help
              users plan their applications efficiently
            </p>
          </header>

          <ul className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {visas.length === 0 ? (
              <p>No Visa's To Show at this moment...</p>
            ) : (
              visas.slice(0, 6).map((visa) => (
                <li>
                  <div className='max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300'>
                    <div className='relative'>
                      <img
                        className='w-full h-48 object-cover'
                        src={visa.countryImage}
                        alt={`${visa.countryName} landscape`}
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                      <h2 className='absolute bottom-4 left-4 text-white text-2xl font-bold'>{visa.countryName}</h2>
                    </div>
                    <div className='px-6 py-4'>
                      <div className='font-bold text-xl mb-2 text-gray-800'>{visa.visaType}</div>
                      <ul className='text-gray-700 text-base'>
                        <li className='flex items-center mb-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2 text-gray-500'
                            viewBox='0 0 20 20'
                            fill='currentColor'>
                            <path
                              fillRule='evenodd'
                              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                              clipRule='evenodd'
                            />
                          </svg>
                          Processing Time: {visa.processingTime}
                        </li>
                        <li className='flex items-center mb-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2 text-gray-500'
                            viewBox='0 0 20 20'
                            fill='currentColor'>
                            <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
                            <path
                              fillRule='evenodd'
                              d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'
                              clipRule='evenodd'
                            />
                          </svg>
                          Fee: {visa.fee}
                        </li>
                        <li className='flex items-center mb-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2 text-gray-500'
                            viewBox='0 0 20 20'
                            fill='currentColor'>
                            <path
                              fillRule='evenodd'
                              d='M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z'
                              clipRule='evenodd'
                            />
                          </svg>
                          Validity: {visa.validity}
                        </li>
                        <li className='flex items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2 text-gray-500'
                            viewBox='0 0 20 20'
                            fill='currentColor'>
                            <path
                              fillRule='evenodd'
                              d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z'
                              clipRule='evenodd'
                            />
                          </svg>
                          Application Method: {visa.applicationMethod}
                        </li>
                      </ul>
                    </div>
                    <div className='px-6 py-4'>
                      <NavLink
                        to={`/visa/${visa._id}`}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300'>
                        See Details
                      </NavLink>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
          <div className='text-end mt-5'>
            <NavLink
              to='/allVisa'
              className='relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-blue-500 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group'>
              <span className='absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-blue-500 group-hover:h-full'></span>
              <span className='absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12'>
                <svg
                  className='w-5 h-5 text-green-400'
                  fill='none'
                  stroke='#3B9DF8'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
                </svg>
              </span>
              <span className='absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200'>
                <svg
                  className='w-5 h-5 text-green-400'
                  fill='none'
                  stroke='#fff'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
                </svg>
              </span>
              <span className='relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white'>
                See All Visa
              </span>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LatestVisa;
