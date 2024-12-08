import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLoaderData } from 'react-router';
import { Info } from 'lucide-react';
const PerVisa = () => {
  const [visa, setVisa] = useState({});
  const data = useLoaderData();
  useEffect(() => {
    setVisa(data.data);
  }, [data.data._id]);
  console.log(visa);
  return (
    visa && (
      <div className='mx-auto md:h-[40rem] overflow-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
        <section>
          <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8'>
              <div>
                <div className='max-w-lg md:max-w-none'>
                  <h2 className='text-2xl font-semibold text-gray-900 sm:text-3xl'>{visa.countryName}</h2>

                  <p className='mt-4 font-semibold text-gray-700'>Visa Type: {visa.visaType}</p>
                  <p className='mt-4 font-semibold text-gray-700'>Processing Time: {visa.processingTime}</p>

                  <div className='mt-4 text-gray-700 space-y-1'>
                    Required Documents:{' '}
                    {visa.requiredDocuments?.map((doc, index) => (
                      <p key={index} className='my-2 flex items-center gap-2 ml-2 font-semibold text-sm'>
                        <Info className='w-5 h-5 text-blue-400' />
                        {doc}
                      </p>
                    ))}
                  </div>
                  <p className='mt-4 font-semibold text-gray-700'>Age Restriction: {visa.ageRestriction}</p>
                  <p className='mt-4 mb-6 text-3xl font-bold text-gray-700'>Fee: {visa.fee}$</p>
                  <p className='mt-4 font-semibold text-gray-700'>Flight Validity: {visa.validity}</p>

                  <NavLink
                    to={`/visa/${visa._id}/apply`}
                    className='relative mt-4 inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-blue-500 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group'>
                    <span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease'>
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
                      </svg>
                    </span>
                    <span className='absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease'>
                      Apply for the Visa
                    </span>
                    <span className='relative invisible'>Apply for the Visa</span>
                  </NavLink>
                </div>
              </div>

              <div>
                <img src={visa.countryImage} className='rounded' alt='' />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default PerVisa;
