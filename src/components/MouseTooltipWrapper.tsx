"use client";
import { ReactNode, RefObject } from "react";
import { motion } from "motion/react";
import useFollowPointer from "@/hooks/useFollowPointer";

// a wrapper to decrease the number of rerenders
// such that we might do fetch in the parent and then render a list
// which will be wrapped with the tooltip
type Props = {
  children: ReactNode;
  element: ReactNode;
  ref: RefObject<HTMLDivElement | null>;
};
export function MouseTooltipWrapper({ children, element, ref }: Props) {
  const { x, y } = useFollowPointer(ref);
  return (
    <div className="relative">
      {children}
      <motion.div
        ref={ref}
        style={{ x, y }}
        className="fixed z-50 pointer-events-none"
      >
        {element}
      </motion.div>
    </div>
  );
}
