import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function PrimaryButton({
  children,
  href = "#assess",
  onClick,
  className = "",
}: PrimaryButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick();
      return;
    }
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(target);
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-3 bg-[#C2410C] hover:bg-[#EA580C] text-white text-xs sm:text-sm md:text-base font-sans-clean font-bold uppercase tracking-[0.14em] px-7 py-4 rounded-lg transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-[1.02] border border-[#EA580C]/30 ${className}`}
    >
      <span>{children}</span>
      <span className="text-lg transform transition-transform duration-300 group-hover:translate-x-2">
        &rarr;
      </span>
    </a>
  );
}
