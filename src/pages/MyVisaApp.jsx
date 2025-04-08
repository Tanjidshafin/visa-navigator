"use client"

import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { InfinitySpin } from "react-loader-spinner"
import axios from "axios"
import { Search, Calendar, Clock, CreditCard, Globe, FileText, Mail, X } from "lucide-react"
import { toast } from "react-toastify"

const MyVisaApp = () => {
  const { user } = useContext(AppContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [applications, setApplications] = useState([])

  const deleteApplication = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(`https://visa-server-tau.vercel.app/applications/${id}`)
      if (response.data.success) {
        setApplications((prevApplications) => prevApplications.filter((app) => app._id !== id))
        setLoading(false)
        console.log(response.data.message)
        toast.success("Deleted Visa Application")
      } else {
        console.error(response.data.message)
      }
    } catch (error) {
      console.error("Error deleting application:", error)
    }
  }

  const userApplications = applications.filter((app) => app.email === user?.email)
  const filteredApplications = userApplications.filter((app) =>
    app.countryName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    const fetchVisaApplications = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://visa-server-tau.vercel.app/applications")
        setApplications(response.data)
        if (response.status === 200) {
          setLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchVisaApplications()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <InfinitySpin visible={true} width="200" color="#3B82F6" ariaLabel="infinity-spin-loading" />
          <p className="mt-4 text-blue-600 font-medium animate-pulse">Loading your applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-3">
              <FileText className="w-4 h-4 mr-2" />
              My Applications
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">My Visa Applications</h2>
            <p className="text-gray-600 max-w-2xl">
              Display the latest visa updates, showcasing remaining slots, deadlines, and essential details to help
              users plan their applications efficiently.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by country..."
                className="w-full md:w-64 pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="pr-2">
          {filteredApplications.length === 0 ? (
            <div className="bg-blue-50 rounded-xl p-12 text-center">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Found</h3>
              <p className="text-gray-600">
                {searchQuery
                  ? `No applications found for "${searchQuery}"`
                  : "You haven't submitted any visa applications yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredApplications.map((app, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
                >
                  <div className="relative">
                    {/* Country Image */}
                    <div className="h-48 w-full relative">
                      <img
                        className="h-full w-full object-cover"
                        src={app.countryImage || "/placeholder.svg"}
                        alt={`${app.countryName} landscape`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-1">
                          <Globe className="w-4 h-4 mr-2" />
                          {app.countryName}
                        </div>
                        <h3 className="text-xl font-bold text-white">{app.visaType}</h3>
                      </div>
                    </div>

                    {/* Plus Icon */}
                    <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-lg">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Application Details */}
                  <div className="p-6 pt-8">
                    {/* Applicant Info */}
                    <div className="mb-6 text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {app.firstName} {app.lastName}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                        <Mail className="w-4 h-4" />
                        <span>{app.email}</span>
                      </div>
                      {app.showTime && (
                        <div className="mt-1 text-gray-500 text-sm">
                          <span>Applied on: {app.showTime}</span>
                        </div>
                      )}
                    </div>

                    {/* Visa Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500 text-xs mb-1">Processing Time</div>
                        <div className="font-medium text-gray-900 flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-blue-500" />
                          {app.processingTime}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500 text-xs mb-1">Fee</div>
                        <div className="font-medium text-gray-900 flex items-center">
                          <CreditCard className="w-4 h-4 mr-1 text-blue-500" />${app.fee}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500 text-xs mb-1">Validity</div>
                        <div className="font-medium text-gray-900 flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                          {app.validity}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500 text-xs mb-1">Application Method</div>
                        <div className="font-medium text-gray-900 flex items-center">
                          <FileText className="w-4 h-4 mr-1 text-blue-500" />
                          {app.applicationMethod}
                        </div>
                      </div>
                    </div>

                    {/* Status and Action */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Processing
                      </div>
                      <button
                        onClick={() => deleteApplication(app._id)}
                        className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
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

export default MyVisaApp
