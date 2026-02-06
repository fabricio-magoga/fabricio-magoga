import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import fs from "fs/promises"
import path from "path"
import type { BlogPost } from "@/lib/blog-data"

const POSTS_FILE = path.join(process.cwd(), "data", "posts.json")

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")
  return !!session?.value
}

async function ensureDataDir() {
  const dir = path.dirname(POSTS_FILE)
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

async function readDynamicPosts(): Promise<BlogPost[]> {
  try {
    await fs.access(POSTS_FILE)
    const data = await fs.readFile(POSTS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeDynamicPosts(posts: BlogPost[]) {
  await ensureDataDir()
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8")
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function estimateReadingTime(content: string): string {
  const words = content.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min`
}

function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .trim()
}

// GET - list all dynamic posts (admin only)
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nao autorizado." }, { status: 401 })
  }

  const posts = await readDynamicPosts()
  return NextResponse.json({ posts })
}

// POST - create a new post
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nao autorizado." }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, content, category, excerpt } = body

    // Validate required fields
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Titulo e obrigatorio." },
        { status: 400 }
      )
    }

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Conteudo e obrigatorio." },
        { status: 400 }
      )
    }

    if (!category || typeof category !== "string") {
      return NextResponse.json(
        { error: "Categoria e obrigatoria." },
        { status: 400 }
      )
    }

    const safeTitle = sanitizeInput(title)
    const slug = generateSlug(title)

    // Check for duplicate slugs
    const existingPosts = await readDynamicPosts()
    if (existingPosts.some((p) => p.slug === slug)) {
      return NextResponse.json(
        { error: "Ja existe um artigo com um titulo similar. Escolha outro titulo." },
        { status: 409 }
      )
    }

    const now = new Date()
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`

    const newPost: BlogPost = {
      slug,
      title: safeTitle,
      date: dateStr,
      excerpt: excerpt
        ? sanitizeInput(excerpt)
        : content.trim().slice(0, 150).replace(/\n/g, " ") + "...",
      category: sanitizeInput(category),
      readingTime: estimateReadingTime(content),
      content: content.trim(),
    }

    existingPosts.unshift(newPost)
    await writeDynamicPosts(existingPosts)

    return NextResponse.json({ success: true, post: newPost }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Erro ao salvar o artigo." },
      { status: 500 }
    )
  }
}

// DELETE - delete a post by slug
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nao autorizado." }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json(
        { error: "Slug e obrigatorio." },
        { status: 400 }
      )
    }

    const posts = await readDynamicPosts()
    const filtered = posts.filter((p) => p.slug !== slug)

    if (filtered.length === posts.length) {
      return NextResponse.json(
        { error: "Artigo nao encontrado." },
        { status: 404 }
      )
    }

    await writeDynamicPosts(filtered)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Erro ao deletar o artigo." },
      { status: 500 }
    )
  }
}
