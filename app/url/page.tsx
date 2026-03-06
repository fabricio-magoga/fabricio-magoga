"use client";

import { useState } from "react";

export default function UrlShortenerPage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Falha ao copiar", err);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setShortUrl("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(`${window.location.origin}/${data.shortUrl}`);
      } else {
        setErrorMessage(data.message || "Erro ao encurtar URL.");
      }
    } catch (err) {
      setErrorMessage("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-[#030303] text-[#fafafa] min-h-screen flex items-center justify-center p-6">
      <style jsx global>{`
        body {
          font-family: "Inter", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .v0-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #09090b;
        }
        .v0-input {
          background: #09090b;
          border: 1px solid #27272a;
        }
        .v0-button {
          background: #fafafa;
          color: #09090b;
        }
        .v0-button:hover {
          background: #e4e4e7;
        }
      `}</style>
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tighter">
            Url Shortener
          </h1>
          <p className="text-zinc-400 text-sm">
            Encurte seus links de forma rápida e eficiente.
          </p>
        </div>

        <div className="v0-card p-6 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                URL Original
              </label>
              <input
                type="url"
                id="url-input"
                placeholder="https://sua-url-longa.com"
                required
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="v0-input w-full rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-zinc-400 transition-all placeholder:text-zinc-600"
              />
            </div>

            <button
              type="submit"
              className="v0-button w-full rounded-md text-sm font-medium transition-colors active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-200 rounded-full animate-spin"></div>
                </div>
              ) : (
                "Encurtar agora"
              )}
            </button>
          </form>

          {/* Renderização Condicional de Sucesso */}
          {shortUrl && (
            <div className="mt-6 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Link Encurtado
              </label>
              <div className="flex gap-2">
                <div className="v0-input flex-1 rounded-md px-3 py-2 text-sm text-zinc-300 truncate font-mono">
                  {shortUrl}
                </div>
                <button
                  onClick={handleCopy}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 rounded-md transition-colors border border-zinc-700 flex items-center justify-center min-w-[40px]"
                >
                  {isCopied ? (
                    <span className="text-[10px] font-bold">COPIADO</span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Renderização Condicional de Erro */}
          {errorMessage && (
            <div className="mt-6 text-xs text-red-400 border border-red-900/50 bg-red-950/20 p-3 rounded-md">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
