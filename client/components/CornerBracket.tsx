export type CornerBracketProps = {
  size?: number;
  className?: string;
};

export function CornerBracket({
  size = 40,
  className,
}: CornerBracketProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 48 48"
      width={size}
    >
      <path
        d="M17 7H7v10M31 7h10v10M41 31v10H31M17 41H7V31"
        stroke="white"
        strokeDasharray="2 3"
        strokeLinecap="square"
        strokeWidth="1.5"
      />
      <circle cx="24" cy="24" fill="white" r="2" />
    </svg>
  );
}
