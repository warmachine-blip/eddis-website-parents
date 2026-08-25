const ICONS = {
  pulse: { paths: ["M22 12h-4l-3 9L9 3l-3 9H2"] },
  shield: {
    paths: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", "m9 12 2 2 4-4"],
  },
  bolt: { paths: ["M13 2 4 13h7l-1 9 9-11h-7Z"] },
  alert: {
    paths: [
      "M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.71 3.86a2 2 0 0 0-3.42 0Z",
    ],
  },
  cap: {
    paths: [
      "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      "M22 10v6",
      "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
    ],
  },
  award: {
    paths: ["M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"],
    circle: [12, 8, 6] as [number, number, number],
  },
  stethoscope: {
    paths: ["M6 2v6a3 3 0 0 0 6 0V2", "M9 8v3a6 6 0 0 0 12 0v-2"],
    circle: [21, 9, 1.5] as [number, number, number],
  },
  bone: {
    paths: [
      "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z",
    ],
  },
  spine: { paths: ["M12 3v18", "M8 7h8", "M8 12h8", "M8 17h8"] },
  split: {
    paths: ["M12 2a5 5 0 0 1 0 10 5 5 0 0 0 0 10"],
    circle: [12, 12, 10] as [number, number, number],
  },
  sparkles: {
    paths: [
      "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
    ],
  },
  droplet: { paths: ["M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"] },
} as const;

const TONES = {
  cyan: "bg-cyan-50 text-cyan-700",
  brass: "bg-brass/10 text-brass-text",
  navy: "bg-line text-navy-deep",
  dark: "bg-navy-deep text-off-white",
  brassSolid: "bg-brass text-navy-deep",
} as const;

const HOVER_TONES = {
  cyan: "group-hover:bg-cyan-100",
  brass: "group-hover:bg-brass/20",
  navy: "group-hover:bg-line/70",
  dark: "group-hover:bg-navy",
  brassSolid: "group-hover:bg-brass-light",
} as const;

export type IconName = keyof typeof ICONS;
type Tone = keyof typeof TONES;

export function IconBadge({
  icon,
  tone = "brass",
  hover = false,
}: {
  icon: IconName;
  tone?: Tone;
  hover?: boolean;
}) {
  const def = ICONS[icon];
  return (
    <span
      className={`grid h-11 w-11 place-items-center rounded-xl transition-colors ${TONES[tone]} ${hover ? HOVER_TONES[tone] : ""}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        {"circle" in def && def.circle && (
          <circle cx={def.circle[0]} cy={def.circle[1]} r={def.circle[2]} />
        )}
        {def.paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </span>
  );
}

export function CheckBullet({ tone = "brass" }: { tone?: Tone }) {
  const dotTone = tone === "cyan" ? "bg-cyan-100 text-cyan-700" : tone === "navy" ? "bg-line text-navy-deep" : "bg-brass/15 text-brass-text";
  return (
    <span className={`mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full ${dotTone}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-2.5 w-2.5">
        <path d="m20 6-11 11-5-5" />
      </svg>
    </span>
  );
}

export function InfoCard({
  icon,
  tone = "brass",
  title,
  items,
}: {
  icon: IconName;
  tone?: Tone;
  title: string;
  items: string[];
}) {
  return (
    <div className="h-full rounded-2xl border border-card-border bg-white p-7 shadow-[0_1px_3px_rgba(26,39,64,0.06),0_8px_24px_-4px_rgba(26,39,64,0.08)] transition-all hover:-translate-y-0.5 hover:border-brass-light hover:shadow-[0_4px_8px_rgba(26,39,64,0.06),0_20px_40px_-8px_rgba(26,39,64,0.12)]">
      <IconBadge icon={icon} tone={tone} />
      <h3 className="mt-6 font-serif text-xl leading-tight text-navy-900">{title}</h3>
      <ul className="mt-5 grid gap-2.5 text-sm text-navy-600">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 leading-relaxed">
            <CheckBullet tone={tone} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
