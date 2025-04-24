import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <img src={assets.logo} alt="" width={150} />

      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright @Imagify | All rights reserved.
      </p>

      <div className="flex gap-2.5">
        <Link
          to="https://www.facebook.com/profile.php?id=100028959376680"
          target="_blank"
        >
          <img
            src={assets.facebook_icon}
            alt="Facebook"
            width={35}
            className="hover:bg-blue-600 rounded-full"
          />
        </Link>
        <Link to="https://x.com/Shivskm2023" target="_blank">
          <img
            src={assets.twitter_icon}
            alt="Twitter"
            width={35}
            className="hover:bg-blue-600 rounded-full"
          />
        </Link>
        <Link to="https://www.instagram.com/sandeep._mehta/" target="_blank">
          <img
            src={assets.instagram_icon}
            alt="Instagram"
            width={35}
            className="hover:bg-blue-600 rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
