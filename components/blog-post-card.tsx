import Link from "next/link"
import type { BlogPost } from "@/lib/blog-data"
import { formatDate } from "@/lib/blog-data"

interface BlogPostCardProps {
  post: BlogPost
  isDarkMode: boolean
}

export function BlogPostCard({ post, isDarkMode }: BlogPostCardProps) {
  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        className={`block group py-6 border-b transition-colors ${
          isDarkMode
            ? "border-white/10 hover:bg-white/[0.03]"
            : "border-black/10 hover:bg-black/[0.02]"
        } -mx-2 px-2 rounded-sm`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span
            className={`text-[10px] sm:text-xs uppercase tracking-widest px-2 py-0.5 rounded-sm ${
              isDarkMode
                ? "bg-white/10 text-white/70"
                : "bg-black/5 text-black/60"
            }`}
          >
            {post.category}
          </span>
          <span className="text-[10px] sm:text-xs opacity-50">
            {post.readingTime}
          </span>
        </div>

        <h2 className="text-sm sm:text-base font-normal mb-1 group-hover:underline underline-offset-4">
          {post.title}
        </h2>

        <time
          dateTime={post.date}
          className="block text-[10px] sm:text-xs opacity-40 mb-2"
        >
          {formatDate(post.date)}
        </time>

        <p className="text-xs sm:text-sm opacity-60 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </Link>
    </article>
  )
}
