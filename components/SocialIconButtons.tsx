type SocialPlatform = "github" | "linkedin" | "instagram";

export type SocialLinks = Partial<Record<SocialPlatform, string>>;

type SocialIconButtonsProps = {
  className?: string;
  links?: SocialLinks;
};

const socialButtons: ReadonlyArray<{
  label: string;
  platform: SocialPlatform;
}> = [
  { label: "GitHub", platform: "github" },
  { label: "LinkedIn", platform: "linkedin" },
  { label: "Instagram", platform: "instagram" },
];

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "github") {
    return (
      <svg aria-hidden="true" className="size-[17px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.86c-2.78.62-3.37-1.2-3.37-1.2-.46-1.2-1.12-1.5-1.12-1.5-.92-.65.07-.64.07-.64 1.01.08 1.55 1.07 1.55 1.07.9 1.58 2.35 1.12 2.92.86.1-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.28 9.28 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.48A10 10 0 0 0 12 2.2Z" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg aria-hidden="true" className="size-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="6.5" cy="6.5" fill="currentColor" r="1.25" stroke="none" />
        <path d="M5.5 10v8M10 18v-4.5a3.5 3.5 0 0 1 7 0V18M10 10v8" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect height="15" rx="4" width="15" x="4.5" y="4.5" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" strokeWidth="1.8" />
      <circle cx="16.7" cy="7.4" fill="currentColor" r="0.9" stroke="none" />
    </svg>
  );
}

const buttonClassName =
  "grid size-10 place-items-center rounded-full border border-fg text-fg transition-colors hover:bg-fg hover:text-bg";

export function SocialIconButtons({ className, links }: SocialIconButtonsProps) {
  return (
    <div className={`flex gap-3 ${className ?? ""}`.trim()}>
      {socialButtons.map(({ label, platform }) => {
        const href = links?.[platform];

        return href ? (
          <a
            aria-label={label}
            className={buttonClassName}
            href={href}
            key={platform}
            rel="noreferrer"
            target="_blank"
          >
            <SocialIcon platform={platform} />
          </a>
        ) : (
          <button aria-label={label} className={buttonClassName} key={platform} type="button">
            <SocialIcon platform={platform} />
          </button>
        );
      })}
    </div>
  );
}
