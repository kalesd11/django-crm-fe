import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./Features/authSlice";
import { motion } from "framer-motion";
import bgwallpaper from "./assets/1322308.jpeg";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const login = async (user) => {
    const res = await axios.post("http://localhost:8000/crm/login/", {
      username,
      password,
    });
    console.log(res, "response");
    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const foundUser = await login({
      username: trimmedUsername,
      password: trimmedPassword,
    });
    console.log(foundUser, "founduser");
    if (foundUser && foundUser.data) {
      dispatch(setUser(foundUser));
      localStorage.setItem("user", JSON.stringify(foundUser.data));
      window.location.reload();
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgwallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20 "></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-2xl w-96"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-semibold text-center mb-6 text-white"
        >
          Login
        </motion.h2>

        {error && (
          <motion.p
            initial={{ x: -10 }}
            animate={{ x: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
            className="text-red-300 text-sm text-center mb-3"
          >
            Invalid username or password
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div whileFocus={{ scale: 1.03 }}>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg outline-none text-white placeholder-white/70 focus:border-white/60 focus:ring-2 focus:ring-white/30 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value.trimStart())}
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.03 }}>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg outline-none text-white placeholder-white/70 focus:border-white/60 focus:ring-2 focus:ring-white/30 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value.trimStart())}
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-white/30 backdrop-blur-md text-white py-3 rounded-lg font-medium hover:bg-white/40 border border-white/40 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Login
          </motion.button>
        </form>

        {/* Optional: Add some decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 rounded-2xl overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl"></div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
