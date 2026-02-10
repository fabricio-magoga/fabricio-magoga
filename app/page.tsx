"use client";

import { Dithering } from "@paper-design/shaders-react";
import { useState } from "react";
import Link from "next/link";

function ThemeToggle({
  isDarkMode,
  onToggle,
}: {
  isDarkMode: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-full transition-colors ${
        isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
      }`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function SectionEntry({
  date,
  title,
  org,
  href,
}: {
  date: string;
  title: string;
  org?: string;
  href?: string;
}) {
  const titleContent = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      {title}
    </a>
  ) : (
    <span>{title}</span>
  );

  return (
    <div className="flex items-baseline whitespace-nowrap overflow-hidden">
      <span className="text-xs sm:text-sm opacity-60 mx-4 shrink-0">
        {date}
      </span>
      <span className="text-xs sm:text-sm mx-1 sm:mx-2 truncate">
        {titleContent}
      </span>
      {org && (
        <span className="text-xs sm:text-sm opacity-60 shrink-0">
          {"@ " + org}
        </span>
      )}
    </div>
  );
}

function FooterLinks() {
  const links = [
    { label: "Blog", href: "/blog" },
    {
      label: "Github",
      href: "https://github.com/fabricio-magoga",
      external: true,
    },
    {
      label: "Email",
      href: "mailto:contato.fabriciomagoga@gmail.com",
      external: true,
    },
    {
      label: "Linkedin",
      href: "https://www.linkedin.com/in/fabriciomagoga/",
      external: true,
    },
  ];

  return (
    <nav aria-label="Social links">
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:text-base font-mono">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`relative h-screen overflow-hidden flex flex-col md:flex-row ${isDarkMode ? "bg-black" : "bg-white"}`}
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Dithering shader panel - top on mobile, right side on desktop */}
      <div className="w-full h-[30vh] md:h-auto md:w-1/2 md:order-2 relative shrink-0">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isDarkMode ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 95%)"}
          colorFront={isDarkMode ? "hsl(320, 100%, 70%)" : "hsl(220, 7%, 24%)"}
          shape="cat"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={0.8}
          rotation={0}
          speed={0.1}
        />
      </div>

      {/* Content panel */}
      <div
        className={`w-full md:w-1/2 md:order-1 font-mono relative z-10 flex flex-col flex-1 min-h-0 ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {/* Top bar with site name and theme toggle */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <h1 className="text-sm sm:text-lg font-normal">
              fabriciomagoga.com.br
            </h1>
            <ThemeToggle
              isDarkMode={isDarkMode}
              onToggle={() => setIsDarkMode(!isDarkMode)}
            />
          </div>

          {/* Name and title */}
          <header className="mb-8 sm:mb-12">
            <h2 className="text-base sm:text-lg font-normal text-balance">
              FABRICIO MAGOGA
            </h2>
            <h3 className="text-base sm:text-lg font-normal opacity-80">
              SOFTWARE ENGINEER
            </h3>
          </header>

          {/* Experience Section */}
          <section className="mb-8 sm:mb-12 space-y-2" aria-label="Experience">
            <h4 className="text-sm sm:text-base font-normal opacity-50 uppercase tracking-wider">
              Experience
            </h4>
            <SectionEntry
              date="Oct 2025 → Present"
              title="IT Intern"
              org="INSS"
            />
          </section>

          {/* Education Section */}
          <section className="mb-8 sm:mb-12 space-y-2" aria-label="Education">
            <h4 className="text-sm sm:text-base font-normal opacity-50 uppercase tracking-wider">
              Education
            </h4>
            <SectionEntry
              date="2025 → 2028"
              title="Software Engineering"
              org="FIAP"
            />
            <SectionEntry
              date="2025 → 2028"
              title="Cybersecurity"
              org="FATEC"
            />
          </section>

          {/* Projects Section */}
          <section className="mb-8 sm:mb-12 space-y-2" aria-label="Projects">
            <h4 className="text-sm sm:text-base font-normal opacity-50 uppercase tracking-wider">
              Projects
            </h4>
            <SectionEntry
              date="2025 →"
              title="URL Shortener"
              href="https://magogaurl.vercel.app/"
            />
            <SectionEntry
              date="2025 →"
              title="Websocket Chat"
              href="https://magoga-chat.vercel.app/"
            />
            <SectionEntry
              date="2026 →"
              title="Fabrício Magoga (this website)"
              href="https://fabriciomagoga.com.br/"
            />
          </section>
        </div>

        {/* Footer Links - flows naturally instead of absolute positioning */}
        <footer className="shrink-0 p-5 sm:p-8 pt-0">
          <FooterLinks />
        </footer>
      </div>
    </div>
  );
}
