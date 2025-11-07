import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { FaGithub, FaGoogle, FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const SignUp = () => {
  const {
    createUserFunc,
    signInWithGoogle,
    signInWithGithub,
    logoutFunc,
    setEmailInput,
    emailInput,
  } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const termsAccepted = e.target.terms.checked;

    if (!termsAccepted) {
      Swal.fire({
        title: "Terms Required",
        text: "You must accept the terms and conditions",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Weak Password!",
        text: "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long.",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    createUserFunc(email, password)
      .then((result) =>
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        })
      )
      .then(() => {
        Swal.fire({
          title: "Account Created!",
          text: "Your account has been created successfully.",
          icon: "success",
          confirmButtonColor: "#7e22ce",
        }).then(() => {
          logoutFunc()
            .then(() => navigate("/login"))
            .catch((err) => console.error("Logout error:", err));
        });
        e.target.reset();
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Signed in successfully!",
          text: `Welcome back, ${result.user.email}`,
          confirmButtonColor: "#6B46C1",
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Sign in failed",
          text: err.message,
          confirmButtonColor: "#6B46C1",
        });
      });
  };

  const handleGithubLogin = () => {
    signInWithGithub()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Signed in successfully!",
          text: `Welcome back, ${result.user.email}`,
          confirmButtonColor: "#6B46C1",
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Sign in failed",
          text: err.message,
          confirmButtonColor: "#6B46C1",
        });
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#6d32f8] via-[#b832f5] to-[#e10080] px-4 py-12">
      <title>Toy-Topia | Sign Up</title>

      <form
        onSubmit={handleSubmitSignUp}
        className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl px-10 py-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 border border-white/20"
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Create an Account
        </h2>

        <div>
          <label className="block mb-1 font-medium text-white">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="w-full border border-purple-400/50 bg-white/10 text-white rounded-md px-4 py-2 outline-none focus:border-white focus:ring-1 focus:ring-white/80 placeholder:text-white/70"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium text-white">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            placeholder="Enter your photo URL"
            className="w-full border border-purple-400/50 bg-white/10 text-white rounded-md px-4 py-2 outline-none focus:border-white focus:ring-1 focus:ring-white/80 placeholder:text-white/70"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium text-white">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full border border-purple-400/50 bg-white/10 text-white rounded-md px-4 py-2 outline-none focus:border-white focus:ring-1 focus:ring-white/80 placeholder:text-white/70"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium text-white">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              className="w-full border border-purple-400/50 bg-white/10 text-white rounded-md px-4 py-2 outline-none focus:border-white focus:ring-1 focus:ring-white/80 placeholder:text-white/70"
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-white/70"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </span>
          </div>
          <p className="text-xs text-white/70 mt-1">
            Must include uppercase, lowercase, and a number (min 6 characters).
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            required
            className="text-purple-600"
          />
          <label htmlFor="terms" className="text-sm text-white/90">
            I accept the terms & conditions
          </label>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-gradient-to-r cursor-pointer from-purple-600 to-pink-500  text-white font-semibold rounded-md shadow-md transition duration-200"
        >
          Sign Up
        </button>

        <p className="text-center text-white/80 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline font-medium">
            Log In
          </Link>
        </p>

        <div className="flex items-center justify-center gap-4 w-full mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white cursor-pointer transition"
          >
            <FaGoogle /> Google
          </button>
          <button
            onClick={handleGithubLogin}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-800 text-white cursor-pointer transition"
          >
            <FaGithub /> Github
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
