import { PublicNav, Footer } from "@/features/landing-page";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[hsl(0,0%,10.2%)]">
      <PublicNav />
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-heading uppercase text-[hsl(0,100%,97.3%)] mb-6">
          Contact Us
        </h1>
        <p className="text-[hsl(0,0%,65%)] max-w-xl mx-auto mb-12 text-lg font-sans">
          Have a question or want to work together? We&apos;d love to hear from you. 
          Reach out to our team using the email below.
        </p>
        
        <div className="p-8 rounded-2xl bg-[hsl(0,0%,13%)] border border-[hsl(0,0%,20%)] max-w-md w-full">
          <p className="text-sm font-mono uppercase tracking-widest text-[hsl(351,97%,43.1%)] mb-2">
            Email us directly
          </p>
          <a 
            href="mailto:support@example.com" 
            className="text-2xl font-bold text-[hsl(0,100%,97.3%)] hover:text-[hsl(351,97%,43.1%)] transition-colors"
          >
            support@example.com
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
