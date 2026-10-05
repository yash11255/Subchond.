import React from "react";

interface SecondaryLinkProps {
  children: React.ReactNode;
  href?: string;
  darkBg?: boolean;
  className?: string;
}

export default function SecondaryLink({
  children,
  href = "#",
  darkBg = true,
  className = "",
}: SecondaryLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
      className={`inline-flex items-center gap-2 text-xs sm:text-sm md:text-base font-sans-clean font-bold uppercase tracking-[0.14em] transition-colors duration-300 group py-1.5 border-b border-transparent hover:border-current ${
        darkBg
          ? "text-[#F7FAF9] hover:text-[#C2410C]"
          : "text-[#0F766E] hover:text-[#C2410C]"
      } ${className}`}
    >
      <span>{children}</span>
      <span className="text-lg transform transition-transform duration-300 group-hover:translate-x-1.5">
        &rarr;
      </span>
    </a>
  );
}
