"use client"

import { useEffect, useState } from "react"
import { NavLink, useLoaderData } from "react-router"
import { Info, Clock, FileText, Calendar, DollarSign, Globe, Users } from "lucide-react"

const PerVisa = () => {
  const [visa, setVisa] = useState({})
  const data = useLoaderData()

  useEffect(() => {
    setVisa(data.data)
  }, [data.data])

  return (
    visa && (
      <div className="mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Country Banner */}
          <div
            className="h-64 w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${visa.countryImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-3">
                <Globe className="w-4 h-4 mr-2" />
                {visa.countryName}
              </div>
              <h1 className="text-4xl font-bold uppercase text-white mb-2">{visa.visaType}</h1>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center bg-blue-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  {visa.processingTime}
                </span>
                <span className="inline-flex items-center bg-green-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {visa.fee}$
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-3">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="prose max-w-none">
                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-500" />
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{visa.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-500" />
                    Required Documents
                  </h3>
                  <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                    {visa.requiredDocuments?.map((doc, index) => (
                      <div key={index} className="flex items-start p-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Info className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-gray-700">{doc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-8">
                <NavLink
                  to={`/visa/${visa._id}/apply`}
                  className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 group"
                >
                  <span className="absolute right-0 flex items-center justify-start w-10 h-full transition-all duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:-translate-x-2 ease">
                    Apply for this Visa
                  </span>
                </NavLink>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Visa Details</h3>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Processing Time</span>
                      <span className="font-medium text-gray-900">{visa.processingTime}</span>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Fee</span>
                      <span className="font-medium text-gray-900">{visa.fee}$</span>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Validity</span>
                      <span className="font-medium text-gray-900">{visa.validity}</span>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Age Restriction</span>
                      <span className="font-medium text-gray-900">{visa.ageRestriction}</span>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Application Status</span>
                    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                      Open
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default PerVisa
