import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import Monogram from "./Monogram";

const SOCIALS = [
  { icon: Github, href: "https://github.com/patrickmelan", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/patrick-melan",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:patrick@patrickmelan.com", label: "Email" },
];

/** Fixed left rail: monogram up top, social icons stacked beneath. */
const SideRail = () => {
  return (
    <div className="fixed left-6 top-0 z-40 hidden h-screen flex-col items-center justify-center lg:flex xl:left-10">
      <Link
        href="/"
        aria-label="Home"
        className="block text-accent transition-transform duration-200">
        <Monogram className="h-10 w-10" />
      </Link>

      <ul className="mt-8 flex flex-col items-center gap-5">
        {SOCIALS.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="block text-slate-400 transition-colors duration-200 hover:text-accent">
              <social.icon className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>

      {/* Vertical line trailing toward the bottom */}
      <div className="mt-6 h-24 w-px bg-slate-600/60" />
    </div>
  );
};

export default SideRail;
