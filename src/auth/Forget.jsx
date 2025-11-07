import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Forget = () => {
  const { fontgetPasswordUser, emailInput } = useContext(AuthContext);
  const location = useLocation();
  const initialLocation = location.state?.email || emailInput || "";
  const [email, setEmail] = useState(initialLocation);

  const handleForgetSubmit = (e) => {
    e.preventDefault();
    const forgetEmail = e.target.forget.value;

    if (!forgetEmail) {
      Swal.fire({
        title: "Email Required",
        text: "Please enter your registered email address.",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    fontgetPasswordUser(forgetEmail)
      .then(() => {
        Swal.fire({
          title: "Reset Link Sent!",
          text: "A password reset link has been sent to your email. Please check your inbox or spam folder.",
          icon: "success",
          confirmButtonColor: "#7e22ce",
        });
        e.target.reset();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text:
            error.code === "auth/user-not-found"
              ? "No user found with this email address."
              : error.message,
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#6d32f8] via-[#8a3ffc] to-[#ff007a] px-4">
      <title>Toy-Topia | Forget Password</title>

      <form
        onSubmit={handleForgetSubmit}
        className="backdrop-blur-md bg-white/20 shadow-2xl border border-white/30 rounded-2xl px-10 py-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-3">
          Forgot Password?
        </h2>
        <p className="text-center text-white/80 text-sm mb-4">
          Enter your registered email address to receive a password reset link.
        </p>

        <div>
          <label className="block mb-1 font-medium text-white">Email</label>
          <input
            type="email"
            name="forget"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            className="w-full border border-purple-400/50 bg-white/10 text-white rounded-md px-4 py-2 outline-none focus:border-white focus:ring-1 focus:ring-white/80 placeholder:text-white/70"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-gradient-to-r from-[#a855f7] via-[#7e22ce] to-[#d946ef] hover:opacity-90 text-white py-3 rounded-md font-semibold transition duration-200"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default Forget;
