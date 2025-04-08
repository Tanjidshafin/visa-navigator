"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { NavLink } from "react-router"
import { toast } from "react-toastify"
import { InfinitySpin } from "react-loader-spinner"

const AllVisa = () => {
  const { visas, loading } = useContext(AppContext)
  const [open, setOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(null)
  const dropDownRef = useRef(null)
  const items = ["Fee", "Country Name", "Visa Type"]

  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter)
    toast.success(`Filtered by ${filter}`)
    setOpen(false)
  }

  const sortedVisas = () => {
    if (!selectedFilter) return visas

    return [...visas].sort((a, b) => {
      switch (selectedFilter) {
        case "Fee":
          return b.fee - a.fee
        case "Country Name":
          return a.countryName.localeCompare(b.countryName)
        case "Visa":
          return a.visaType.localeCompare(b.visaType)
        default:
          return 0
      }
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <InfinitySpin visible={true} width="200" color="#3B82F6" ariaLabel="infinity-spin-loading" />
          <p className="mt-4 text-blue-600 font-medium animate-pulse">Loading visa opportunities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              Visa Catalog
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              All <span className="text-blue-600">Visa</span> Opportunities
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Display the latest visa updates, showcasing remaining slots, deadlines, and essential details to help
              users plan their applications efficiently
            </p>
          </div>

          {/* Filter Dropdown */}
          <div ref={dropDownRef} className="relative">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-blue-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              {selectedFilter ? `Filtered by: ${selectedFilter}` : "Filter Visas"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul
              className={`${
                open ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-4"
              } absolute right-0 top-full mt-2 z-50 w-48 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden transition-all duration-300`}
            >
              {items.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleFilterSelect(item)}
                  className="border-b border-gray-100 last:border-0 cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                >
                  <button className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 font-medium">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visa Cards Grid */}
        <div>
          {sortedVisas().length === 0 ? (
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedVisas().map((visa) => (
                <div
                  key={visa._id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  {/* Card Header with Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      src={visa.countryImage || "/placeholder.svg"}
                      alt={`${visa.countryName} landscape`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Country Badge */}
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-sm font-medium border border-white/30">
                      {visa.countryName}
                    </div>

                    {/* Visa Type */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h2 className="text-white text-xl font-bold mb-1 truncate">{visa.visaType}</h2>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center bg-blue-500/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
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
                        <span className="inline-flex items-center bg-green-500/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
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
                  <div className="p-5 flex-grow">
                    <ul className="space-y-3 mb-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-500 mb-1">Processing Time</span>
                          <span className="font-medium text-gray-900">{visa.processingTime}</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path
                              fillRule="evenodd"
                              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-500 mb-1">Fee</span>
                          <span className="font-medium text-gray-900">{visa.fee}</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-500 mb-1">Validity</span>
                          <span className="font-medium text-gray-900">{visa.validity}</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-500 mb-1">Application Method</span>
                          <span className="font-medium text-gray-900">{visa.applicationMethod}</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="px-5 pb-5 mt-auto">
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
        </div>
      </div>
    </div>
  )
}

export default AllVisa
