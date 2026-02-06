"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/blog-data"
import { BlogHeader } from "@/components/blog-header"

function MarkdownRenderer({
  content,
  isDarkMode,
}: {
  content: string
  isDarkMode: boolean
}) {
  const lines = content.trim().split("\n")
  const elements: React.ReactNode[] = []
  let i = 0
  let inCodeBlock = false
  let codeLines: string[] = []
  let codeLanguage = ""

  while (i < lines.length) {
    const line = lines[i]

    // Code blocks
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLanguage = line.trim().replace("```", "")
        codeLines = []
        i++
        continue
      } else {
        inCodeBlock = false
        elements.push(
          <div key={i} className="my-4">
            {codeLanguage && (
              <div
                className={`text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-t-sm ${
                  isDarkMode
                    ? "bg-white/10 text-white/50"
                    : "bg-black/5 text-black/40"
                }`}
              >
                {codeLanguage}
              </div>
            )}
            <pre
              className={`text-xs sm:text-sm p-4 overflow-x-auto ${
                codeLanguage ? "rounded-b-sm" : "rounded-sm"
              } ${
                isDarkMode ? "bg-white/5" : "bg-black/[0.03]"
              }`}
            >
              <code>{codeLines.join("\n")}</code>
            </pre>
          </div>
        )
        i++
        continue
      }
    }

    if (inCodeBlock) {
      codeLines.push(line)
      i++
      continue
    }

    // Empty lines
    if (line.trim() === "") {
      i++
      continue
    }

    // Headings
    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={i}
          className="text-lg sm:text-xl font-normal mt-8 mb-4"
        >
          {line.replace("# ", "")}
        </h1>
      )
      i++
      continue
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-base sm:text-lg font-normal mt-8 mb-3 opacity-90"
        >
          {line.replace("## ", "")}
        </h2>
      )
      i++
      continue
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="text-sm sm:text-base font-normal mt-6 mb-2 opacity-80"
        >
          {line.replace("### ", "")}
        </h3>
      )
      i++
      continue
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={i}
          className={`border-l-2 pl-4 my-4 italic opacity-70 text-sm sm:text-base ${
            isDarkMode ? "border-white/30" : "border-black/20"
          }`}
        >
          {line.replace("> ", "").replace(/"/g, "")}
        </blockquote>
      )
      i++
      continue
    }

    // Unordered list items
    if (line.trim().startsWith("- ")) {
      const listItems: React.ReactNode[] = []
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        const text = lines[i].trim().replace("- ", "")
        listItems.push(
          <li key={i} className="flex gap-2">
            <span className="opacity-40 shrink-0">-</span>
            <span>{renderInlineFormatting(text, isDarkMode)}</span>
          </li>
        )
        i++
      }
      elements.push(
        <ul
          key={`ul-${i}`}
          className="my-3 space-y-1 text-xs sm:text-sm opacity-80 leading-relaxed"
        >
          {listItems}
        </ul>
      )
      continue
    }

    // Ordered list items
    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: React.ReactNode[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const text = lines[i].trim().replace(/^\d+\.\s/, "")
        const num = lines[i].trim().match(/^(\d+)\./)?.[1]
        listItems.push(
          <li key={i} className="flex gap-2">
            <span className="opacity-40 shrink-0">{num}.</span>
            <span>{renderInlineFormatting(text, isDarkMode)}</span>
          </li>
        )
        i++
      }
      elements.push(
        <ol
          key={`ol-${i}`}
          className="my-3 space-y-1 text-xs sm:text-sm opacity-80 leading-relaxed"
        >
          {listItems}
        </ol>
      )
      continue
    }

    // Paragraph
    elements.push(
      <p
        key={i}
        className="text-xs sm:text-sm opacity-70 leading-relaxed my-3"
      >
        {renderInlineFormatting(line, isDarkMode)}
      </p>
    )
    i++
  }

  return <div>{elements}</div>
}

function renderInlineFormatting(text: string, isDark?: boolean): React.ReactNode {
  // Handle bold, inline code, etc.
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold opacity-100">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className={`text-[11px] sm:text-xs px-1.5 py-0.5 rounded-sm ${
            isDark ? "bg-white/10" : "bg-black/5"
          }`}
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

export default function BlogPostPage() {
  const params = useParams()
  const [isDarkMode, setIsDarkMode] = useState(true)

  const slug = params.slug as string
  const post = getPostBySlug(slug)
  const allPosts = getAllPosts()

  if (!post) {
    return (
      <div
        className={`min-h-screen font-mono flex items-center justify-center ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="text-center">
          <p className="text-sm opacity-60 mb-4">Artigo nao encontrado.</p>
          <Link
            href="/blog"
            className="text-sm underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity"
          >
            Voltar para o blog
          </Link>
        </div>
      </div>
    )
  }

  // Find adjacent posts
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <div
      className={`min-h-screen font-mono transition-colors ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-8 sm:py-14">
        <BlogHeader
          isDarkMode={isDarkMode}
          onToggle={() => setIsDarkMode(!isDarkMode)}
        />

        {/* Post Meta */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`text-[10px] sm:text-xs uppercase tracking-widest px-2 py-0.5 rounded-sm ${
                isDarkMode
                  ? "bg-white/10 text-white/70"
                  : "bg-black/5 text-black/60"
              }`}
            >
              {post.category}
            </span>
            <span className="text-[10px] sm:text-xs opacity-40">
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-lg sm:text-xl font-normal mb-2 text-balance">
            {post.title}
          </h1>

          <time
            dateTime={post.date}
            className="block text-[10px] sm:text-xs opacity-40"
          >
            {formatDate(post.date)}
          </time>
        </div>

        {/* Separator */}
        <div
          className={`h-px mb-8 ${
            isDarkMode ? "bg-white/10" : "bg-black/10"
          }`}
        />

        {/* Content */}
        <article className="mb-12">
          <MarkdownRenderer content={post.content} isDarkMode={isDarkMode} />
        </article>

        {/* Navigation between posts */}
        <nav
          aria-label="Navegacao entre artigos"
          className={`border-t pt-8 ${
            isDarkMode ? "border-white/10" : "border-black/10"
          }`}
        >
          <div className="flex justify-between gap-4">
            <div className="flex-1 min-w-0">
              {prevPost && (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group block"
                >
                  <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-1">
                    Anterior
                  </span>
                  <span className="text-xs sm:text-sm opacity-70 group-hover:opacity-100 transition-opacity truncate block">
                    {prevPost.title}
                  </span>
                </Link>
              )}
            </div>
            <div className="flex-1 min-w-0 text-right">
              {nextPost && (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group block"
                >
                  <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-1">
                    Proximo
                  </span>
                  <span className="text-xs sm:text-sm opacity-70 group-hover:opacity-100 transition-opacity truncate block">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <footer className={`mt-10 pt-6 border-t ${isDarkMode ? "border-white/10" : "border-black/10"}`}>
          <div className="flex items-center justify-between text-xs opacity-40">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity"
            >
              fabriciomagoga.com.br
            </Link>
            <Link
              href="/blog"
              className="hover:opacity-80 transition-opacity"
            >
              Todos os artigos
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
