import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre engenharia de software, ciberseguranca, produtividade e carreira em tecnologia.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
