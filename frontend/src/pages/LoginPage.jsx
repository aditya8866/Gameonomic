import React from "react";
import { ThreeDMarquee } from "../components/lightswind/3d-marquee";
import { Link } from "react-router-dom";
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

const LoginPage = () => {
  const images = [
    {
      src: img,
      alt: "Description 1",
    },
    {
      src: img1,
      alt: "Description 2",
    },
    {
      src: img2,
      alt: "Description 1",
    },
    {
      src: img3,
      alt: "Description 2",
    },
    {
      src: img4,
      alt: "Description 1",
    },
    {
      src: img5,
      alt: "Description 2",
    },
    {
      src: img6,
      alt: "Description 1",
    },
    {
      src: img7,
      alt: "Description 2",
    },
    {
      src: img8,
      alt: "Description 1",
    },
    {
      src: img9,
      alt: "Description 2",
    },
    {
      src: img10,
      alt: "Description 1",
    },
    {
      src: img11,
      alt: "Description 2",
    },
    {
      src: img12,
      alt: "Description 1",
    },
    {
      src: img13,
      alt: "Description 2",
    },
    {
      src: img14,
      alt: "Description 1",
    },
    {
      src: img15,
      alt: "Description 2",
    },
    {
      src: img16,
      alt: "Description 1",
    },
    {
      src: img17,
      alt: "Description 2",
    },
    {
      src: img18,
      alt: "Description 1",
    },
    {
      src: img19,
      alt: "Description 2",
    },
    {
      src: img16,
      alt: "Description 1",
    },
    {
      src: img17,
      alt: "Description 2",
    },
    {
      src: img18,
      alt: "Description 1",
    },
    {
      src: img19,
      alt: "Description 2",
    },
  ];
  return (
    <>
      <header className="sticky top-0 z-[1555]">
        <Header />
      </header>
      <div className="relative h-screen w-screen">
        <div className="flex justify-center items-center h-screen w-screen absolute">
          <div className=" h-3/4 w-1/2  z-[10]   mt-20 rounded-2xl   flex justify-center items-center  ">
            <form
              action=""
              className="text-black dark:text-white text-lg border-2 border-gray-300 dark:border-gray-600 rounded-2xl p-8  w-full max-w-md bg-white dark:bg-gray-900 shadow-md"
            >
              <h1 className="mb-2 font-semibold  text-3xl">Email</h1>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 mb-4 border-1 border-gray-800 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-zinc-500"
              />

              <h1 className="mb-2 font-semibold text-3xl">Password</h1>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 mb-6 border-1 border-gray-800 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-zinc-500"
              />

              <button
                type="submit"
                className="w-full bg-zinc-700 dark:bg-zinc-300 dark:text-black text-white py-3 rounded-lg hover:bg-zinc-950 dark:hover:bg-zinc-50 text-2xl font-semibold transition duration-300"
              >
                Login
              </button>
              <br />
              <div>
                <h1 className="pl-11 pt-5 text-xl ">
                  New here?{" "}
                  <Link to="/signup">
                    <span className="text-blue-600 font-semibold cursor-pointer">
                      Create new account
                    </span>{" "}
                  </Link>
                </h1>
              </div>
            </form>
          </div>
        </div>

        <div className="h-screen w-screen flex justify-center items-center   ">
          <ThreeDMarquee
            images={images}
            className=" object-cover w-full h-full    "
          />
          <div className="h-screen w-screen backdrop-blur-[2px] bg-black/35 dark:bg-white/5 absolute"></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
