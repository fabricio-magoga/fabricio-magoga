import { NextResponse } from "next/server"
import { blogPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/blog-data"
import fs from "fs/promises"
import path from "path"

const POSTS_FILE = path.join(process.cwd(), "data", "posts.json")

async function readDynamicPosts(): Promise<BlogPost[]> {
  try {
    await fs.access(POSTS_FILE)
    const data = await fs.readFile(POSTS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

export const dynamic = "force-dynamic"

export async function GET() {
  const dynamicPosts = await readDynamicPosts()
  const allPosts = [...blogPosts, ...dynamicPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return NextResponse.json({ posts: allPosts })
}
