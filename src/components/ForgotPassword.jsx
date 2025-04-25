import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setShowLogin, backendUrl } = useContext(AppContext);

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
        toast.success("OTP senr to your email address.");
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
        navigate("/login");

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

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Forgot Password
      </h2>

      {step === 1 && (
        <div>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className="w-full border p-2 rounded mb-3"
          />
          <button
            onClick={handleSendEmail}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
            className="w-full border p-2 rounded mb-3"
          />

          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />

          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
