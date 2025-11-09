import React, { useState } from "react";
import { ThreeDMarquee } from "../components/lightswind/3d-marquee";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import img from "../assets/assC.jpg";
import img1 from "../assets/BMW.jpg";
import img2 from "../assets/cyber.jpg";
import img3 from "../assets/GTA5.jpg";
import img4 from "../assets/rdr.jpg";
import img5 from "../assets/sekiro.jpg";
import img6 from "../assets/spiderman.jpeg";
import img7 from "../assets/uncharted.jpg";
import img8 from "../assets/COD.png";
import img9 from "../assets/Daysgone.jpg";
import img10 from "../assets/GOW.jpg";
import img11 from "../assets/teken.jpg";
import img12 from "../assets/mine.png";
import img13 from "../assets/hitman.jpg";
import img14 from "../assets/blackops.png";
import img15 from "../assets/contor2.jpg";
import img16 from "../assets/elden.jpg";
import img17 from "../assets/lol.jpg";
import img18 from "../assets/pubg.png";
import img19 from "../assets/valo.jpg";

import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();

  

  const [step, setStep] = useState("signup"); // "signup" | "otp"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const images = [
    { src: img, alt: "Description 1" },
    { src: img1, alt: "Description 2" },
    { src: img2, alt: "Description 1" },
    { src: img3, alt: "Description 2" },
    { src: img4, alt: "Description 1" },
    { src: img5, alt: "Description 2" },
    { src: img6, alt: "Description 1" },
    { src: img7, alt: "Description 2" },
    { src: img8, alt: "Description 1" },
    { src: img9, alt: "Description 2" },
    { src: img10, alt: "Description 1" },
    { src: img11, alt: "Description 2" },
    { src: img12, alt: "Description 1" },
    { src: img13, alt: "Description 2" },
    { src: img14, alt: "Description 1" },
    { src: img15, alt: "Description 2" },
    { src: img16, alt: "Description 1" },
    { src: img17, alt: "Description 2" },
    { src: img18, alt: "Description 1" },
    { src: img19, alt: "Description 2" },
  ];

  // handle signup
const submitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

  const newUserData = {
    firstname: name,
    lastname: "User",
    email,
    password,
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUserData
    );

    if (response.status === 201) {
      alert("✅ OTP sent to your email. Please verify.");
      setStep("otp"); // switch to OTP screen
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert(
      error.response?.data?.message ||
        "❌ Signup failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

const handleVerifyOtp = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/verify-otp`,
      { email, otp }
    );

    if (response.status === 200) {
      alert("🎉 Account verified successfully! Redirecting to login...");
      navigate("/login");
    }
  } catch (error) {
    console.error("OTP verify error:", error);
    alert(
      error.response?.data?.message || "❌ Invalid or expired OTP."
    );
  } finally {
    setLoading(false);
  }
};



  return (
    <>
      <header className="sticky top-0 z-[1555]">
        <Header />
      </header>
      <div className="relative h-screen w-screen">
        <div className="flex justify-center items-center h-screen w-screen absolute">
          <div className="h-3/4 w-1/2 z-[10] mt-20 rounded-2xl flex justify-center items-center">
            {step === "signup" ? (
              <form
                onSubmit={(e) => {submitHandler(e);}}
                className="text-black dark:text-white text-lg border-2 border-gray-300 dark:border-gray-600 rounded-2xl p-8 w-full max-w-md bg-white dark:bg-gray-900 shadow-md"
              >
                <h1 className="mb-2 font-semibold text-3xl">Name</h1>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 mb-4 border border-gray-800 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-zinc-500"
                />


                <h1 className="mb-2 font-semibold text-3xl">Email</h1>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 mb-4 border border-gray-800 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-zinc-500"
                />

                <h1 className="mb-2 font-semibold text-3xl">Password</h1>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 mb-6 border border-gray-800 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-zinc-500"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-zinc-700 dark:bg-zinc-300 dark:text-black text-white py-3 rounded-lg hover:bg-zinc-950 dark:hover:bg-zinc-50 text-2xl font-semibold transition duration-300"
                >
                  {loading ? "Creating..." : "Create new account"}
                </button>

                <div>
                  <h1 className="pl-8 pt-5 text-xl">
                    Already have account?{" "}
                    <Link to="/login">
                      <span className="text-blue-600 font-semibold cursor-pointer">
                        Go to login
                      </span>
                    </Link>
                  </h1>
                </div>
              </form>
            ) : (
              <form
                onSubmit={handleVerifyOtp}
                className="text-black dark:text-white text-lg border-2 border-gray-300 dark:border-gray-600 rounded-2xl p-8 w-full max-w-md bg-white dark:bg-gray-900 shadow-md"
              >
                <h1 className="mb-4 font-semibold text-2xl">
                  Enter the OTP sent to {email}
                </h1>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full p-3 mb-6 border border-gray-800 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-zinc-500"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-700 dark:bg-green-300 dark:text-black text-white py-3 rounded-lg hover:bg-green-900 dark:hover:bg-green-50 text-2xl font-semibold transition duration-300"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="h-screen w-screen flex justify-center items-center">
          <ThreeDMarquee
            images={images}
            className="object-cover w-full h-full"
          />
          <div className="h-screen w-screen backdrop-blur-[2px] dark:bg-black/35 bg-white/15 absolute"></div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
