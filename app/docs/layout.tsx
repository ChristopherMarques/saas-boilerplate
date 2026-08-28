import Link from "next/link";
import { PublicNav } from "@/features/landing-page";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[hsl(0,0%,10.2%)]">
      <PublicNav />
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-start gap-12 px-6 pt-32 pb-24">
        {/* Sidebar */}
        <aside className="sticky top-32 hidden w-64 shrink-0 lg:block">
          <nav className="flex flex-col gap-6">
            <div>
              <h4 className="mb-3 font-heading text-sm tracking-widest text-[hsl(0,0%,80%)] uppercase">Começando</h4>
              <ul className="flex flex-col gap-2 border-l border-[hsl(0,0%,20%)]">
                <li>
                  <Link href="/docs/introduction" className="block border-l-2 border-transparent pl-4 text-sm text-[hsl(0,0%,60%)] hover:border-[hsl(351,97%,43.1%)] hover:text-[hsl(0,100%,97.3%)] transition-colors">
                    Introdução
                  </Link>
                </li>
                <li>
                  <Link href="/docs/getting-started" className="block border-l-2 border-transparent pl-4 text-sm text-[hsl(0,0%,60%)] hover:border-[hsl(351,97%,43.1%)] hover:text-[hsl(0,100%,97.3%)] transition-colors">
                    Instalação
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-3 font-heading text-sm tracking-widest text-[hsl(0,0%,80%)] uppercase">Arquitetura</h4>
              <ul className="flex flex-col gap-2 border-l border-[hsl(0,0%,20%)]">
                <li>
                  <Link href="/docs/architecture/structure" className="block border-l-2 border-transparent pl-4 text-sm text-[hsl(0,0%,60%)] hover:border-[hsl(351,97%,43.1%)] hover:text-[hsl(0,100%,97.3%)] transition-colors">
                    Estrutura
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
