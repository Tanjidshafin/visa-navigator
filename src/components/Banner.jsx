import { useCallback, useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Typewriter } from 'react-simple-typewriter';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router';
const Banner = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const { user } = useContext(AppContext);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const carouselImages = [
    {
      image: 'https://wallpapers.com/images/hd/travel-hd-fg7906fomq6mw28b.jpg',
      title: 'Explore the World',
      description:
        'Discover new cultures and experiences with our comprehensive visa application services, ensuring a hassle-free travel experience for you and your loved ones.',
    },
    {
      image: 'https://wallpaperaccess.com/full/185289.jpg',
      title: 'Seamless Travel',
      description:
        'Travel with ease by applying for your visa through our user-friendly platform, providing a streamlined process and expert guidance every step of the way.',
    },
    {
      image:
        'https://5.imimg.com/data5/SELLER/Default/2023/10/355767921/JO/LC/HM/31460895/combodia-vietnam-international-tour-package-service.jpeg',
      title: 'Adventure Awaits',
      description:
        'Embark on exciting adventures in Cambodia and Vietnam with the right visa, exploring ancient temples, vibrant cities, and breathtaking natural wonders.',
    },
    {
      image: 'https://assets.gqindia.com/photos/64d1c9ca3d23c9d61fbe3fc0/master/w_1600%2Cc_limit/006.jpg',
      title: 'Study Abroad',
      description:
        'Pursue your education overseas with our specialized student visa application services, providing expert guidance and support for a successful academic journey.',
    },
    {
      image:
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?cs=srgb&dl=pexels-andreimike-1271619.jpg&fm=jpg',
      title: 'Work Opportunities',
      description:
        'Unlock global career opportunities by applying for work visas through our expert guidance, connecting you with top employers and industries worldwide.',
    },
  ];

  const prevSlider = () =>
    setCurrentSlider((currentSlider) => (currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1));

  const nextSlider = useCallback(
    () => setCurrentSlider((currentSlider) => (currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1)),
    [carouselImages.length]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);
  useEffect(() => {
    AOS.refresh();
  }, [nextSlider]);

  return (
    <div className='h-[40rem] lg:rounded-2xl max-w-screen-2xl mx-auto w-full md:h-[30rem] lg:h-[52rem] relative overflow-hidden'>
      <button
        onClick={prevSlider}
        className='absolute top-1/2 bg-white left-3 z-50 flex justify-center items-center rounded-full w-6 h-6 md:w-8 md:h-8'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='Black'
          className='size-6'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
        </svg>
      </button>

      <button
        onClick={nextSlider}
        className='absolute top-1/2 bg-white z-50 right-3 flex justify-center items-center rounded-full w-6 h-6 md:w-8 md:h-8'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='Black'
          className='size-6'>
          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
        </svg>
      </button>

      <div className='flex justify-center items-center rounded-full z-50 absolute bottom-4 w-full gap-1'>
        {carouselImages.map((img, idx) => (
          <button
            key={`${img}_${idx}`}
            onClick={() => setCurrentSlider(idx)}
            className={`rounded-full duration-500 bg-white ${currentSlider === idx ? 'w-8' : 'w-2'} h-2`}></button>
        ))}
      </div>

      <div
        className='ease-linear duration-500 flex transform-gpu'
        style={{ transform: `translateX(-${currentSlider * 100}%)` }}>
        {carouselImages.map((slide, idx) => (
          <div
            key={idx}
            className='relative min-w-full h-[40rem] bg-black/20 sm:h-96 md:h-[30rem] lg:h-[52rem]'
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='absolute flex items-center justify-center lg:justify-start inset-0 bg-gradient-to-b from-black/50 to-transparent'>
              <div className=' lg:ml-[8rem] p-14'>
                <p data-aos='fade-right' className='text-white sm:text-4xl font-bold'>
                  <Typewriter
                    words={[slide.title]}
                    loop={true}
                    cursor
                    cursorStyle='_'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </p>
                <p data-aos='fade-left' className='mt-4 max-w-xl text-white sm:text-xl/relaxed'>
                  {slide.description}
                </p>
                <div className='mt-8  flex flex-wrap md:flex-nowrap gap-4 text-center'>
                  {user ? (
                    <NavLink
                      to='/allVisa'
                      className='block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto'>
                      See all Visa
                    </NavLink>
                  ) : (
                    <NavLink
                      to='/signin'
                      className='block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto'>
                      Get Started
                    </NavLink>
                  )}
                  <button className='block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto'>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Banner;
