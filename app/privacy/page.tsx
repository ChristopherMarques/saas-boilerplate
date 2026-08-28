import { PublicNav, Footer } from "@/features/landing-page";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[hsl(0,0%,10.2%)]">
      <PublicNav />
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-32">
        <h1 className="text-4xl md:text-5xl font-heading uppercase text-[hsl(0,100%,97.3%)] mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-invert prose-p:text-[hsl(0,0%,65%)] max-w-none font-sans">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            Your privacy is important to us. It is SaaS Boilerplate&apos;s policy to respect your privacy regarding
            any information we may collect from you across our website.
          </p>
          
          <h2 className="text-2xl font-heading mt-12 mb-4 text-[hsl(0,100%,97.3%)] uppercase">1. Information We Collect</h2>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it
            by fair and lawful means, with your knowledge and consent. We also let you know why we&apos;re collecting
            it and how it will be used.
          </p>

          <h2 className="text-2xl font-heading mt-12 mb-4 text-[hsl(0,100%,97.3%)] uppercase">2. Use of Information</h2>
          <p>
            We only retain collected information for as long as necessary to provide you with your requested service.
            What data we store, we&apos;ll protect within commercially acceptable means to prevent loss and theft, as well
            as unauthorized access, disclosure, copying, use or modification.
          </p>

          <h2 className="text-2xl font-heading mt-12 mb-4 text-[hsl(0,100%,97.3%)] uppercase">3. Third-Party Access</h2>
          <p>
            We don&apos;t share any personally identifying information publicly or with third-parties, except when required
            to by law.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
