"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FirstDealScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const card = cardRef.current;
    const shadow = shadowRef.current;
    const text = textRef.current;

    if (!scene || !card || !shadow || !text) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(card, {
          x: 0,
          y: "-16vh",
          z: 0,
          rotateX: 0,
          rotateY: 180,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
        });
        gsap.set(shadow, { opacity: 0.5, scale: 1 });
        gsap.set(text, { opacity: 1, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          const reach = isMobile
            ? { x: "-56vw", y: "44vh", exitX: "34vw", exitY: "-32vh" }
            : { x: "-53vw", y: "42vh", exitX: "56vw", exitY: "-55vh" };

          const depth = isMobile
            ? { z: -70, rotX: -6, rotY: -16, rotZ: -8 }
            : { z: -180, rotX: -18, rotY: -42, rotZ: -22 };

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });

          tl.fromTo(
            card,
            {
              x: reach.x,
              y: reach.y,
              z: depth.z,
              rotateX: depth.rotX,
              rotateY: depth.rotY,
              rotateZ: depth.rotZ,
              scale: isMobile ? 0.62 : 0.5,
              opacity: 1,
            },
            {
              x: isMobile ? "-14vw" : "-22vw",
              y: isMobile ? "8vh" : "14vh",
              z: depth.z * 0.35,
              rotateX: depth.rotX * 0.4,
              rotateY: depth.rotY * 0.45,
              rotateZ: depth.rotZ * 0.45,
              scale: isMobile ? 0.86 : 0.82,
              opacity: 1,
              ease: "power2.out",
              duration: 25,
            },
            0
          )
            .fromTo(
              shadow,
              { opacity: 0, scale: 0.6 },
              {
                opacity: 0.3,
                scale: 0.78,
                duration: 25,
                ease: "power2.out",
              },
              0
            )
            .to(
              card,
              {
                x: isMobile ? "-3vw" : "-4vw",
                y: 0,
                z: 0,
                rotateX: depth.rotX * 0.1,
                rotateY: depth.rotY * 0.14,
                rotateZ: depth.rotZ * 0.1,
                scale: 1,
                ease: "power3.out",
                duration: 20,
              },
              25
            )
            .to(
              shadow,
              {
                opacity: 0.66,
                scale: 0.98,
                duration: 20,
                ease: "power3.out",
              },
              25
            )
            .to(
              card,
              {
                rotateX: 0,
                rotateY: 180,
                rotateZ: 0,
                x: 0,
                y: isMobile ? "-18vh" : "-14vh",
                scale: isMobile ? 1.06 : 1.1,
                ease: "power2.inOut",
                duration: 15,
              },
              45
            )
            .to(
              text,
              {
                opacity: 1,
                y: 0,
                duration: 17,
                ease: "power2.out",
              },
              58
            )
            .to(
              card,
              {
                scale: isMobile ? 1.1 : 1.18,
                z: isMobile ? 20 : 50,
                duration: 10,
                ease: "power1.out",
              },
              75
            )
            .to(
              shadow,
              {
                opacity: 0.8,
                scale: 1.12,
                duration: 10,
                ease: "power1.out",
              },
              75
            )
            .to(
              card,
              {
                x: reach.exitX,
                y: reach.exitY,
                z: depth.z * 0.3,
                rotateZ: isMobile ? 10 : 18,
                rotateY: 180 + (isMobile ? 50 : 80),
                scale: isMobile ? 0.68 : 0.6,
                opacity: 0,
                ease: "power2.in",
                duration: 15,
              },
              85
            )
            .to(
              shadow,
              {
                opacity: 0,
                scale: 0.6,
                duration: 15,
                ease: "power2.in",
              },
              85
            )
            .to(
              text,
              {
                opacity: 0,
                y: -18,
                duration: 14,
                ease: "power2.in",
              },
              82
            );

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      );

      return () => mm.revert();
    }, scene);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="first-deal"
      ref={sceneRef}
      className="relative h-[185vh] bg-black md:h-[220vh]"
    >
      <div
        ref={stageRef}
        className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden px-6 [perspective:1600px] [perspective-origin:50%_45%]"
      >
        <div className="firstdeal-backdrop absolute inset-0" />
        <div className="firstdeal-vignette absolute inset-0" />
        <div className="firstdeal-noise absolute inset-0" />

        <div
          ref={shadowRef}
          className="card-shadow absolute left-1/2 top-1/2"
        />

        <div className="absolute left-1/2 top-1/2 [transform:translate3d(-50%,-50%,0)]">
          <div
            ref={cardRef}
            className="card-stage relative will-change-transform"
          >
            <div className="card-face card-back">
              <Image
                src="/cards/back-card.png"
                alt="Dorso carta da poker premium"
                fill
                sizes="(max-width: 767px) 62vw, 280px"
                className="card-back-image object-contain"
              />
              <div className="card-back-mark" aria-hidden="true" />
              <div className="card-back-logo">
                <Image
                  src="/ihc-logo.png"
                  alt="Ischia Hold'Em Club"
                  fill
                  sizes="(max-width: 767px) 36vw, 165px"
                  className="object-contain"
                />
              </div>
              <div className="card-sheen" />
            </div>

            <div className="card-face card-front">
              <Image
                src="/cards/front-card.png"
                alt="King of Hearts playing card"
                fill
                sizes="(max-width: 767px) 62vw, 280px"
                className="card-front-image object-contain"
              />
              <div className="card-front-vignette" />
              <div className="card-sheen" />
            </div>
          </div>
        </div>

        <div
          ref={textRef}
          className="absolute inset-x-0 bottom-[7vh] z-10 flex translate-y-4 flex-col items-center px-4 text-center opacity-0 md:bottom-[9vh]"
        >
          <div className="firstdeal-text-backdrop absolute inset-x-[-12%] inset-y-[-34%] -z-10" />
          <h2 className="firstdeal-headline max-w-[22rem] text-balance text-2xl font-bold leading-[1.08] tracking-[0.03em] sm:max-w-xl sm:text-4xl md:max-w-3xl md:text-6xl">
            THE NIGHT STARTS BEFORE THE FIRST HAND.
          </h2>
          <p className="mt-5 max-w-md text-[0.95rem] font-light tracking-[0.035em] text-[#f3ead9]/75 md:text-lg">
            La serata comincia prima ancora della prima mano.
          </p>
        </div>
      </div>
    </section>
  );
}
