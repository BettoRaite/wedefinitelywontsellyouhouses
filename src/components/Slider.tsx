"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";

type SliderItemRendererProps = {
  item: number;
  isActive: boolean;
  chars: number;
};

type Props = {
  values?: number[];
  minValue: number;
  maxValue: number;
  initialValue: number;
  calculateVisibleItems?: (currentValue: number) => number[];
  renderItem?: (props: SliderItemRendererProps) => React.ReactNode;
  buttonIcons?: {
    prev?: React.ReactNode;
    next?: React.ReactNode;
  };
  buttonClassNames?: {
    base?: string;
    prev?: string;
    next?: string;
  };
  itemClassNames?: {
    base?: string;
    active?: string;
    inactive?: string;
  };
  onChange?: (currentValue: number) => void;
  isReverse?: boolean;
};

function Slider({
  values,
  calculateVisibleItems,
  minValue,
  maxValue,
  initialValue,
  renderItem,
  buttonIcons = {
    prev: (
      <Image
        src="/icons/arrow.svg"
        width={15}
        height={15}
        alt="previous"
        className="rotate-180 select-none"
      />
    ),
    next: (
      <Image
        src="/icons/arrow.svg"
        width={15}
        height={15}
        alt="next"
        className="select-none"
      />
    ),
  },
  buttonClassNames = {
    base: "py-3 shadow-inner rounded-full px-5 ",
  },
  itemClassNames = {
    base: "font-bold rounded-full text-xl select-none",
    active: "bg-gold p-5 px-7",
    inactive: "text-medium-grey shadow-inner",
  },
  onChange,
  isReverse,
}: Props) {
  const [sliderState, setSliderState] = useState({
    value: initialValue,
    direction: "",
  });

  const visibleItems = useMemo(() => {
    return calculateVisibleItems?.(sliderState.value) ?? values ?? [];
  }, [calculateVisibleItems, values, sliderState.value]);

  const isPrevDisabled = isReverse
    ? sliderState.value >= maxValue
    : sliderState.value <= minValue;

  const isNextDisabled = isReverse
    ? sliderState.value <= minValue
    : sliderState.value >= maxValue;

  const handleSlide = (direction: "prev" | "next") => {
    const step = isReverse ? -1 : 1;
    if (direction === "prev" && !isPrevDisabled) {
      setSliderState({
        value: sliderState.value - step,
        direction,
      });
      onChange?.(sliderState.value - step);
    }
    if (direction === "next" && !isNextDisabled) {
      setSliderState({
        value: sliderState.value + step,
        direction,
      });
      onChange?.(sliderState.value + step);
    }
  };

  const defaultRenderItem = ({
    item,
    isActive,
    chars,
  }: SliderItemRendererProps) => (
    <motion.div
      animate={{ scale: [0, 1] }}
      exit={{ scale: [1, 2, 0.5], opacity: [1, 0] }}
      key={item}
      className={clsx(
        itemClassNames.base,
        isActive ? itemClassNames.active : itemClassNames.inactive,
        {
          "p-4": chars === 2,
          "p-4 px-6": chars < 2,
          hidden: Math.abs(item - sliderState.value) > 1,
        },
      )}
    >
      {item}
    </motion.div>
  );

  return (
    <div className="flex items-center justify-end">
      <div className="flex flex-col gap-4 items-center">
        <motion.button
          onClick={() => handleSlide("prev")}
          className={clsx(
            buttonClassNames.base,
            buttonClassNames.prev,
            isPrevDisabled && "opacity-50 cursor-not-allowed ",
          )}
          whileHover={!isPrevDisabled ? { scale: 1.1 } : {}}
          whileTap={!isPrevDisabled ? { scale: 0.6 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          disabled={isPrevDisabled}
        >
          {buttonIcons.prev}
        </motion.button>

        <AnimatePresence>
          <div className="flex flex-col gap-4 items-center">
            {visibleItems.map((item) => {
              const chars = String(item).length;
              const isActive = sliderState.value === item;

              return renderItem
                ? renderItem({ item, isActive, chars })
                : defaultRenderItem({ item, isActive, chars });
            })}
          </div>
        </AnimatePresence>

        <motion.button
          onClick={() => handleSlide("next")}
          className={clsx(
            buttonClassNames.base,
            buttonClassNames.next,
            isNextDisabled && "opacity-50 cursor-not-allowed",
          )}
          whileHover={!isNextDisabled ? { scale: 1.1 } : {}}
          whileTap={!isNextDisabled ? { scale: 0.6 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          disabled={isNextDisabled}
        >
          {buttonIcons.next}
        </motion.button>
      </div>
    </div>
  );
}

export default Slider;
