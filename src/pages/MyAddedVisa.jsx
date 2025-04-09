"use client"

import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { Calendar, Clock, CreditCard, Globe, FileText, Trash2, Edit } from 'lucide-react'

const MyAddedVisa = () => {
  const { visas, user, deleteVisa } = useContext(AppContext)
  const myVisas = visas.filter((app) => app?.email === user?.email)

  return (
    <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center px-3 py-1 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-3">
            <FileText className="w-4 h-4 mr-2" />
            My Listings
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">My Added Visas</h2>
          <p className="text-gray-600 max-w-2xl">
            Display the latest visa updates, showcasing remaining slots, deadlines, and essential details to help users
            plan their applications efficiently.
          </p>
        </div>

        {/* Visa Cards */}
        <div className="md:h-[40rem] overflow-auto pr-2">
          {myVisas.length === 0 ? (
            <div className="bg-blue-50 rounded-xl p-12 text-center">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Visas Added</h3>
              <p className="text-gray-600">You haven't added any visa listings yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myVisas.map((visa, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    {/* Date Column */}
                    <div className="bg-blue-50 sm:w-12 flex sm:flex-col justify-center items-center p-3 text-blue-600">
                      <div className="sm:rotate-180 sm:[writing-mode:vertical-lr] flex sm:flex-col items-center gap-2 text-xs font-medium">
                        <span>{visa.date || "Date"}</span>
                        <div className="hidden sm:block h-px w-8 bg-blue-200"></div>
                        <span>{visa.time || "Time"}</span>
                      </div>
                    </div>

                    {/* Image Column */}
                    <div className="sm:w-48 h-48 sm:h-auto">
                      <img
                        alt={`${visa.countryName} Image`}
                        src={visa.countryImage || "/placeholder.svg"}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 flex flex-col p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-blue-100 p-1.5 rounded-full">
                            <Globe className="w-4 h-4 text-blue-600" />
                          </div>
                          <h3 className="font-bold text-lg text-gray-900">{visa.countryName}</h3>
                        </div>

                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">Visa Type:</span> {visa.visaType}
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">Processing Time:</span> {visa.processingTime}
                          </div>

                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">Application Method:</span> {visa.applicationMethod}
                          </div>

                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">Fee:</span> ${visa.fee}
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">Validity:</span> {visa.validity}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4 justify-end">
                        <button className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                          Update
                        </button>
                        <button
                          onClick={() => deleteVisa(visa._id)}
                          className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
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

export default MyAddedVisa
