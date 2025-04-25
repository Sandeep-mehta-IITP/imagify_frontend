import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  const { setShowLogin, backendUrl, setToken, setUser, setShowForgotPassword } =
    useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // ✅ Basic validations before sending to backend
    if (!email || !password || (state === "Register" && !name)) {
      toast.error("Please fill all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          // ⚠️ Backend se mila custom message
          toast.error(data.message || "Invalid email or password.");
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message || "Registration failed.");
        }
      }
    } catch (error) {
      // ⚠️ Backend se aaye error handle karo gracefully
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Prevent scrolling and lock the page
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";  // Lock the body in place
    
    return () => {
      // Restore scroll and positioning when the component unmounts
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <motion.form
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        onSubmit={onSubmitHandler}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.profile_icon} alt="" className="w-6" />
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none text-sm"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" className="w-5" />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            value={email}
            className="outline-none text-sm"
            placeholder="Email Address"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" className="w-5" />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="outline-none text-sm"
            placeholder="Password"
            required
          />
        </div>

        <button
          className="text-sm text-blue-600 my-4 cursor-pointer"
          onClick={() => {
            setShowLogin(false);
            setShowForgotPassword(true);
          }}
        >
          Forgot Password?
        </button>

        <button
          className="bg-blue-600 w-full text-white py-2 cursor-pointer rounded-full"
          onClick={onSubmitHandler}
          disabled={loading}
        >
          {state === "Login"
            ? loading
              ? "Logging in..."
              : "Login"
            : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          alt=""
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
