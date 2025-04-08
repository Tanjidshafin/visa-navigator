"use client"

import { useContext, useEffect, useState } from "react"
import { useLoaderData, useNavigate } from "react-router"
import { AppContext } from "../../context/AppContext"
import { toast } from "react-toastify"
import { CheckCircle, CreditCard, Globe, Clock, Calendar } from "lucide-react"

const ApplyNow = () => {
  const { addVisaApplications, user } = useContext(AppContext)
  const [visa, setVisa] = useState({})
  const [email, setEmail] = useState(user.email)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const data = useLoaderData()
  const navigate = useNavigate()

  useEffect(() => {
    setVisa(data.data)
  }, [data.data])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email !== user.email) {
      toast.warning("The email you entered does not match your registered email")
      return
    }
    const applicationData = {
      email,
      firstName,
      lastName,
      visaId: visa._id,
      fee: visa.fee,
      countryImage: visa.countryImage,
      countryName: visa.countryName,
      visaType: visa.visaType,
      processingTime: visa.processingTime,
      validity: visa.validity,
      applicationMethod: visa.applicationMethod,
    }
    addVisaApplications(applicationData)

    toast.success("Added Application")
    navigate("/allVisa")
    setEmail("")
    setFirstName("")
    setLastName("")
  }

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Apply for <span className="text-blue-600">{visa.visaType}</span> Visa
          </h1>
          <p className="mt-2 text-gray-600">Complete your application for {visa.countryName} visa</p>
        </div>

        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5 items-start">
          {/* Left Column - Information */}
          <div className="lg:col-span-2 lg:sticky lg:top-10">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Visa Summary */}
              <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${visa.countryImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-2">
                    <Globe className="w-4 h-4 mr-2" />
                    {visa.countryName}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{visa.visaType}</h2>
                </div>
              </div>

              {/* Visa Details */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Visa Details</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Fee</span>
                      <span className="font-medium text-gray-900">${visa.fee}</span>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Processing Time</span>
                      <span className="font-medium text-gray-900">{visa.processingTime}</span>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Validity</span>
                      <span className="font-medium text-gray-900">{visa.validity}</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Application Tips */}
              <div className="p-6 bg-blue-50 border-t border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Tips</h3>
                <p className="text-gray-700 mb-4">
                  Ensure you understand the specific requirements for your destination to streamline the process and
                  increase approval chances.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Verify passport validity (at least 6 months)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Complete the application form accurately</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Gather all necessary supporting documents</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="bg-blue-600 rounded-full p-2 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-blue-600">VISA STARS</h3>
                    <p className="text-gray-600 text-sm">Online Platform for applying visa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        ></path>
                      </svg>
                    </div>
                    <input
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your email address"
                      type="email"
                      id="email"
                      value={email}
                      required
                      disabled
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Must match your registered email address</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                      </div>
                      <input
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your first name"
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                      </div>
                      <input
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your last name"
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">Application Fee</span>
                    <span className="text-2xl font-bold text-gray-900">${visa.fee}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-4 px-6 rounded-lg shadow-lg hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center"
                  >
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Submit Application
                  </button>
                  <p className="mt-3 text-center text-sm text-gray-500">
                    By submitting, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplyNow
