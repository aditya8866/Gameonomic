import React, { useEffect } from "react";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

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

import { ScrollReveal } from "../components/lightswind/scroll-reveal";
import { AuroraTextEffect } from "../components/lightswind/aurora-text-effect";

gsap.registerPlugin(ScrollTrigger);

const Aboutus = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.09,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value)
          : lenis.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    document.querySelectorAll(".elem").forEach((elem) => {
      const image = elem.querySelector("img");
      const tl = gsap.timeline();

      let xTransform = gsap.utils.random(-100, 100);

      tl.set(
        image,
        {
          transformOrigin: xTransform < 0 ? "0% 50%" : "100% 50%",
        },
        "start",
      )
        .to(
          image,
          {
            scale: 0,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 30%",
              end: "bottom top",
              scrub: true,
              scroller: document.body,
            },
          },
          "start",
        )
        .to(elem, {
          xPercent: xTransform,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top top",
            end: "bottom top",
            scrub: true,
            scroller: document.body,
          },
        });
    });

    // 👇 ScrollTrigger for about heading fade
  }, []);

  useGSAP(() => {
    const heading = document.querySelector(".about-heading");

    gsap.set(heading, { autoAlpha: 0 });

    ScrollTrigger.create({
      trigger: ".about-section", // the wrapper div for about section
      start: "top center", // when top of section hits center of viewport
      end: "bottom center", // when bottom hits center
      toggleActions: "play reverse play reverse",
      onEnter: () => gsap.to(heading, { autoAlpha: 1, duration: 0.3 }),
      onLeave: () => gsap.to(heading, { autoAlpha: 0, duration: 0.3 }),
      onEnterBack: () => gsap.to(heading, { autoAlpha: 1, duration: 0.3 }),
      onLeaveBack: () => gsap.to(heading, { autoAlpha: 0, duration: 0.3 }),
      scroller: document.body,
    });
  }, []);

  return (
    <>
      {/* 🔹 This heading is fixed to the screen center and shown only during About section scroll */}
      <div className="about-section relative">
        <div className="fixed mt-[5px] top-1/2 left-1/2 z-30 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-semibold text-center pointer-events-none about-heading">
          <span className="text-7xl font-semibold text-bg-zinc-800 dark:text-white">
            <span className="whitespace-nowrap font-normal text-6xl ">
              Get your favorite games on
            </span>{" "}
            Gameonomics
          </span>
        </div>

        {/* 🔹 Wrap About section to use as scroll trigger */}
        <div className="about-wrapper opacity-85  ">
          {/* Image grid */}
          <div className=" grid grid-cols-8 grid-rows-11 gap-5 overflow-hidden pl-[100px] pr-[100px] scrollbar-hide">
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 2, "--c": 3 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img}
                alt="Person's face"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 3, "--c": 5 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img1}
                alt="Portrait of a woman"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 6, "--c": 6 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img2}
                alt="Albert Einstein"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 2, "--c": 7 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img3}
                alt="Person looking away"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 5, "--c": 7 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img4}
                alt="Person in a cafe"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 7, "--c": 1 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img5}
                alt="Woman smiling"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 8, "--c": 3 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img6}
                alt="Man with glasses"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 10, "--c": 5 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img7}
                alt="Anime character avatar"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 5, "--c": 3 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img8}
                alt="Animated character"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 11, "--c": 7 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img9}
                alt="Anime girl"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 6, "--c": 2 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img10}
                alt="Anime cat girl"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 4, "--c": 2 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img11}
                alt="Anime art"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 9, "--c": 2 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img12}
                alt="Anime character 4"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 3, "--c": 1 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img13}
                alt="Anime character 3"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 4, "--c": 6 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img14}
                alt="Anime character 2"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 7, "--c": 5 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img15}
                alt="Anime character 1"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 8, "--c": 7 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img16}
                alt="Anime character"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 10, "--c": 1 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img17}
                alt="Anime character"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 9, "--c": 6 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img18}
                alt="Anime character"
              />
            </div>
            <div
              className="elem m-[30px] - h-[200px] w-[200px] "
              style={{ "--r": 11, "--c": 2 }}
            >
              {" "}
              <img
                className="w-full h-full object-cover rounded shadow-[5px_5px_50px_rgba(0,0,0,10)] dark:shadow-[4px_4px_50px_rgba(255,255,255,0.5)] "
                src={img19}
                alt="Anime character"
              />
            </div>
          </div>
        </div>

        {/* About Text Section */}
        <div
          id="aboutus"
          className=" w-full h-screen z-[50] bg-gradient-to-b from-white to-[#f0cdcd] dark:from-black dark:to-zinc-800 relative flex items-center justify-center"
        >
          <div className="w-3/4 text-3xl font-regular indent-[50px] leading-[1.3]">
            <AuroraTextEffect
              text="About Us"
              fontSize="clamp(3rem, 4vw, 7rem)"
              className="bg-transparent indent-0 absolute mt-[130px]"
              colors={{
                first: "bg-blue-700",
                third: "bg-green-700",
                fourth: "bg-indigo-700",
              }}
            />

            <ScrollReveal
              containerClassName="mt-65"
              textClassName="tracking-normal whitespace-normal font-normal"
              size="md"
              baseRotation={1}
              blurStrength={1}
              staggerDelay={0.03}
              duration={0.4}
            >
              Welcome to Gameonomics, your one-stop destination for finding the
              best deals on your favorite games. Our mission is simple — to help
              gamers save time and money by comparing game prices across
              multiple platforms like Steam, Epic Games, Origin, and more.{" "}
            </ScrollReveal>

            <ScrollReveal
              containerClassName=""
              textClassName="tracking-normal whitespace-normal font-normal"
              size="md"
              baseRotation={1}
              blurStrength={1}
              staggerDelay={0.03}
              duration={0.4}
            >
              Whether you're hunting for the lowest price right now or want to
              check a game's historical best price, we've got you covered. Our
              intelligent system scans top game stores, updates prices in
              real-time, and presents you with the most budget-friendly options
              so you never miss a deal again.
            </ScrollReveal>

            <p className="mt-[75px] mb-[20px] font-semibold italic ml-[40px]">
              Level up your gaming experience — without leveling down your
              wallet.
            </p>
          </div>

        </div>
                  
        
      </div>
    </>
  );
};

export default Aboutus;
