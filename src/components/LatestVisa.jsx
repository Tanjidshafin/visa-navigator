"use client"

import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { NavLink } from "react-router"

const LatestVisa = () => {
  const { visas } = useContext(AppContext)

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <section>
        <div className="mx-auto max-w-screen-xl">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Latest Updates
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest <span className="text-blue-600">Visa</span> Opportunities
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Display the latest visa updates, showcasing remaining slots, deadlines, and essential details to help
                users plan their applications efficiently
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <NavLink
                to="/allVisa"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium rounded-full transition-all duration-300"
              >
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NavLink>
            </div>
          </div>

          {/* Visa Cards Grid */}
          {visas.length === 0 ? (
            <div className="bg-blue-50 rounded-xl p-12 text-center">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Visas Available</h3>
              <p className="text-gray-600">No visa opportunities to show at this moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visas.slice(0, 6).map((visa) => (
                <div
                  key={visa._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Card Header with Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      src={visa.countryImage || "/placeholder.svg"}
                      alt={`${visa.countryName} landscape`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Country Flag Badge */}
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-sm font-medium border border-white/30">
                      {visa.countryName}
                    </div>

                    {/* Visa Type */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-white text-2xl uppercase font-bold mb-1">{visa.visaType}</h2>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center bg-blue-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {visa.processingTime}
                        </span>
                        <span className="inline-flex items-center bg-green-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {visa.fee}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body with Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500 text-xs mb-1">Validity</div>
                        <div className="font-medium text-gray-900 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {visa.validity}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500 text-xs mb-1">Application</div>
                        <div className="font-medium text-gray-900 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          {visa.applicationMethod}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <NavLink
                      to={`/visa/${visa._id}`}
                      className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 transform hover:-translate-y-1"
                    >
                      View Details
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          {visas.length > 0 && (
            <div className="mt-16 text-center">
              <NavLink to="/allVisa" className="relative inline-flex items-center justify-center overflow-hidden group">
                <span className="relative inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-blue-500 rounded-full text-blue-600 font-medium transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white">
                  Explore All Visa Opportunities
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </NavLink>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default LatestVisa
