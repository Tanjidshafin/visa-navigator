import React from 'react';
import CountUp from 'react-countup';
const AboutUS = () => {
  return (
    <div className='mx-auto my-32 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8'>
      <div>
        <div>
          <h2 className=' text-red-500'>
            // <span className='text-red-500'>ABOUT US</span> //
          </h2>

          <p className='mt-4 max-w-xl h-24 md:text-3xl lg:text-4xl font-semibold'>
            Experts In Professional Immigration & Visa Processing
          </p>
        </div>
      </div>
      <div className='my-10'>
        <div className='relative'>
          <img
            className='rounded-lg md:h-full w-full h-[12rem] object-cover'
            src='https://dev242.kodesolution.com/migrify/wp-content/uploads/2024/07/about-1.jpg'
            alt=''
          />
          <div className='bg-red-500 absolute lg:top-1 left-1/2 lg:translate-x-80 lg:-translate-y-1/2 top-1/2 -translate-x-1/2 translate-y-1  lg:w-[15rem] text-end w-[10rem] h-[10rem] lg:h-[15rem] p-5 border-8  rounded-full'>
            <div className='relative'>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2   -translate-y-1 lg:translate-y-5'>
                <div className='text-center'>
                  <CountUp className='lg:text-7xl text-4xl  text-white font-bold' end={10} enableScrollSpy />
                </div>
                <p className='text-center text-white font-semibold text-md lg:text-xl max-w-[10rem] mx-auto mt-3'>
                  Years Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
