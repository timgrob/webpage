export type SiteLink = {
  href: string;
  label: string;
};

export const HOME_HREF = "/";

export const NAV_LINKS: SiteLink[] = [
  { href: HOME_HREF, label: "home" },
  { href: "/experience", label: "experience" },
  { href: "/research", label: "research" },
  { href: "/projects", label: "projects" },
  { href: "/code", label: "code" },
  { href: "/contact", label: "contact" },
];

export const SOCIAL_LINKS: SiteLink[] = [
  { href: "https://www.linkedin.com/in/tim-grob-00616990/", label: "linkedin" },
  { href: "https://github.com/timgrob", label: "github" },
  {
    href: "https://www.youtube.com/channel/UCgKaxbCao2Gb5t3_vq-FNrw",
    label: "youtube",
  },
];
