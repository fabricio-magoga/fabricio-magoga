import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Últimas atualizações",
  description:
    "FABRICIO MAGOGA BLOG",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
