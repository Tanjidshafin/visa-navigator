import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const MyAddedVisa = () => {
  const { visas, user, deleteVisa } = useContext(AppContext);
  const myVisas = visas.filter((app) => app?.email === user?.email);
  return (
    <div className='max-w-screen-2xl md:h-[40rem] overflow-auto mx-auto px-4 sm:px-6 lg:px-8'>
      <header>
        <h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>My Added Visa</h2>

        <p className='mt-4 max-w-md text-gray-500'>
          Display the latest visa updates, showcasing remaining slots, deadlines, and essential details to help users
          plan their applications efficiently.
        </p>
      </header>
      <div className='grid mt-5 grid-cols-1 lg:grid-cols-2 gap-5'>
        {myVisas.length === 0 ? (
          <p>No Visa Added</p>
        ) : (
          myVisas.map((visa) => (
            <div>
              <article className='flex bg-white transition hover:shadow-xl'>
                <div className='rotate-180 p-2 [writing-mode:_vertical-lr]'>
                  <time
                    datetime='2022-10-10'
                    className='flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900'>
                    <span>{visa.date}</span>
                    <span className='w-px flex-1 bg-gray-900/10'></span>
                    <span>{visa.time}</span>
                  </time>
                </div>

                <div className='hidden sm:block sm:basis-56'>
                  <img
                    alt='Country Image'
                    src={visa.countryImage}
                    className='aspect-square h-full w-full object-cover'
                  />
                </div>

                <div className='flex flex-1 flex-col justify-between'>
                  <div className='border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6'>
                    <a>
                      <h3 className='font-bold uppercase text-gray-900'>{visa.countryName}</h3>
                    </a>

                    <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-700'>Visa Type: {visa.visaType}</p>
                    <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-700'>
                      Processing Time: {visa.processingTime}
                    </p>
                    <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-700'>
                      Application Method: {visa.applicationMethod}
                    </p>
                    <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-700'>Fee: {visa.fee} $</p>
                    <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-700'>Validity: {visa.validity}</p>
                  </div>

                  <div className='flex gap-3 justify-between sm:items-end sm:justify-end'>
                    <a className='block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400'>
                      Update
                    </a>
                    <a
                      onClick={() => deleteVisa(visa._id)}
                      className='block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400'>
                      Delete
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAddedVisa;
