"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const chipLabels = ["IHC", "PLAY", "IHC", "PLAY"];

export default function ChipDropScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const chipsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const scene = sceneRef.current;
    const chips = chipsRef.current.filter(Boolean) as HTMLDivElement[];
    const lines = linesRef.current.filter(Boolean) as HTMLDivElement[];

    if (!scene || chips.length !== 4 || lines.length !== 4) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        chips.forEach((chip, index) => {
          gsap.set(chip, {
            x: (index - 1.5) * 4,
            y: -index * 13,
            rotateX: 68,
            rotateZ: index % 2 === 0 ? -2 : 2,
            opacity: 1,
            scale: 1,
          });
        });
        lines.forEach((line, index) => {
          gsap.set(line, { opacity: index === 3 ? 1 : 0, y: 0 });
        });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          mobile: "(max-width: 767px)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          const { mobile } = context.conditions as { mobile: boolean };

          chips.forEach((chip, index) => {
            gsap.set(chip, {
              x: (index - 1.5) * (mobile ? 3 : 5),
              y: mobile ? "-54vh" : "-62vh",
              rotateX: mobile ? 66 : 72,
              rotateY: mobile ? -8 + index * 4 : -12 + index * 6,
              rotateZ: index % 2 === 0 ? -12 : 10,
              scale: mobile ? 0.9 : 0.82,
              opacity: 0,
            });
          });

          lines.forEach((line) => gsap.set(line, { opacity: 0, y: 18 }));

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.55,
            },
          });

          const drop = (
            chip: HTMLDivElement,
            start: number,
            index: number,
            finalY: number
          ) => {
            tl.to(
              chip,
              {
                opacity: 1,
                y: finalY - (mobile ? 25 : 34),
                rotateX: mobile ? 62 : 68,
                rotateY: index % 2 === 0 ? -3 : 3,
                rotateZ: index % 2 === 0 ? -4 : 4,
                scale: 1,
                duration: 5,
                ease: "power2.in",
              },
              start
            )
              .to(
                chip,
                {
                  y: finalY,
                  rotateX: mobile ? 72 : 76,
                  rotateY: 0,
                  rotateZ: index % 2 === 0 ? -1.2 : 1.2,
                  duration: 2.2,
                  ease: "back.out(1.7)",
                },
                start + 5
              )
              .to(
                chip,
                {
                  y: finalY - (mobile ? 5 : 7),
                  duration: 0.9,
                  ease: "power1.out",
                },
                start + 7.2
              )
              .to(
                chip,
                {
                  y: finalY,
                  duration: 1,
                  ease: "bounce.out",
                },
                start + 8.1
              );
          };

          drop(chips[0], 4, 0, mobile ? 44 : 50);
          drop(chips[1], 21, 1, mobile ? 31 : 34);
          drop(chips[2], 40, 2, mobile ? 18 : 18);
          drop(chips[3], 60, 3, mobile ? 5 : 2);

          const reveal = (line: HTMLDivElement, start: number, end: number) => {
            tl.to(
              line,
              {
                opacity: 1,
                y: 0,
                duration: 5,
                ease: "power2.out",
              },
              start
            ).to(
              line,
              {
                opacity: 0,
                y: -10,
                duration: 4,
                ease: "power2.in",
              },
              end
            );
          };

          reveal(lines[0], 12, 27);
          reveal(lines[1], 30, 46);
          reveal(lines[2], 49, 66);

          tl.to(
            lines[3],
            {
              opacity: 1,
              y: 0,
              duration: 8,
              ease: "power2.out",
            },
            70
          )
            .to(
              chips,
              {
                y: (index) =>
                  (mobile ? 5 : 2) -
                  (3 - index) * (mobile ? 13 : 16) -
                  (mobile ? 10 : 14),
                scale: mobile ? 1.05 : 1.08,
                duration: 8,
                ease: "power2.out",
              },
              72
            )
            .to(
              [lines[3], ...chips],
              {
                opacity: 0,
                duration: 9,
                ease: "power2.in",
              },
              91
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
      id="chip-drop"
      ref={sceneRef}
      className="relative h-[195vh] bg-black md:h-[220vh]"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden px-6">
        <div className="chipdrop-backdrop absolute inset-0" />
        <div className="chipdrop-vignette absolute inset-0" />
        <div className="chipdrop-noise absolute inset-0" />

        <div className="absolute left-1/2 top-[45%] h-[34vh] w-[min(76vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#d7b56d]/10 bg-[#07110d]/35 shadow-[0_30px_90px_rgba(0,0,0,0.75)] [transform:translate3d(-50%,-50%,0)_rotateX(67deg)]" />

        <div className="absolute left-1/2 top-[45%] z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 md:h-48 md:w-48">
          {chipLabels.map((label, index) => (
            <div
              key={`${label}-${index}`}
              ref={(element) => {
                chipsRef.current[index] = element;
              }}
              className="poker-chip absolute left-1/2 top-1/2"
              aria-hidden="true"
            >
              <div className="poker-chip-edge" />
              <div className="poker-chip-face">
                <div className="poker-chip-ring" />
                <div className="poker-chip-center">
                  <span>{label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-[12vh] z-20 flex justify-center px-6 text-center md:bottom-[10vh]">
          <div className="relative min-h-28 w-full max-w-4xl">
            <div
              ref={(element) => {
                linesRef.current[0] = element;
              }}
              className="chipdrop-line absolute inset-x-0 top-0 opacity-0"
            >
              <p className="chipdrop-kicker">ONE CHIP.</p>
              <p className="chipdrop-sub">Una fiche.</p>
            </div>

            <div
              ref={(element) => {
                linesRef.current[1] = element;
              }}
              className="chipdrop-line absolute inset-x-0 top-0 opacity-0"
            >
              <p className="chipdrop-kicker">ONE DECISION.</p>
              <p className="chipdrop-sub">Una decisione.</p>
            </div>

            <div
              ref={(element) => {
                linesRef.current[2] = element;
              }}
              className="chipdrop-line absolute inset-x-0 top-0 opacity-0"
            >
              <p className="chipdrop-kicker">ONE NIGHT.</p>
              <p className="chipdrop-sub">Una notte.</p>
            </div>

            <div
              ref={(element) => {
                linesRef.current[3] = element;
              }}
              className="chipdrop-line absolute inset-x-0 top-0 opacity-0"
            >
              <p className="chipdrop-finale">MAKE IT COUNT.</p>
              <p className="chipdrop-sub mt-3">Falla contare.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
