import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import crypto from "crypto"

// Generate a session token using a secure random value
function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

// Hash the password with a consistent salt derived from the password itself
// This is used to create a verifiable session token without storing the raw password
function hashForSession(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Senha e obrigatoria." },
        { status: 400 }
      )
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      return NextResponse.json(
        { error: "Configuracao de autenticacao ausente no servidor." },
        { status: 500 }
      )
    }

    // Constant-time comparison to prevent timing attacks
    const passwordBuffer = Buffer.from(password)
    const adminBuffer = Buffer.from(adminPassword)

    if (
      passwordBuffer.length !== adminBuffer.length ||
      !crypto.timingSafeEqual(passwordBuffer, adminBuffer)
    ) {
      return NextResponse.json(
        { error: "Senha incorreta. Tente novamente." },
        { status: 401 }
      )
    }

    // Generate a session token
    const sessionToken = generateSessionToken()
    const sessionHash = hashForSession(sessionToken)

    // Store the session hash in a cookie (HTTP-only, secure)
    const cookieStore = await cookies()
    cookieStore.set("admin_session", sessionHash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 4, // 4 hours
    })

    // Also set a non-HTTP-only cookie so the client can check auth status
    cookieStore.set("admin_logged_in", "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 4, // 4 hours
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}

// DELETE method to logout
export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  cookieStore.delete("admin_logged_in")
  return NextResponse.json({ success: true })
}

// GET method to check if session is valid
export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session?.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true })
}
