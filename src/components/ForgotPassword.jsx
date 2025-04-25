import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import checkPasswordStrength from "../utils/checkPasswordStrength.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const { setShowLogin, backendUrl, setShowForgotPassword } =
    useContext(AppContext);

  const handleCheckEmail = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(backendUrl + "/api/user/check-email", {
        email,
      });

      if (data.success) {
        toast.success("Email is registered. Sending OTP...");
        handleSendEmail();
      } else {
        toast.error(
          data.message ||
            "Email not registered. Please enter registered email address."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/forgot-password",
        { email }
      );
      if (data.success) {
        toast.success("OTP sent to your email address.");
        setStep(2);
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP sent to your email.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/user/verify-otp", {
        email,
        otp,
      });
      if (data.success) {
        toast.success("OTP verified successfully.");
        setStep(3);
      } else {
        toast.error(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      toast.error("Please enter the OTP and new password.");
      return;
    }
    setLoading(true);

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/reset-password",
        { email, otp, newPassword }
      );
      if (data.success) {
        toast.success("Password reset successfully.");

        setShowLogin(true);
        setShowForgotPassword(false);

        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getBorderColor = () => {
    if (!passwordStrength) return "border-gray-300";
    if (passwordStrength.label === "Weak") return "border-red-500";
    if (passwordStrength.label === "Moderate") return "border-yellow-500";
    if (passwordStrength.label === "Strong") return "border-green-600";
  };

  useEffect(() => {
    // Prevent scrolling and lock the page
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed"; // Lock the body in place

    return () => {
      // Restore scroll and positioning when the component unmounts
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-12 min-h-[400px] bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 tracking-tight">
          Forgot Password
        </h2>

        {step === 1 && (
          <div>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              disabled={loading}
              className="w-full border border-gray-300 p-3 mt-6.5 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
            <button
              onClick={handleCheckEmail}
              disabled={loading}
              className="w-full bg-blue-600 text-white mt-4.5 px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:bg-blue-400"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
              className="w-full border border-gray-300 p-3 mt-6.5 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-200"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-[#20C997] text-white mt-4.5 px-4 py-2 rounded-lg font-semibold hover:bg-[#20C999] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition duration-200"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                const value = e.target.value;
                setNewPassword(value);
                setPasswordStrength(checkPasswordStrength(value));
              }}
              className={`w-full mt-6.5 p-3 pr-10 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ${getBorderColor()}`}
              disabled={loading}
            />
            {passwordStrength && (
              <p
                className={`text-sm mt-1 font-medium ${passwordStrength.color}`}
              >
                Strength: {passwordStrength.label}
              </p>
            )}

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[calc(2.8rem+6.5px)] transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-green-600 text-white mt-4.5 px-4 py-2 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 disabled:bg-green-400"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}

        <p
          className="text-md text-blue-600 mt-6 cursor-pointer text-center font-medium hover:text-blue-800 transition duration-150"
          onClick={() => {
            setShowForgotPassword(false);
            setShowLogin(true);
          }}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
