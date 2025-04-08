"use client"

import { useContext, useState } from "react"
import { NavLink } from "react-router"
import { AppContext } from "../../context/AppContext"
import { auth } from "../firebase.init"
import { signOut } from "firebase/auth"
import { toast } from "react-toastify"
import { Tooltip } from "react-tooltip"

const Navbar = () => {
  const [isActive, setIsActive] = useState("home")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const { user, setUser } = useContext(AppContext)
  const [toggle, setToggle] = useState("")

  const handleLogout = async () => {
    try {
      toast.success("User Signed Out Successfully")
      await signOut(auth)
      localStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav className="sticky top-0 z-[1000] backdrop-blur-md bg-white/90 shadow-lg rounded-full px-4 py-3 mx-auto max-w-screen-2xl my-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center text-transparent text-xl bg-gradient-to-r bg-clip-text from-blue-600 via-blue-500 to-sky-400 md:text-2xl font-bold">
            <img
              src="https://static.vecteezy.com/system/resources/previews/029/928/227/non_2x/clipboard-with-visa-application-travel-approval-immigration-visa-stock-illustration-vector.jpg"
              alt="logo"
              className="w-[60px] mr-2 rounded-full shadow-md"
            />
            <span className="hidden sm:block">Visa Stars</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="items-center gap-6 text-[1rem] font-medium lg:flex hidden">
          <NavLink onClick={() => setIsActive("home")} to="/" className={`relative group overflow-hidden px-3 py-2`}>
            <span
              className={`relative z-10 ${isActive === "home" ? "text-white" : "text-gray-700 group-hover:text-white"}`}
            >
              Home
            </span>
            <span
              className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full transform ${isActive === "home" ? "scale-100" : "scale-0 group-hover:scale-100"} transition-transform duration-300`}
            ></span>
          </NavLink>

          <NavLink
            onClick={() => setIsActive("allvisa")}
            to="/allVisa"
            className={`relative group overflow-hidden px-3 py-2`}
          >
            <span
              className={`relative z-10 ${isActive === "allvisa" ? "text-white" : "text-gray-700 group-hover:text-white"}`}
            >
              All Visas
            </span>
            <span
              className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full transform ${isActive === "allvisa" ? "scale-100" : "scale-0 group-hover:scale-100"} transition-transform duration-300`}
            ></span>
          </NavLink>

          <NavLink
            onClick={() => setIsActive("addvisa")}
            to="/AddVisa"
            className={`relative group overflow-hidden px-3 py-2`}
          >
            <span
              className={`relative z-10 ${isActive === "addvisa" ? "text-white" : "text-gray-700 group-hover:text-white"}`}
            >
              Add Visa
            </span>
            <span
              className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full transform ${isActive === "addvisa" ? "scale-100" : "scale-0 group-hover:scale-100"} transition-transform duration-300`}
            ></span>
          </NavLink>

          <NavLink
            onClick={() => setIsActive("myaddedvisa")}
            to="/MyAddedVisa"
            className={`relative group overflow-hidden px-3 py-2`}
          >
            <span
              className={`relative z-10 ${isActive === "myaddedvisa" ? "text-white" : "text-gray-700 group-hover:text-white"}`}
            >
              My Added Visas
            </span>
            <span
              className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full transform ${isActive === "myaddedvisa" ? "scale-100" : "scale-0 group-hover:scale-100"} transition-transform duration-300`}
            ></span>
          </NavLink>

          <NavLink
            onClick={() => setIsActive("myvisaApplication")}
            to="/myVisaApplication"
            className={`relative group overflow-hidden px-3 py-2`}
          >
            <span
              className={`relative z-10 ${isActive === "myvisaApplication" ? "text-white" : "text-gray-700 group-hover:text-white"}`}
            >
              My Applications
            </span>
            <span
              className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full transform ${isActive === "myvisaApplication" ? "scale-100" : "scale-0 group-hover:scale-100"} transition-transform duration-300`}
            ></span>
          </NavLink>
        </ul>

        {/* User Authentication */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="md:relative hidden md:block">
              <button
                onClick={() => setToggle(toggle !== "active" ? "active" : "")}
                type="button"
                className="overflow-hidden rounded-full border-2 border-blue-400 shadow-md hover:shadow-blue-300/50 transition-all duration-300"
                data-tooltip-id="user-tooltip"
                data-tooltip-content={user.displayName}
              >
                <span className="sr-only">Toggle dashboard menu</span>
                <img
                  src={
                    user.photoURL ||
                    "https://lh3.googleusercontent.com/proxy/2Utr68FLTC9Y-8gh8ia0CDdozsGNCinXx5N4Mci0r2N9GRiiuZ_1PCNySHWfBFLc6qn7ySugpPdH_VZ6zR53Ve2UCJpzjXZZzAOJsPovRpYZtwv89t0mY6rcnZvs96Q1MrfRDcQ" ||
                    "/placeholder.svg"
                  }
                  alt=""
                  className="size-10 object-cover"
                />
              </button>
              <Tooltip id="user-tooltip" place="left" />
              <div
                className={`absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white shadow-xl ${toggle === "active" ? "block" : "hidden"
                  }`}
                role="menu"
              >
                <div className="p-2">
                  <a
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                    role="menuitem"
                  >
                    My profile
                  </a>

                  <a
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                    role="menuitem"
                  >
                    Billing summary
                  </a>

                  <a
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                    role="menuitem"
                  >
                    Team settings
                  </a>
                </div>

                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    type="submit"
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors duration-200"
                    role="menuitem"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <NavLink
                to="/signup"
                className="py-2 px-5 rounded-full text-white font-medium bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-sky-400 shadow-md hover:shadow-blue-300/50 transition-all duration-300 sm:flex hidden"
              >
                Register
              </NavLink>
              <NavLink
                to="/signin"
                className="py-2 px-5 rounded-full text-white font-medium bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-sky-400 shadow-md hover:shadow-blue-300/50 transition-all duration-300 sm:flex hidden"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end md:hidden block">
          <div
            tabIndex={0}
            role="button"
            className="m-1 p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6 text-blue-500"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu gap-2 bg-white rounded-2xl z-[1] w-60 p-4 shadow-xl border border-gray-100"
          >
            <li className="text-lg font-bold text-transparent bg-gradient-to-r bg-clip-text from-blue-600 to-blue-400 mb-2">
              Visa Stars
            </li>
            <li>
              <NavLink
                to="/"
                className="hover:bg-blue-50 hover:text-blue-600 rounded-lg py-2 transition-all duration-300"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allVisa"
                className="hover:bg-blue-50 hover:text-blue-600 rounded-lg py-2 transition-all duration-300"
              >
                All Visas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addVisa"
                className="hover:bg-blue-50 hover:text-blue-600 rounded-lg py-2 transition-all duration-300"
              >
                Add Visa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/MyAddedVisa"
                className="hover:bg-blue-50 hover:text-blue-600 rounded-lg py-2 transition-all duration-300"
              >
                My Added Visa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myVisaApplication"
                className="hover:bg-blue-50 hover:text-blue-600 rounded-lg py-2 transition-all duration-300"
              >
                My Visa Applications
              </NavLink>
            </li>
            {user ? (
              <li>
                <NavLink
                  onClick={handleLogout}
                  to="/signin"
                  className="text-red-600 hover:bg-red-50 rounded-lg py-2 transition-all duration-300"
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <NavLink
                  to="/signin"
                  className="py-2 text-center rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-90 transition-all duration-300"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="py-2 text-center rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-90 transition-all duration-300"
                >
                  Register
                </NavLink>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
