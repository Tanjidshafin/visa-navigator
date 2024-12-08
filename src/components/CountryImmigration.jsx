import React from 'react';

const CountryImmigration = () => {
  return (
    <div className='mx-auto font-semibold max-w-screen-xl px-4 sm:px-6 lg:px-8'>
      <div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <div className='group order-3 rounded-s-3xl lg:order-1 duration-300 hover:shadow-2xl hover:cursor-pointer py-16'>
            <img
              className='w-[10rem] h-[10rem] mx-auto rounded-full object-cover transition-transform duration-300 group-hover:scale-x-[-1]'
              src='https://dev242.kodesolution.com/migrify/wp-content/uploads/2024/07/country1.jpg'
              alt='France Flag'
            />
            <p className='text-center mt-5 mb-3 font-semibold text-3xl'>Australia</p>
            <p className='font-normal text-center max-w-[15rem] mx-auto'>Apply for Australian Visa Online Effortlessly</p>
          </div>
          <div className='group order-2 duration-300 hover:shadow-2xl py-16'>
            <img
              className='w-[10rem] h-[10rem] mx-auto rounded-full object-cover transition-transform duration-300 group-hover:scale-x-[-1]'
              src='https://dev242.kodesolution.com/migrify/wp-content/uploads/2024/07/country2.jpg'
              alt='France Flag'
            />
            <p className='text-center mt-5 mb-3 font-semibold text-3xl'>Canada</p>
            <p className='font-normal text-center max-w-[15rem] mx-auto'>Apply for Canadian Visa Online Effortlessly</p>
          </div>
          <div className='p-7 order-1 lg:order-3'>
            <p className='font-normal text-red-500 '>// COUNTRY //</p>
            <p className='text-3xl my-5'>Immigration Choose Your Country</p>
            <p className='text-gray-500 font-normal  mb-9'>
              Select your ideal immigration destination with our guide, ensuring a visa application process tailor to
              your needs.
            </p>

            <button className='relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-red-500 transition duration-300 ease-out border-2 border-red-500 rounded-full shadow-md group'>
              <span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease'>
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
              <span className='absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease'>
                Read More
              </span>
              <span className='relative invisible'>Read More</span>
            </button>
          </div>
          <div className='group order-3 rounded-s-3xl  duration-300 hover:shadow-2xl hover:cursor-pointer py-16'>
            <img
              className='w-[10rem] h-[10rem] mx-auto rounded-full object-cover transition-transform duration-300 group-hover:scale-x-[-1]'
              src='https://dev242.kodesolution.com/migrify/wp-content/uploads/2024/07/country3.jpg'
              alt='France Flag'
            />
            <p className='text-center mt-5 mb-3 font-semibold text-3xl'>America</p>
            <p className='font-normal text-center max-w-[15rem] mx-auto'>Apply for American Visa Online Effortlessly</p>
          </div>
          <div className='group order-3 rounded-s-3xl  duration-300 hover:shadow-2xl hover:cursor-pointer py-16'>
            <img
              className='w-[10rem] h-[10rem] mx-auto rounded-full object-cover transition-transform duration-300 group-hover:scale-x-[-1]'
              src='https://dev242.kodesolution.com/migrify/wp-content/uploads/2024/07/country4.jpg'
              alt='France Flag'
            />
            <p className='text-center mt-5 mb-3 font-semibold text-3xl'>United Kingdom</p>
            <p className='font-normal text-center max-w-[15rem] mx-auto'>Apply for UK Visa Online Effortlessly</p>
          </div>
          <div className='group order-3 rounded-s-3xl  duration-300 hover:shadow-2xl hover:cursor-pointer py-16'>
            <img
              className='w-[10rem] h-[10rem] mx-auto rounded-full object-cover transition-transform duration-300 group-hover:scale-x-[-1]'
              src='https://dev242.kodesolution.com/migrify/wp-content/uploads/2024/07/country5.jpg'
              alt='France Flag'
            />
            <p className='text-center mt-5 mb-3 font-semibold text-3xl'>Spain</p>
            <p className='font-normal text-center max-w-[15rem] mx-auto'>Apply for Spanish Visa Online Effortlessly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryImmigration;
