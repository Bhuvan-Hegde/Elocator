import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { setEmail, setPhoneNumber, setToken, setUser, setUserID, setUserName, setfullname } from "./auth";
import { supabase } from "../../utils/supabaseClient";

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const login = async () => {
    toast.loading("Loading...");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        toast.dismiss();
        toast.error("Login Failed. " + error.message);
        return;
      }
      const user = data.user;
      const session = data.session;
      if (user && session) {
        // Save user and session info
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setEmail(user.email ?? "");
        setToken(session.access_token);
        setUserID(user.id);
        // Optionally set username, fullname, phoneNumber if you store them in user_metadata
        setUserName(user.user_metadata?.username ?? "");
        setfullname(user.user_metadata?.fullName ?? "");
        setPhoneNumber(user.phone ?? "");
        toast.dismiss();
        toast.success("Login Successful!");
        // TODO: redirect as needed
        window.location.href = "/";
      } else {
        toast.dismiss();
        toast.error("Login Failed. User or session not found.");
      }
    } catch (error: any) {
      toast.dismiss();
      console.error("Login failed:", error);
      toast.error("Login Failed. Please check your credentials.");
    }
  };




  return (
    <div className="flex items-center justify-center md:h-screen h-[70vh]">
      <ToastContainer
        className="text-2xl"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <form className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              placeholder="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </form>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="password"
              className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={handleInputChange}
              value={formData.password}
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <label className="flex items-center text-sm mr-24">
              <input
                type="checkbox"
                name="ch"
                id="ch"
                placeholder="checkbox"
                className="mr-2 p-1"
                onClick={togglePasswordVisibility}
              />
              Show Password
            </label>
            <Link href="/forget-password" className="font-bold text-black">
              forgot password ?
            </Link>
          </div>

          <button
            className="w-full bg-black mt-4 text-white p-2 rounded-lg mb-6 hover:bg-emerald-400 hover:text-black hover:border hover:border-gray-300"
            onClick={login}
          >
            Sign in
          </button>

          <div className="text-center text-gray-400">
            Dont have an account?
            <Link
              href="/sign-up"
              className="font-bold text-black hover:text-emerald-300"
            >
              Sign up{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
