import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { IoEyeOutline } from "react-icons/io5";
import { FaGithub, FaGoogle, FaRegEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const {
    signInUserFunc,
    signInWithGoogle,
    signInWithGithub,
    setEmailInput,
    emailInput,
  } = useContext(AuthContext);
  const [showsPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.state?.from.pathname || "/";
  const initialLocation = location.state?.email || emailInput || "";
  const [email, setEmail] = useState(initialLocation || emailInput);

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUserFunc(email, password)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Signed in successfully!",
          text: `Welcome back, ${result.user.email}`,
          confirmButtonColor: "#6B46C1",
        });
        navigate(currentPath, { replace: true });
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

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Signed in successfully!",
          text: `Welcome back, ${result.user.email}`,
          confirmButtonColor: "#6B46C1",
        });
        navigate(currentPath, { replace: true });
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
        navigate(currentPath, { replace: true });
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
      <title>Toy-Topia | Sign In</title>
      <form
        onSubmit={handleSignIn}
        className="backdrop-blur-md bg-white/20 shadow-2xl border border-white/30 rounded-2xl px-10 py-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 space-y-4"
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Sign In
        </h2>

        <div>
          <label className="block mb-1 font-medium text-white">Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmailInput(e.target.value);
              {
                (e) => setEmail(e.target.value);
              }
            }}
            value={email}
            placeholder="Enter your email"
            className="w-full border border-purple-400/50 bg-white/10 text-white rounded-md px-4 py-2 outline-none focus:border-white focus:ring-1 focus:ring-white/80 placeholder:text-white/70"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-white">Password</label>
          <div className="relative">
            <input
              type={showsPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              className="w-full border border-purple-400/50 bg-white/10 text-white rounded-md px-4 py-2 outline-none focus:border-white focus:ring-1 focus:ring-white/80 placeholder:text-white/70"
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-white/80"
              onClick={() => setShowPassword(!showsPassword)}
            >
              {showsPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </span>
          </div>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={() =>
              navigate("/forget", { state: { email: emailInput } })
            }
            className="text-sm hover:underline text-white/80"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full mt-3 py-3 bg-gradient-to-r cursor-pointer from-purple-600 to-pink-500  text-white font-semibold rounded-md shadow-md transition duration-200"
        >
          Sign In
        </button>

        <p className="text-center text-white/90 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-white hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>

        <div className="flex items-center justify-center gap-4 w-full">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white cursor-pointer hover:opacity-90 transition"
          >
            <FaGoogle /> Google
          </button>
          <button
            onClick={handleGithubLogin}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-900 text-white cursor-pointer hover:opacity-90 transition"
          >
            <FaGithub /> Github
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
