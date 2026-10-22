type Props = {
  label: string;
  title: React.ReactNode;
  light?: boolean;
  className?: string;
};

export function SectionHeading({ label, title, light = false, className = "" }: Props) {
  return (
    <div className={className}>
      <p className={`text-xs uppercase ${light ? "text-white" : "text-black"}`}>{label}</p>
      <h2 className={`mt-6 text-3xl leading-tight tracking-tight md:text-4xl ${light ? "text-white" : "text-black"}`}>{title}</h2>
    </div>
  );
}
