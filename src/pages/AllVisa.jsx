import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router';
import { toast } from 'react-toastify';

const AllVisa = () => {
  const { visas } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const dropDownRef = useRef(null);
  const items = ['Fee', 'Country Name', 'Visa'];

  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    toast.success(`Filtered by ${filter}`);
    setOpen(false);
  };
  const sortedVisas = () => {
    if (!selectedFilter) return visas;

    return [...visas].sort((a, b) => {
      switch (selectedFilter) {
        case 'Fee':
          return b.fee - a.fee;
        case 'Country Name':
          return b.countryName.localeCompare(a.countryName);
        case 'Visa':
          return b.visaType.localeCompare(a.visaType);
        default:
          return 0;
      }
    });
  };

  return (
    <div className='mx-auto md:h-[40rem] overflow-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
      <div>
        <div className='flex justify-between items-end'>
          <header>
            <h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>All Visas</h2>
            <p className='mt-4 max-w-md text-gray-500'>
              Display the latest visa updates, showcasing remaining slots, deadlines, and essential details to help
              users plan their applications efficiently
            </p>
          </header>
          <div>
            <div ref={dropDownRef} className='relative mx-auto w-fit text-white'>
              <button onClick={() => setOpen((prev) => !prev)} className='rounded-sm bg-sky-600 px-6 py-2'>
                Filter
              </button>
              <ul
                className={`${
                  open ? 'visible translate-y-0 duration-300' : 'invisible translate-y-4'
                } absolute top-12 z-50 w-full space-y-1 rounded-sm bg-sky-400 shadow-md`}>
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleFilterSelect(item)}
                    className={`rounded-sm p-2 ${open ? 'opacity-100 duration-300' : 'opacity-0'} hover:bg-sky-500`}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <ul className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {sortedVisas().length === 0 ? (
              <p>No Visas at the moment.</p>
            ) : (
              sortedVisas().map((visa) => (
                <li key={visa._id}>
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
                            className='h-5 w-5 mr-2 text-gray -500'
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
        </div>
      </div>
    </div>
  );
};

export default AllVisa;
