"use client";
import { useRouter } from "next/navigation";
import { BiChevronUp } from "react-icons/bi";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface Props extends ComponentPropsWithoutRef<"button"> {
  fallbackUrl?: string;
  icon?: ReactNode;
  text?: string;
  iconClassName?: string;
  textClassName?: string;
}

function BackButton({
  fallbackUrl,
  icon = (
    <BiChevronUp className="-rotate-90 text-3xl text-some-grey opacity-70" />
  ),
  text = "Назад",
  iconClassName,
  textClassName = "uppercase font-[450]",
  className = "text-some-grey group flex items-center gap-2 hover:gap-3 transition-all duration-200 ease-in-out",
  ...buttonProps
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else if (fallbackUrl) {
      router.push(fallbackUrl);
    }
  };

  return (
    <button onClick={handleClick} className={className} {...buttonProps}>
      {icon && <span className={iconClassName}>{icon}</span>}
      {text && <span className={textClassName}>{text}</span>}
    </button>
  );
}

export default BackButton;
