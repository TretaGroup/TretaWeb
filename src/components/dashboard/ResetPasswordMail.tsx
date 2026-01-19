"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const slides = [
  {
    img: "/images/login/slide-1.svg",
    title: "Reset Your Password",
    text: "Enter your email to receive a reset link.",
  },
  {
    img: "/images/login/slide-2.svg",
    title: "Create New Password",
    text: "Choose a strong password to keep your account secure.",
  },
  {
    img: "/images/login/slide-3.svg",
    title: "Confirm & Login",
    text: "Your password has been reset. You can now login.",
  },
];

export default function ResetPasswordMailPage() {
  const [email, setEmail] = useState("");
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reversed, setReversed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => nextSlide(), 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const nextSlide = () => {
    setFade(true);
    setTimeout(() => {
      setCurrent((prev) => {
        if (prev === slides.length - 1) {
          setReversed(true);
          return prev - 1;
        }
        return reversed ? prev - 1 : prev + 1;
      });
      setFade(false);
    }, 250);
  };

  const prevSlide = () => {
    setFade(true);
    setTimeout(() => {
      setCurrent((prev) => {
        if (prev === 0) {
          setReversed(false);
          return 1;
        }
        return reversed ? prev + 1 : prev - 1;
      });
      setFade(false);
    }, 250);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => nextSlide(), 4500);
    return () => clearInterval(timer);
  }, [paused, reversed]);

  // swipe handling
  const onTouchStart = (e: React.TouchEvent) =>
    (touchStartX.current = e.targetTouches[0].clientX);

  const onTouchMove = (e: React.TouchEvent) =>
    (touchEndX.current = e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide(); // left swipe
    if (distance < -50) prevSlide(); // right swipe
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="min-h-screen w-full flex bg-linear-to-br from-white via-blue-50 to-blue-200 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">
        {/* LEFT RESET FORM */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-semibold mb-2">Reset Password</h2>
            <p className="text-gray-600 mb-6">Enter your email to receive a password reset link.</p>
            <form className="space-y-4" onSubmit={e => {e.preventDefault(); window.location.href = '/dashboard/reset-password';}}>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-blue-600 outline-none"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="cursor-pointer w-full bg-linear-to-r from-indigo-500 to-blue-600 text-white py-3 rounded-lg font-medium shadow-lg">
                Send
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT CAROUSEL */}
        <div
          className="flex-1 flex items-center justify-center p-8"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="w-full max-w-2xl bg-white/50 backdrop-blur-2xl border border-white/60 rounded-3xl p-12 shadow-2xl text-center relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* SLIDES */}
            <div className="relative h-105 perspective-distant">
              {slides.map((slide, i) => {
                const isActive = i === current;

                return (
                  <div
                    key={i}
                    className={`
                      absolute inset-0 flex flex-col items-center justify-center
                      transition-all duration-700 ease-[cubic-bezier(.17,.67,.27,1.27)]
                    `}
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `rotateY(${isActive ? 0 : i < current ? -90 : 90}deg) scale(${isActive ? 1 : 0.92})`,
                      transformOrigin: "center",
                    }}
                  >
                    <img
                      src={slide.img}
                      alt=""
                      className="w-80 mx-auto select-none pointer-events-none drop-shadow-xl transition-transform duration-700"
                    />
                    <h2 className="text-3xl font-bold mt-6 text-blue-900 tracking-wide">
                      {slide.title}
                    </h2>
                    <p className="text-gray-700 mt-3 max-w-md mx-auto text-lg">
                      {slide.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* PROGRESS BAR */}
            <div className="flex w-full gap-3 mt-10 justify-center items-center">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 max-w-12.5 h-2 rounded-full bg-gray-300 overflow-hidden cursor-pointer"
                  onClick={() => setCurrent(i)}
                >
                  <div
                    className={`
                      h-full transition-all duration-4500
                      ${current === i ? "bg-blue-600" : "bg-transparent"}
                    `}
                    style={{
                      width: current === i ? "100%" : "0%",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
