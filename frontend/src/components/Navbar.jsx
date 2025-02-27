import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Users } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      name: "Chat",
      icon: MessageSquare,
    },
    {
      path: "/team",
      name: "Team",
      icon: Users,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: User,
    },
    {
      path: "/settings",
      name: "Settings",
      icon: Settings,
    },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="navbar fixed top-0 z-50 h-16 px-4 backdrop-blur-md bg-base-100/80 border-b border-base-200"
    >
      {/* Logo Section */}
      <div className="navbar-start">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          Chitti
        </Link>
      </div>

      {/* Navigation Links - Center */}
      <div className="navbar-center hidden md:flex">
        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.li key={item.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.path}
                  className={`btn btn-ghost btn-sm rounded-lg gap-2 ${
                    isActive ? "bg-base-200" : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* User Profile & Actions - End */}
      <div className="navbar-end gap-2">
        {authUser ? (
          <>
            {/* Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
                role="button"
                className="avatar"
              >
                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-box w-52 mt-2">
                <li className="menu-title px-4 py-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-base">{authUser.fullName}</span>
                    <span className="text-xs text-base-content/70">{authUser.email}</span>
                  </div>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button 
                    onClick={logout}
                    className="text-error flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          // Login/Signup Buttons for non-authenticated users
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link to={item.path} className="flex items-center gap-2 p-2">
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
