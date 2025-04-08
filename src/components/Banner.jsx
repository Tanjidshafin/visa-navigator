"use client"

import { useCallback, useContext, useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Typewriter } from "react-simple-typewriter"
import { AppContext } from "../../context/AppContext"
import { NavLink } from "react-router"

const Banner = () => {
  const [currentSlider, setCurrentSlider] = useState(0)
  const { user } = useContext(AppContext)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    })
  }, [])

  const carouselImages = [
    {
      image: "https://wallpapers.com/images/hd/travel-hd-fg7906fomq6mw28b.jpg",
      title: "Explore the World",
      description:
        "Discover new cultures and experiences with our comprehensive visa application services, ensuring a hassle-free travel experience for you and your loved ones.",
    },
    {
      image: "https://wallpaperaccess.com/full/185289.jpg",
      title: "Seamless Travel",
      description:
        "Travel with ease by applying for your visa through our user-friendly platform, providing a streamlined process and expert guidance every step of the way.",
    },
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/10/355767921/JO/LC/HM/31460895/combodia-vietnam-international-tour-package-service.jpeg",
      title: "Adventure Awaits",
      description:
        "Embark on exciting adventures in Cambodia and Vietnam with the right visa, exploring ancient temples, vibrant cities, and breathtaking natural wonders.",
    },
    {
      image: "https://assets.gqindia.com/photos/64d1c9ca3d23c9d61fbe3fc0/master/w_1600%2Cc_limit/006.jpg",
      title: "Study Abroad",
      description:
        "Pursue your education overseas with our specialized student visa application services, providing expert guidance and support for a successful academic journey.",
    },
    {
      image:
        "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?cs=srgb&dl=pexels-andreimike-1271619.jpg&fm=jpg",
      title: "Work Opportunities",
      description:
        "Unlock global career opportunities by applying for work visas through our expert guidance, connecting you with top employers and industries worldwide.",
    },
  ]

  const prevSlider = () =>
    setCurrentSlider((currentSlider) => (currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1))

  const nextSlider = useCallback(
    () => setCurrentSlider((currentSlider) => (currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1)),
    [carouselImages.length],
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider()
    }, 10000)
    return () => clearInterval(intervalId)
  }, [nextSlider])

  useEffect(() => {
    AOS.refresh()
  }, [nextSlider])

  return (
    <div className="h-[40rem] lg:rounded-2xl max-w-screen-2xl mx-auto w-full md:h-[30rem] lg:h-[52rem] relative overflow-hidden shadow-2xl">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 z-50 w-full h-1 bg-gray-200/30">
        <div
          className="h-full bg-blue-500"
          style={{
            width: `${(currentSlider + 1) * (100 / carouselImages.length)}%`,
            transition: "width 10s linear",
          }}
        ></div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlider}
        className="absolute top-1/2 -translate-y-1/2 left-5 z-50 flex justify-center items-center rounded-full w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-blue-600 transition-all duration-300 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={nextSlider}
        className="absolute top-1/2 -translate-y-1/2 right-5 z-50 flex justify-center items-center rounded-full w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-blue-600 transition-all duration-300 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="flex justify-center items-center z-50 absolute bottom-8 w-full gap-2">
        {carouselImages.map((img, idx) => (
          <button
            key={`${img}_${idx}`}
            onClick={() => setCurrentSlider(idx)}
            className={`rounded-full duration-500 ${
              currentSlider === idx ? "w-12 h-3 bg-blue-500" : "w-3 h-3 bg-white/50 hover:bg-white/80"
            } transition-all`}
          ></button>
        ))}
      </div>

      {/* Carousel Slides */}
      <div
        className="ease-linear duration-700 flex transform-gpu"
        style={{ transform: `translateX(-${currentSlider * 100}%)` }}
      >
        {carouselImages.map((slide, idx) => (
          <div
            key={idx}
            className="relative min-w-full h-[40rem] sm:h-96 md:h-[30rem] lg:h-[52rem]"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
              <div className="absolute inset-0 bg-blue-900/20"></div>
              <div className="flex h-full items-center lg:justify-start">
                <div className="lg:ml-[8rem] p-8 md:p-14 max-w-2xl">
                  {/* Slide number */}
                  <div
                    data-aos="fade-down"
                    className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-600/80 backdrop-blur-sm text-white text-sm font-medium"
                  >
                    {idx + 1}/{carouselImages.length} - {slide.title.split(" ")[0]}
                  </div>

                  {/* Title with typewriter effect */}
                  <h1
                    data-aos="fade-right"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg"
                  >
                    <Typewriter
                      words={[slide.title]}
                      loop={true}
                      cursor
                      cursorStyle="_"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </h1>

                  {/* Description */}
                  <p
                    data-aos="fade-up"
                    className="mt-6 text-white/90 text-base md:text-xl max-w-xl leading-relaxed drop-shadow-lg"
                  >
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="mt-8 flex flex-wrap md:flex-nowrap gap-4 text-center"
                  >
                    {user ? (
                      <NavLink
                        to="/allVisa"
                        className="block w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-sm font-medium text-white shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 sm:w-auto"
                      >
                        Explore All Visas
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/signin"
                        className="block w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-sm font-medium text-white shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 sm:w-auto"
                      >
                        Get Started Today
                      </NavLink>
                    )}
                    <button className="block w-full rounded-full bg-white/10 backdrop-blur-sm border border-white/30 px-8 py-4 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 sm:w-auto">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating features */}
      <div className="hidden lg:flex absolute bottom-24 right-12 z-40 gap-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-48 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-white font-medium">Fast Process</span>
          </div>
          <p className="text-white/80 text-sm">Quick visa approvals with our streamlined system</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-48 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="text-white font-medium">Secure</span>
          </div>
          <p className="text-white/80 text-sm">Your data is protected with bank-level security</p>
        </div>
      </div>
    </div>
  )
}

export default Banner
