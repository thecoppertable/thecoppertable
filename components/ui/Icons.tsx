import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** Simple line icons. Hidden from screen readers (decorative). */
function Icon({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>
);
export const CloseIcon = (p: IconProps) => (
  <Icon {...p}><path d="M6 6l12 12M18 6L6 18" /></Icon>
);
export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
);
export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}><path d="M6 9l6 6 6-6" /></Icon>
);
export const CalendarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" />
  </Icon>
);
export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </Icon>
);
export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </Icon>
);
export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Icon>
);
export const PauseIcon = (p: IconProps) => (
  <Icon {...p}><path d="M9 6v12M15 6v12" /></Icon>
);
export const PlayIcon = (p: IconProps) => (
  <Icon {...p}><path d="M8 5.5v13l10-6.5z" /></Icon>
);