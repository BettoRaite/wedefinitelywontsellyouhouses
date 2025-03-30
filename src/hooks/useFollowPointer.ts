"use client";
import { useEffect, RefObject } from "react";
import { frame, SpringOptions, useSpring } from "motion/react";

export default function useFollowPointer(
  ref: RefObject<HTMLDivElement | null>,
  spring: SpringOptions = { damping: 3, stiffness: 10, restDelta: 0.001 },
) {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current;
      if (!element) return;
      frame.read(() => {
        x.set(clientX - element?.offsetLeft - element?.offsetWidth / 2);
        y.set(clientY - element?.offsetTop - element?.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return { x, y };
}
