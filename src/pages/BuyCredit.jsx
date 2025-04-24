import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } =
    useContext(AppContext);

  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Purchase Credits",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        try {
          const { data } = await axios.post(backendUrl + "/api/user/verify-razor", res, {
            headers: { token },
          })

          if (data.success) {
            toast.success("Payment successful! Credits added.");
            loadCreditsData();
            navigate("/");
          }
        } catch (error) {
          toast.error("Payment failed: " + error.message);
        }
      },
    };

    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded!");
      return;
    }

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Failed to open Razorpay:", err);
    }
  };

  const paymentHandler = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/user/pay-razor",
        { planId, userId: user._id },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        initPay(response.data.order);
      } else {
        console.error("Payment API failed:", response.data.message);
      }
    } catch (error) {
      console.error("Axios error:", error);
      toast.error(error.message || "Payment failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the plan
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.logo_icon} alt="" width={40} />
            <p className="mt-3 mb-1 font-semibold">{plan.id}</p>
            <p className="text-sm">{plan.desc}</p>
            <p className="mt-">
              <span className="text-3xl font-medium">${plan.price}</span> /{" "}
              {plan.credits}
            </p>
            <button
              onClick={() => {
                paymentHandler(plan.id);
              }}
              className="w-full bg-gray-800 text-white mt-8 text-sm cursor-pointer rounded-md py-2.5 min-w-52"
            >
              {user ? "Purchase" : " Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
