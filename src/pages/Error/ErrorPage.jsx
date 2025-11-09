import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 relative overflow-hidden text-center px-4">
      {/* Floating toy shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-10 right-16 w-20 h-20 bg-pink-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-14 h-14 bg-purple-300 rounded-lg rotate-45 animate-spin-slow"></div>

      {/* Main content */}
      <div className="z-10">
        <h1 className="text-[8rem] md:text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 drop-shadow-lg animate-pulse">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
          Oops! Page Not Found 🎈
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Looks like this toy rolled away! The page you’re searching for doesn’t
          exist or has been moved.
        </p>

        <Link
          to="/"
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
        >
          🏠 Back to Home
        </Link>

        <div className="mt-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/408/408367.png"
            alt="Lost Toy"
            className="w-60 h-60 mx-auto animate-float"
          />
        </div>
      </div>

      {/* Custom animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ErrorPage;
