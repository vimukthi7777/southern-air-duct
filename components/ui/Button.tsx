"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "@/lib/gsap";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  /** solid: brand bg / white text → white bg / brand text. outline: transparent → brand fill. */
  variant?: "solid" | "outline";
  /** show the round arrow chip (Get a Quote) */
  arrow?: boolean;
  /** icon shown to the left of the label, no chip */
  icon?: ReactNode;
  className?: string;
};

const COLORS = {
  solid: {
    base: { backgroundColor: "#0B45B5", color: "#ffffff" },
    hover: { backgroundColor: "#ffffff", color: "#0B45B5" },
  },
  outline: {
    base: { backgroundColor: "rgba(255,255,255,0)", color: "#6b7280" },
    hover: { backgroundColor: "#0B45B5", color: "#ffffff" },
  },
} as const;

export function Button({
  children,
  href,
  type = "button",
  onClick,
  variant = "solid",
  arrow = false,
  icon,
  className = "",
}: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const colors = COLORS[variant];

  const play = (to: "hover" | "base") =>
    gsap.to(ref.current, { ...colors[to], duration: 0.35, ease: "power2.out", overwrite: "auto" });

  const shared = {
    className: `inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium ${
      variant === "outline" ? "border border-gray-300" : ""
    } ${className}`,
    style: colors.base,
    onMouseEnter: () => play("hover"),
    onMouseLeave: () => play("base"),
    onClick,
    onFocus: () => play("hover"),
    onBlur: () => play("base"),
  };

const content = (    <>      {icon}      <span>{children}</span>      {arrow && (        <span className="grid size-6 place-items-center rounded-full bg-white/30">          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />          </svg>        </span>      )}    </>  );

  return href ? (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...shared}
    >
      {content}
    </a>
  ) : (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} {...shared}>
      {content}
    </button>
  );
}
