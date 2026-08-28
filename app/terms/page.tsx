import { PublicNav, Footer } from "@/features/landing-page";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[hsl(0,0%,10.2%)]">
      <PublicNav />
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-32">
        <h1 className="text-4xl md:text-5xl font-heading uppercase text-[hsl(0,100%,97.3%)] mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-invert prose-p:text-[hsl(0,0%,65%)] max-w-none font-sans">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of the SaaS Boilerplate website and services.
            By accessing or using our services, you agree to be bound by these Terms.
          </p>
          
          <h2 className="text-2xl font-heading mt-12 mb-4 text-[hsl(0,100%,97.3%)] uppercase">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use
            SaaS Boilerplate if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-heading mt-12 mb-4 text-[hsl(0,100%,97.3%)] uppercase">2. License</h2>
          <p>
            Unless otherwise stated, SaaS Boilerplate and/or its licensors own the intellectual property rights for
            all material on the website. All intellectual property rights are reserved.
          </p>

          <h2 className="text-2xl font-heading mt-12 mb-4 text-[hsl(0,100%,97.3%)] uppercase">3. Disclaimer</h2>
          <p>
            The materials on SaaS Boilerplate&apos;s website are provided on an &apos;as is&apos; basis. We make no warranties,
            expressed or implied, and hereby disclaim and negate all other warranties including, without limitation,
            implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
            of intellectual property or other violation of rights.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
