"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import type { BlogPost } from "@/lib/blog-data"

// ─── Types ────────────────────────────────────────────────────
type Tab = "editor" | "preview" | "posts"

const CATEGORIES = [
  "Carreira",
  "Seguranca",
  "Tecnologia",
  "Ferramentas",
  "Produtividade",
  "Backend",
]

// ─── Login Screen ─────────────────────────────────────────────
function LoginScreen({
  onLogin,
  isDarkMode,
  onToggle,
}: {
  onLogin: () => void
  isDarkMode: boolean
  onToggle: () => void
}) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Erro ao autenticar.")
        setLoading(false)
        return
      }

      onLogin()
    } catch {
      setError("Erro de conexao. Tente novamente.")
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen font-mono flex items-center justify-center px-5 transition-colors ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full max-w-xs">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-8">
          <button
            onClick={onToggle}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">
            Area restrita
          </p>
          <h1 className="text-lg font-normal">Admin</h1>
          <p className="text-xs opacity-50 mt-1">
            Insira a senha para acessar o painel.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="sr-only">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Senha de acesso"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className={`w-full text-sm px-4 py-3 rounded-sm outline-none transition-colors font-mono ${
              isDarkMode
                ? "bg-white/5 text-white placeholder:text-white/30 focus:bg-white/10"
                : "bg-black/5 text-black placeholder:text-black/30 focus:bg-black/10"
            }`}
          />

          {error && (
            <p className="text-xs mt-3 text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className={`w-full text-xs uppercase tracking-widest mt-4 px-4 py-3 rounded-sm transition-all disabled:opacity-30 ${
              isDarkMode
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/90"
            }`}
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-widest opacity-30 hover:opacity-60 transition-opacity"
          >
            Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Markdown Preview ─────────────────────────────────────────
function MarkdownPreview({
  content,
  isDarkMode,
}: {
  content: string
  isDarkMode: boolean
}) {
  if (!content.trim()) {
    return (
      <p className="text-xs opacity-30 py-10 text-center">
        Nenhum conteudo para pre-visualizar.
      </p>
    )
  }

  const lines = content.trim().split("\n")
  const elements: React.ReactNode[] = []
  let i = 0
  let inCodeBlock = false
  let codeLines: string[] = []
  let codeLanguage = ""

  while (i < lines.length) {
    const line = lines[i]

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
          <div key={`code-${i}`} className="my-4">
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
              className={`text-xs p-4 overflow-x-auto ${
                codeLanguage ? "rounded-b-sm" : "rounded-sm"
              } ${isDarkMode ? "bg-white/5" : "bg-black/[0.03]"}`}
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

    if (line.trim() === "") {
      i++
      continue
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-lg font-normal mt-6 mb-3">
          {line.replace("# ", "")}
        </h1>
      )
      i++
      continue
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-base font-normal mt-6 mb-2 opacity-90">
          {line.replace("## ", "")}
        </h2>
      )
      i++
      continue
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-sm font-normal mt-4 mb-2 opacity-80">
          {line.replace("### ", "")}
        </h3>
      )
      i++
      continue
    }

    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={i}
          className={`border-l-2 pl-4 my-4 italic opacity-70 text-sm ${
            isDarkMode ? "border-white/30" : "border-black/20"
          }`}
        >
          {line.replace("> ", "").replace(/"/g, "")}
        </blockquote>
      )
      i++
      continue
    }

    if (line.trim().startsWith("- ")) {
      const items: React.ReactNode[] = []
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(
          <li key={i} className="flex gap-2">
            <span className="opacity-40 shrink-0">-</span>
            <span>{renderInline(lines[i].trim().replace("- ", ""), isDarkMode)}</span>
          </li>
        )
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-3 space-y-1 text-xs opacity-80 leading-relaxed">
          {items}
        </ul>
      )
      continue
    }

    if (/^\d+\.\s/.test(line.trim())) {
      const items: React.ReactNode[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const text = lines[i].trim().replace(/^\d+\.\s/, "")
        const num = lines[i].trim().match(/^(\d+)\./)?.[1]
        items.push(
          <li key={i} className="flex gap-2">
            <span className="opacity-40 shrink-0">{num}.</span>
            <span>{renderInline(text, isDarkMode)}</span>
          </li>
        )
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-3 space-y-1 text-xs opacity-80 leading-relaxed">
          {items}
        </ol>
      )
      continue
    }

    elements.push(
      <p key={i} className="text-xs opacity-70 leading-relaxed my-3">
        {renderInline(line, isDarkMode)}
      </p>
    )
    i++
  }

  return <div>{elements}</div>
}

function renderInline(text: string, isDark: boolean): React.ReactNode {
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
          className={`text-[11px] px-1.5 py-0.5 rounded-sm ${
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

// ─── Article Editor ───────────────────────────────────────────
function ArticleEditor({
  isDarkMode,
  onToggle,
  onLogout,
}: {
  isDarkMode: boolean
  onToggle: () => void
  onLogout: () => void
}) {
  const [tab, setTab] = useState<Tab>("editor")
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState(CATEGORIES[0])
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(false)

  const loadPosts = useCallback(async () => {
    setLoadingPosts(true)
    try {
      const res = await fetch("/api/admin/posts")
      if (res.ok) {
        const data = await res.json()
        setPosts(data.posts || [])
      }
    } catch {
      // silently fail
    }
    setLoadingPosts(false)
  }, [])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setSaving(true)

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category, excerpt }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Erro ao salvar." })
        setSaving(false)
        return
      }

      setMessage({ type: "success", text: "Artigo publicado com sucesso!" })
      setTitle("")
      setExcerpt("")
      setContent("")
      setCategory(CATEGORIES[0])
      loadPosts()
    } catch {
      setMessage({ type: "error", text: "Erro de conexao." })
    }
    setSaving(false)
  }

  async function handleDelete(slug: string) {
    if (!confirm("Tem certeza que deseja excluir este artigo?")) return

    try {
      const res = await fetch(`/api/admin/posts?slug=${slug}`, {
        method: "DELETE",
      })
      if (res.ok) {
        loadPosts()
        setMessage({ type: "success", text: "Artigo excluido." })
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao excluir." })
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" })
    onLogout()
  }

  const inputClass = `w-full text-sm px-4 py-3 rounded-sm outline-none transition-colors font-mono ${
    isDarkMode
      ? "bg-white/5 text-white placeholder:text-white/30 focus:bg-white/10"
      : "bg-black/5 text-black placeholder:text-black/30 focus:bg-black/10"
  }`

  const tabs: { key: Tab; label: string }[] = [
    { key: "editor", label: "Editor" },
    { key: "preview", label: "Preview" },
    { key: "posts", label: `Artigos (${posts.length})` },
  ]

  return (
    <div
      className={`min-h-screen font-mono transition-colors ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-8 sm:py-14">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="text-sm opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Voltar para o blog"
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
            <h1 className="text-sm sm:text-lg font-normal">Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggle}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleLogout}
              className={`text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors ${
                isDarkMode
                  ? "bg-white/5 hover:bg-white/10 text-white/60"
                  : "bg-black/5 hover:bg-black/10 text-black/60"
              }`}
            >
              Sair
            </button>
          </div>
        </header>

        {/* Tabs */}
        <nav className="flex gap-1 mb-8" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`text-[10px] sm:text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm transition-all ${
                tab === t.key
                  ? isDarkMode
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDarkMode
                    ? "bg-white/5 text-white/50 hover:bg-white/10"
                    : "bg-black/5 text-black/50 hover:bg-black/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Message */}
        {message && (
          <div
            className={`text-xs px-4 py-3 rounded-sm mb-6 ${
              message.type === "success"
                ? isDarkMode
                  ? "bg-green-500/10 text-green-400"
                  : "bg-green-50 text-green-700"
                : isDarkMode
                  ? "bg-red-500/10 text-red-400"
                  : "bg-red-50 text-red-700"
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        {/* Editor Tab */}
        {tab === "editor" && (
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="block text-[10px] uppercase tracking-widest opacity-50 mb-2"
              >
                Titulo
              </label>
              <input
                id="title"
                type="text"
                placeholder="Titulo do artigo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label
                htmlFor="excerpt"
                className="block text-[10px] uppercase tracking-widest opacity-50 mb-2"
              >
                Resumo (opcional)
              </label>
              <input
                id="excerpt"
                type="text"
                placeholder="Breve descricao do artigo"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-[10px] uppercase tracking-widest opacity-50 mb-2"
              >
                Categoria
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-[10px] uppercase tracking-widest opacity-50 mb-2"
              >
                Conteudo (Markdown)
              </label>
              <textarea
                id="content"
                placeholder={"# Titulo do artigo\n\nEscreva seu conteudo aqui usando Markdown...\n\n## Subtitulo\n\nParagrafo com **negrito** e `codigo`."}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={18}
                className={`${inputClass} resize-y leading-relaxed`}
                required
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving || !title.trim() || !content.trim()}
                className={`text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all disabled:opacity-30 ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-black/90"
                }`}
              >
                {saving ? "Publicando..." : "Publicar artigo"}
              </button>
              <button
                type="button"
                onClick={() => setTab("preview")}
                disabled={!content.trim()}
                className={`text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all disabled:opacity-20 ${
                  isDarkMode
                    ? "bg-white/5 text-white/70 hover:bg-white/10"
                    : "bg-black/5 text-black/70 hover:bg-black/10"
                }`}
              >
                Pre-visualizar
              </button>
            </div>
          </form>
        )}

        {/* Preview Tab */}
        {tab === "preview" && (
          <div>
            {title && (
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm ${
                      isDarkMode
                        ? "bg-white/10 text-white/70"
                        : "bg-black/5 text-black/60"
                    }`}
                  >
                    {category}
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-normal mb-2 text-balance">
                  {title}
                </h1>
                {excerpt && (
                  <p className="text-xs opacity-50 leading-relaxed">
                    {excerpt}
                  </p>
                )}
              </div>
            )}
            <div
              className={`h-px mb-6 ${
                isDarkMode ? "bg-white/10" : "bg-black/10"
              }`}
            />
            <MarkdownPreview content={content} isDarkMode={isDarkMode} />

            <div className="mt-8 pt-6">
              <button
                onClick={() => setTab("editor")}
                className={`text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all ${
                  isDarkMode
                    ? "bg-white/5 text-white/70 hover:bg-white/10"
                    : "bg-black/5 text-black/70 hover:bg-black/10"
                }`}
              >
                Voltar ao editor
              </button>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {tab === "posts" && (
          <div>
            {loadingPosts ? (
              <p className="text-xs opacity-40 py-10 text-center">
                Carregando artigos...
              </p>
            ) : posts.length === 0 ? (
              <p className="text-xs opacity-40 py-10 text-center">
                Nenhum artigo criado pelo admin ainda.
              </p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className={`px-4 py-4 rounded-sm ${
                      isDarkMode ? "bg-white/5" : "bg-black/[0.03]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm shrink-0 ${
                              isDarkMode
                                ? "bg-white/10 text-white/60"
                                : "bg-black/5 text-black/50"
                            }`}
                          >
                            {post.category}
                          </span>
                          <span className="text-[10px] opacity-30">
                            {post.date}
                          </span>
                        </div>
                        <h3 className="text-sm font-normal truncate">
                          {post.title}
                        </h3>
                        <p className="text-xs opacity-40 mt-1 truncate">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/blog/${post.slug}`}
                          className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm transition-colors ${
                            isDarkMode
                              ? "bg-white/5 hover:bg-white/10 text-white/50"
                              : "bg-black/5 hover:bg-black/10 text-black/50"
                          }`}
                          target="_blank"
                        >
                          Ver
                        </Link>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer
          className={`mt-12 pt-6 border-t ${
            isDarkMode ? "border-white/10" : "border-black/10"
          }`}
        >
          <div className="flex items-center justify-between text-xs opacity-40">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              fabriciomagoga.com.br
            </Link>
            <Link href="/blog" className="hover:opacity-80 transition-opacity">
              Ver blog
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

// ─── Main Admin Page ──────────────────────────────────────────
export default function AdminPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check if already authenticated
    fetch("/api/admin/auth")
      .then((res) => {
        if (res.ok) setIsAuthenticated(true)
      })
      .catch(() => {})
      .finally(() => setChecking(false))
  }, [])

  if (checking) {
    return (
      <div
        className={`min-h-screen font-mono flex items-center justify-center ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <p className="text-xs opacity-40">Carregando...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLogin={() => setIsAuthenticated(true)}
        isDarkMode={isDarkMode}
        onToggle={() => setIsDarkMode(!isDarkMode)}
      />
    )
  }

  return (
    <ArticleEditor
      isDarkMode={isDarkMode}
      onToggle={() => setIsDarkMode(!isDarkMode)}
      onLogout={() => setIsAuthenticated(false)}
    />
  )
}
