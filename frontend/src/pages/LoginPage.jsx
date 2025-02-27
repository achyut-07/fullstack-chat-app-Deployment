import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`;
  };

  // Array of floating emojis
  const floatingEmojis = ["💬", "🎉", "💫", "✨", "💝", "🌟", "🤗", "🎨", "🚀"];

  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        {/* Logo and Welcome Text */}
        <motion.div className="text-center mb-6 md:mb-8">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Chitti
          </motion.h1>
          <p className="text-sm md:text-base text-base-content/60">
            Connect, Chat, Create Memories
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-base-100 p-4 md:p-8 rounded-2xl shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </motion.button>

            {/* Divider */}
            <div className="divider text-xs text-base-content/50">OR</div>

            {/* Google Login Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleGoogleLogin}
              type="button"
              className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-base-200"
            >
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary hover:underline">
                Create account
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Updated Animation Side */}
      <div className="hidden lg:flex items-center justify-center bg-base-200 flex-1 relative overflow-hidden">
        {/* Floating Emoji Background */}
        {floatingEmojis.map((emoji, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0,
              y: 100,
              x: Math.random() * 400 - 200 // Random starting position
            }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: -100,
              x: Math.random() * 400 - 200 // Random ending position
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "easeInOut"
            }}
            className="absolute text-2xl pointer-events-none"
          >
            {emoji}
          </motion.div>
        ))}

        <div className="max-w-md text-center p-8 z-10">
          {/* Chat Bubbles Animation */}
          <div className="relative h-64 mb-8">
            {/* Left chat bubble */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute left-0 top-0"
            >
              <div className="chat chat-start">
                <div className="chat-bubble bg-primary text-primary-content">
                  Hey! Welcome to Chitti! 🎉
                </div>
              </div>
            </motion.div>

            {/* Right chat bubble */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute right-0 top-16"
            >
              <div className="chat chat-end">
                <div className="chat-bubble bg-secondary text-secondary-content">
                  Thanks! Excited to be here! 🤗
                </div>
              </div>
            </motion.div>

            {/* Left chat bubble 2 */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute left-0 top-32"
            >
              <div className="chat chat-start">
                <div className="chat-bubble bg-primary text-primary-content">
                  Ready for amazing conversations? ✨
                </div>
              </div>
            </motion.div>

            {/* Right chat bubble 2 */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              className="absolute right-0 bottom-0"
            >
              <div className="chat chat-end">
                <div className="chat-bubble bg-secondary text-secondary-content">
                  Let's get started! 🚀
                </div>
              </div>
            </motion.div>
          </div>

          {/* App Icon with Glow Effect */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 2.2 
            }}
            className="flex justify-center mb-6"
          >
            <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-pulse"></div>
              <MessageSquare className="size-8 text-primary relative z-10" />
            </div>
          </motion.div>

          {/* Text Content with Sparkles */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.4 }}
            className="relative"
          >
            <h2 className="text-2xl font-bold mb-4">
              Connect with Friends ✨
            </h2>
            <p className="text-base-content/60">
              Join our community and create magical moments together 💫
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
