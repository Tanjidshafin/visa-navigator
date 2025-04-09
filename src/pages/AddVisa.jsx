"use client"

import { useContext, useState } from "react"
import axios from "axios"
import { PlusIcon, Upload, Globe, Clock, FileText, CreditCard, Calendar, Users } from 'lucide-react'
import { useNavigate } from "react-router"
import { AppContext } from "../../context/AppContext"
import { toast } from "react-toastify"

const AddVisa = () => {
  const { user, fetchVisaData, loading, setLoading } = useContext(AppContext)
  const date = new Date().toLocaleDateString()
  const time = new Date().toLocaleTimeString()
  const [formData, setFormData] = useState({
    countryImage: "",
    countryName: "",
    visaType: "",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
    email: user.email,
    date: date,
    time: time,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      requiredDocuments: checked
        ? [...prevData.requiredDocuments, value]
        : prevData.requiredDocuments.filter((doc) => doc !== value),
    }))
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post("https://visa-server-tau.vercel.app/add-visa", formData)
      if (data.success) {
        await fetchVisaData()
        toast.success("Visa Added")
        setLoading(false)
        navigate("/")
      }
      console.log(data)
    } catch (error) {
      console.error("Error adding visa:", error)
      toast.warning("Failed to add")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Visa Listing</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Create a new visa listing to help travelers find the right visa for their journey.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-indigo-600 sm:px-10">
            <h2 className="text-2xl font-bold text-white">Visa Information</h2>
            <p className="mt-1 text-blue-100">Please fill in all the required details</p>
          </div>

          {/* Form Body */}
          <form className="px-6 py-8 sm:px-10 space-y-8" onSubmit={handleSubmit}>
            {/* Country Image */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Upload className="h-4 w-4 mr-2 text-blue-500" />
                Country Image
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="url"
                    name="countryImage"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter image URL"
                    value={formData.countryImage}
                    onChange={handleChange}
                  />
                </div>
                {formData.countryImage && (
                  <div className="h-20 w-20 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={formData.countryImage || "/placeholder.svg"}
                      alt="Country"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150?text=Image+Error"
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country Name */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Globe className="h-4 w-4 mr-2 text-blue-500" />
                  Country Name
                </label>
                <input
                  type="text"
                  name="countryName"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter country name"
                  value={formData.countryName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Visa Type */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  Visa Type
                </label>
                <select
                  name="visaType"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  value={formData.visaType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select visa type
                  </option>
                  <option value="tourist">Tourist Visa</option>
                  <option value="student">Student Visa</option>
                  <option value="official">Official Visa</option>
                  <option value="business">Business Visa</option>
                </select>
              </div>

              {/* Processing Time */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  Processing Time
                </label>
                <input
                  type="text"
                  name="processingTime"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g., 5-7 days"
                  value={formData.processingTime}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Fee */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                  Fee
                </label>
                <input
                  type="number"
                  name="fee"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter fee amount"
                  value={formData.fee}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Validity */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  Validity
                </label>
                <input
                  type="text"
                  name="validity"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g., 6 months"
                  value={formData.validity}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Age Restriction */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  Age Restriction
                </label>
                <input
                  type="number"
                  name="ageRestriction"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter minimum age"
                  value={formData.ageRestriction}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Application Method */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                Application Method
              </label>
              <input
                type="text"
                name="applicationMethod"
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., Online, In-person, etc."
                value={formData.applicationMethod}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter visa description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Required Documents */}
            <div className="space-y-2">
              <span className="flex items-center text-sm font-medium text-gray-700">
                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                Required Documents
              </span>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Valid Passport", "Visa Application Form", "Recent Passport Photo", "Bank Statement"].map((doc) => (
                    <div key={doc} className="flex items-center">
                      <input
                        type="checkbox"
                        id={doc.replace(/\s+/g, "")}
                        value={doc}
                        checked={formData.requiredDocuments.includes(doc)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={doc.replace(/\s+/g, "")} className="ml-2 text-sm text-gray-700">
                        {doc}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 flex items-center justify-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Visa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddVisa

