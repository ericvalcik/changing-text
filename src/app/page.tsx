"use client";

import React, { useEffect, useState } from "react";
import { getRandomChar } from "@/utils";

const text1 = [
  "a",
  "d",
  "o",
  "r",
  "a",
  "b",
  "l",
  "e",
  " ",
  "w",
  "o",
  "r",
  "l",
  "d",
  "w",
  "i",
  "d",
  "e",
];

const text2 = [
  "n",
  "e",
  "w",
  " ",
  "c",
  "a",
  "p",
  "s",
  "u",
  "l",
  "e",
  "s",
  " ",
  "c",
  "o",
  "m",
  "i",
  "n",
  "g",
];

export default function Home() {
  const [textArr, setTextArr] = useState(
    [
      "a",
      "d",
      "o",
      "r",
      "a",
      "b",
      "l",
      "e",
      " ",
      "w",
      "o",
      "r",
      "l",
      "d",
      "w",
      "i",
      "d",
      "e",
    ].map((char) =>
      Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase(),
    ),
  );
  const [animation, setAnimation] = useState<{ phase: string; frame: number }>({
    phase: "start",
    frame: 250,
  });

  useEffect(() => {
    const animationInterval = setInterval(() => {
      const index = Math.floor(Math.random() * textArr.length);
      let newArr = textArr.map((char, i) =>
        i === index
          ? char === char.toUpperCase()
            ? char.toLowerCase()
            : char.toUpperCase()
          : char,
      );

      // animation
      if (animation.frame > 0) {
        setAnimation((prev) => ({ ...prev, frame: prev.frame - 1 }));
        setTextArr(newArr);
        return;
      }
      switch (animation.phase) {
        case "start":
          if (textArr.length > 0) {
            newArr = newArr.slice(0, newArr.length - 1);
            setAnimation({ phase: "start", frame: 5 });
          } else {
            setAnimation({ phase: "end", frame: 25 });
          }
          break;
        case "end":
          if (textArr.length < text2.length) {
            newArr = [...newArr, text2[newArr.length]];
            setAnimation({ phase: "end", frame: 5 });
          } else {
            setAnimation({ phase: "start2", frame: 250 });
          }
          break;
        case "start2":
          if (textArr.length > 0) {
            newArr = newArr.slice(0, newArr.length - 1);
            setAnimation({ phase: "start2", frame: 5 });
          } else {
            setAnimation({ phase: "end2", frame: 25 });
          }
          break;
        case "end2":
          if (textArr.length < text1.length) {
            newArr = [...newArr, text1[newArr.length]];
            setAnimation({ phase: "end2", frame: 5 });
          } else {
            setAnimation({ phase: "start", frame: 250 });
          }
          break;
      }
      setTextArr(newArr);
    }, 10);

    return () => {
      clearInterval(animationInterval);
    };
  }, [animation.frame, animation.phase, textArr]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <div className="w-[800px]">
          <h1 className="flex flex-row text-3xl font-bold">
            {Array.from(Array(15).keys()).map((index) => {
              const char =
                index < textArr.length ? textArr[index] : getRandomChar();
              return <CharBox key={index}>{char}</CharBox>;
            })}
          </h1>
          <h1 className="flex flex-row text-3xl font-bold">
            {Array.from(Array(15).keys()).map((index) => {
              const char =
                index + 15 < textArr.length
                  ? textArr[index + 15]
                  : getRandomChar();
              return <CharBox key={index}>{char}</CharBox>;
            })}
          </h1>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}

const CharBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-8">{children}</div>
);
