"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import FirstDealScene from "./components/FirstDealScene";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleEnterTheNight = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("first-deal");
    if (!target) return;

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12, letterSpacing: "0.55em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.35em",
          duration: 1.2,
        }
      )
        .fromTo(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.88,
            y: 30,
            filter: "blur(14px)",
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 2.2,
          },
          "-=0.55"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
          },
          "-=0.75"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.55"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const logo = logoRef.current;

    if (!hero || !logo) return;

    const onMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 768) return;

      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      gsap.to(logo, {
        x: x * 14,
        y: y * 10,
        rotationY: x * 2.5,
        rotationX: -y * 2,
        duration: 1.4,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <main className="bg-black text-white">
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black px-6"
      >
        <div className="hero-glow absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-noise absolute inset-0" />

        <div className="relative z-10 flex w-full max-w-6xl -translate-y-[3vh] flex-col items-center text-center md:-translate-y-[5vh]">
          <p
            ref={eyebrowRef}
            className="mb-4 text-[10px] font-medium tracking-[0.35em] text-[#d7b56d] md:text-xs"
          >
            ISCHIA · ITALY
          </p>

          <div
            ref={logoRef}
            className="relative mt-6 mb-4 ml-[-1.6vw] w-[88vw] max-w-[850px] will-change-transform [transform-style:preserve-3d] md:mt-9 md:mb-5 md:ml-[-17px]"
          >
            <div className="logo-aura absolute inset-[12%] -z-10 rounded-full" />

            <Image
              src="/ihc-logo.png"
              alt="Ischia Hold'Em Club"
              width={1400}
              height={900}
              priority
              className="h-auto w-full object-contain"
            />

            <div className="logo-shine pointer-events-none absolute inset-0" />
          </div>

          <div ref={subtitleRef}>
            <p className="mx-auto max-w-md text-base font-light tracking-[0.04em] text-white/70 md:text-lg">
              Più di una partita. Una serata da vivere.
            </p>
          </div>

          <div ref={ctaRef} className="mt-8 md:mt-9">
            <a
              href="#first-deal"
              onClick={handleEnterTheNight}
              className="group inline-flex flex-col items-center gap-4 text-xs font-semibold tracking-[0.32em] text-[#dcb877] transition-colors duration-700 ease-out hover:text-[#f5dca0] md:text-sm"
            >
              <span className="relative pb-1.5">
                ENTER THE NIGHT
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-75 bg-gradient-to-r from-transparent via-[#f0c978] to-transparent opacity-50 shadow-[0_0_6px_rgba(240,201,120,0)] transition-all duration-700 ease-out group-hover:scale-x-100 group-hover:opacity-100 group-hover:shadow-[0_0_6px_rgba(240,201,120,0.55)]" />
              </span>
              <span className="text-[9px] normal-case tracking-[0.12em] text-white/35">
                Entra nell&apos;atmosfera
              </span>
              <span
                aria-hidden="true"
                className="scroll-line mt-1 block h-11 w-px bg-gradient-to-b from-[#f0c978] to-transparent transition-colors duration-700 group-hover:from-[#f5dca0]"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 16 8"
                className="scroll-arrow -mt-1 h-2.5 w-5 text-[#f0c978] transition-colors duration-700 group-hover:text-[#f5dca0]"
              >
                <path
                  d="M1 1L8 7L15 1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="absolute left-5 top-5 z-20 text-[9px] tracking-[0.3em] text-white/30 md:left-8 md:top-8">
          IHC
        </div>

        <button
          type="button"
          className="absolute right-5 top-5 z-20 text-[9px] tracking-[0.25em] text-white/35 transition-colors hover:text-[#d7b56d] md:right-8 md:top-8"
        >
          MENU +
        </button>
      </section>

      <FirstDealScene />
    </main>
  );
}