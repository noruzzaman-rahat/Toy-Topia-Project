import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footers() {
  return (
    <footer className="w-full bg-base-200 text-black  px-6 md:px-16 lg:px-24 xl:px-36   pt-16 pb-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white/30">
        {/* Logo & Description */}
        <div className="max-w-sm">
          <Link to="/">
            <img src="/img/toy-nav-logo.png" alt="Logo" className="w-24" />
          </Link>
          <p className="text-sm text-black/80 mb-4">
            Bringing joy to kids with the best toys. Explore our amazing
            collection and make playtime unforgettable.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2 text-black">
            <a href="#" className="hover:text-green-400 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="w-full md:w-1/2 flex flex-wrap md:flex-nowrap justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="font-semibold text-lg mb-4">Quick Links</h2>
            <ul className="space-y-2 text-black/80 text-sm ">
              <Link to={"/"}>
                <li className="hover:text-white transition mt-3">Home</li>
              </Link>
              <Link to={"/products"}>
                <li className="hover:text-white transition mt-3">All Toys</li>
              </Link>
              <Link to={"/blog"}>
                <li className="hover:text-white transition mt-3">Blog</li>
              </Link>
              <Link to={"/contacts"}>
                <li className="hover:text-white transition mt-3">Contacts</li>
              </Link>
              <Link to={"/Profile"}>
                <li className="hover:text-white transition mt-3">My Profile</li>
              </Link>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-4">COMPANY</h2>
            <ul className="space-y-2 text-black/80 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="py-4 text-center text-xs md:text-sm text-black/70">
        Copyright 2024 © Toy Topia. All Rights Reserved.
      </p>
    </footer>
  );
}
