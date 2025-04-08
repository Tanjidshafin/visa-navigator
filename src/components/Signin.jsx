"use client"

import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase.init"
import { toast } from "react-toastify"
import { AppContext } from "../../context/AppContext"
import { Mail, Lock, LogIn, Globe } from "lucide-react"

const Signin = () => {
  const { isAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const handleEmailSignIn = async (event) => {
    event.preventDefault()

    const form = event.target

    const email = form.email.value

    const password = form.password.value

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log("User  Info:", user)
      toast.success(`Welcome back ${user.displayName || email}`)
      const redirectPath = localStorage.getItem("redirectPath") || "/"
      localStorage.removeItem("redirectPath")
      navigate(redirectPath)
    } catch (error) {
      console.error("Sign In Error:", error.message)

      toast.warning(`Failed to sign in: ${error.message}`)
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log("User  Info:", user)
      toast.success(`Welcome ${user.displayName}`)
      const redirectPath = localStorage.getItem("redirectPath") || "/"
      localStorage.removeItem("redirectPath")
      navigate(redirectPath)
    } catch (error) {
      console.error("Google Sign-In Error:", error.message)

      toast.warning("Error signing in with Google: " + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to access your account</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-indigo-600 sm:px-10">
            <h2 className="text-2xl font-bold text-white">Sign In</h2>
            <p className="mt-1 text-blue-100">Please enter your credentials</p>
          </div>

          <form className="px-6 py-8 sm:px-10 space-y-6" onSubmit={handleEmailSignIn}>
            {/* Email Field */}
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

            {/* Password Field */}
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
                  placeholder="Enter your password"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 flex items-center justify-center"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In */}
            <div>
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
                Sign in with Google
              </button>
            </div>

            {/* Links */}
            <div className="flex items-center justify-between text-sm">
              <NavLink to="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                Forgot Password?
              </NavLink>
              <div className="text-gray-600">
                No account?{" "}
                <NavLink to="/Signup" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Sign up
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
