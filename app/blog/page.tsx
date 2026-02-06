"use client"

import { useState } from "react"
import { getAllPosts } from "@/lib/blog-data"
import { BlogHeader } from "@/components/blog-header"
import { BlogPostCard } from "@/components/blog-post-card"

const allCategories = ["Todos", "Carreira", "Seguranca", "Tecnologia", "Ferramentas", "Produtividade", "Backend"]

export default function BlogPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeCategory, setActiveCategory] = useState("Todos")

  const posts = getAllPosts()
  const filteredPosts =
    activeCategory === "Todos"
      ? posts
      : posts.filter((p) => p.category === activeCategory)

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

        {/* Title */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-lg sm:text-xl font-normal mb-2">BLOG</h1>
          <p className="text-xs sm:text-sm opacity-50 leading-relaxed max-w-md">
            Artigos sobre engenharia de software, seguranca, produtividade e carreira em tecnologia.
          </p>
        </div>

        {/* Category Filter */}
        <nav aria-label="Filtro de categorias" className="mb-8">
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] sm:text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm transition-all ${
                  activeCategory === cat
                    ? isDarkMode
                      ? "bg-white text-black"
                      : "bg-black text-white"
                    : isDarkMode
                      ? "bg-white/5 text-white/60 hover:bg-white/10"
                      : "bg-black/5 text-black/60 hover:bg-black/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        {/* Posts List */}
        <div>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogPostCard
                key={post.slug}
                post={post}
                isDarkMode={isDarkMode}
              />
            ))
          ) : (
            <p className="text-sm opacity-40 py-10 text-center">
              Nenhum artigo encontrado nesta categoria.
            </p>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-current/10">
          <div className="flex items-center justify-between text-xs opacity-40">
            <a href="/" className="hover:opacity-80 transition-opacity">
              fabriciomagoga.com.br
            </a>
            <span>{posts.length} artigos</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
