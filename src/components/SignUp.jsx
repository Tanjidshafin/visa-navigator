"use client"

import { useState } from "react"
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, provider } from "../firebase.init"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Mail, Lock, User, ImageIcon, Globe, CheckCircle, XCircle } from "lucide-react"

const SignUp = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    isValidLength: false,
  })

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const isValidLength = password.length >= 6

    setPasswordValidation({
      hasUpperCase,
      hasLowerCase,
      isValidLength,
    })

    return hasUpperCase && hasLowerCase && isValidLength
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    validatePassword(newPassword)
  }

  const handleEmailSignUp = async (event) => {
    event.preventDefault()
    const form = event.target
    const firstName = form.first_name.value
    const lastName = form.last_name.value
    const email = form.email.value
    const password = form.password.value
    const imageUrl = form.image_url.value

    if (!validatePassword(password)) {
      toast.warning(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.",
      )
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: imageUrl,
      })
      console.log(user)
      toast.success(`Welcome ${user.displayName || email}`)

      navigate("/")
    } catch (error) {
      console.error(error.message)
      toast.warning("Failed to sign up")
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      navigate("/")
      console.log("User  Info:", user)
      toast.success(`Welcome ${user.displayName}`)
    } catch (error) {
      console.error("Error during Google sign-in:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-2 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Join us to explore visa opportunities worldwide</p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-indigo-600 sm:px-10">
            <h2 className="text-2xl font-bold text-white">Sign Up</h2>
            <p className="mt-1 text-blue-100">Please fill in the form to create an account</p>
          </div>

          <form className="px-6 py-8 sm:px-10 space-y-6" onSubmit={handleEmailSignUp}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first_name" className="flex items-center text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 mr-2 text-blue-500" />
                  First Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    placeholder="First name"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="last_name" className="flex items-center text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 mr-2 text-blue-500" />
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    placeholder="Last name"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label htmlFor="image_url" className="flex items-center text-sm font-medium text-gray-700">
                <ImageIcon className="h-4 w-4 mr-2 text-blue-500" />
                Profile Image URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter image URL"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <ImageIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                <Mail className="h-4 w-4 mr-2 text-blue-500" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700">
                <Lock className="h-4 w-4 mr-2 text-blue-500" />
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="Create a password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Password Requirements */}
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex items-center">
                  {passwordValidation.hasUpperCase ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span className={passwordValidation.hasUpperCase ? "text-green-700" : "text-red-700"}>
                    At least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordValidation.hasLowerCase ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span className={passwordValidation.hasLowerCase ? "text-green-700" : "text-red-700"}>
                    At least one lowercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordValidation.isValidLength ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span className={passwordValidation.isValidLength ? "text-green-700" : "text-red-700"}>
                    At least 6 characters long
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-3 px-4 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 flex items-center justify-center"
              >
                <User className="h-5 w-5 mr-2" />
                Create Account
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-3 px-4 flex items-center justify-center text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Sign up with Google
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <NavLink to="/signin" className="text-blue-600 hover:text-blue-800 hover:underline">
                Sign in
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
