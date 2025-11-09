import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateEmail, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../Loading/Loading";

const Profile = () => {
  const { user, setLoading, loading } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const photoURL = form.photoURL.value.trim();
    const name = form.name.value.trim();
    const email = form.email.value.trim();

    setLoading(true);

    try {
      if (user) {
        let updated = false;

        if (photoURL && photoURL !== user.photoURL) {
          await updateProfile(user, { photoURL });
          updated = true;
        }

        if (name && name !== user.displayName) {
          await updateProfile(user, { displayName: name });
          updated = true;
        }

        if (email && email !== user.email) {
          await updateEmail(user, email);
          updated = true;
        }

        if (updated) {
          Swal.fire({
            icon: "success",
            title: "Profile Updated!",
            text: "Your profile has been updated successfully.",
            confirmButtonColor: "#6b46c1",
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "No Changes Detected",
            text: "Please make some changes before updating.",
            confirmButtonColor: "#6b46c1",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
        confirmButtonColor: "#e53e3e",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200 pb-20 pt-30   px-4 ">
      <title>Toy-Topia | My Profile</title>

      {/* Profile Info Card */}
      <div
        className="w-full mt-[100px] md:w-3/4 lg:w-2/3 xl:w-1/2 border border-gray-200 text-black p-8 rounded-xl shadow-lg text-center bg-white backdrop-blur-md"
        data-aos="fade-up"
      >
        <img
          src={user?.photoURL}
          alt={user?.displayName || "User Photo"}
          className="w-32 h-32 rounded-full mx-auto shadow-lg border-4 border-white/40"
          data-aos="zoom-in"
        />

        <div className="mt-6 space-y-2" data-aos="fade-up" data-aos-delay="200">
          <h4 className="text-xl font-semibold">
            Name:{" "}
            <span className="font-normal text-black/80">
              {user?.displayName || "N/A"}
            </span>
          </h4>
          <h4 className="text-black/80">
            Email: <span>{user?.email || "N/A"}</span>
          </h4>
          <h4 className="text-black/70 text-sm">
            Last Login:{" "}
            {user?.metadata?.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleString()
              : "N/A"}
          </h4>
        </div>
      </div>

      {/* Update Form */}
      <form
        onSubmit={handleUpdate}
        className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mt-[20px] bg-white border border-purple-300/50 shadow-xl rounded-xl p-8 backdrop-blur-md"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <h2 className="text-center text-2xl font-semibold text-black mb-6">
          Update Your Information
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-black font-medium mb-2">
              Profile Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              defaultValue={user?.photoURL}
              placeholder="Enter new photo URL"
              className="w-full bg-transparent border border-gray-400 text-black placeholder-white/70 rounded-md py-2 px-4 focus:border-2 focus:border-gray-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-black font-medium mb-2">
              Display Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              placeholder="Enter your name"
              className="w-full bg-transparent border border-gray-400 text-black placeholder-white/70 rounded-md py-2 px-4 focus:border-2 focus:border-gray-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-black font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              placeholder="Enter your email"
              className="w-full bg-transparent border border-gray-400 text-black placeholder-white/70 rounded-md py-2 px-4 focus:border-2 focus:border-gray-500 outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 py-3 cursor-pointer bg-gradient-to-r cursor-pointer from-red-600 to-green-500 hover:from-indigo-600 hover:to-purple-600  text-white font-semibold rounded-lg shadow-md transition-all duration-200"
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
