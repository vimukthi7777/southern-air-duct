import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/** Figma layout guide: 12 columns, 80px margin, 20px gutter (shrinks on small screens). */
export function Container({
  children,
  as: Tag = "div",
  className = "",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto grid w-full grid-cols-4 gap-x-5 px-5 md:grid-cols-12 md:px-10 lg:px-20 ${className}`}
    >
      {children}
    </Tag>
  );
}
