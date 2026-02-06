"use client"

import Link from "next/link"

interface BlogHeaderProps {
  isDarkMode: boolean
  onToggle: () => void
}

export function BlogHeader({ isDarkMode, onToggle }: BlogHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-10 sm:mb-14">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-sm sm:text-base opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Voltar para a pagina inicial"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <Link href="/blog" className="text-sm sm:text-lg font-normal hover:opacity-80 transition-opacity">
          blog
        </Link>
      </div>
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
    </header>
  )
}
