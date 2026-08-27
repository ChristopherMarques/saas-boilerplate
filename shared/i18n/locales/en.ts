/**
 * English translations — the default and fallback language.
 * Every key here MUST have a corresponding key in pt-BR.ts.
 */
export const en = {
  // ─── Common ─────────────────────────────────────────────────────
  common: {
    loading: "Loading...",
    error: "Something went wrong",
    retry: "Try again",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    search: "Search",
    back: "Back",
    next: "Next",
    close: "Close",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
    or: "or",
    and: "and",
    learnMore: "Learn more",
    getStarted: "Get started",
    signIn: "Sign in",
    signOut: "Sign out",
    dashboard: "Dashboard",
    settings: "Settings",
    profile: "Profile",
    free: "Free",
  },

  // ─── Navigation ─────────────────────────────────────────────────
  nav: {
    home: "Home",
    features: "Features",
    pricing: "Pricing",
    faq: "FAQ",
    dashboard: "Dashboard",
    login: "Sign in",
    signup: "Sign up",
    language: "Language",
  },

  // ─── Landing Page ───────────────────────────────────────────────
  landing: {
    hero: {
      title: "Build your next SaaS,",
      titleHighlight: "faster than ever.",
      subtitle:
        "A production-ready boilerplate with authentication, payments, i18n, and everything you need to ship your product.",
      cta: "Get started for free",
      ctaSecondary: "View pricing",
    },
    features: {
      title: "Everything you need to ship",
      subtitle: "Battle-tested architecture built over 1 year of real-world SaaS development.",
      auth: {
        title: "Authentication",
        description:
          "Google OAuth via Better Auth with session management, role-based access, and Supabase integration out of the box.",
      },
      payments: {
        title: "Payments & Subscriptions",
        description:
          "Stripe-ready payment flow with webhooks, subscription tiers, and plan management built in.",
      },
      i18n: {
        title: "Internationalization",
        description:
          "English and Portuguese from day 1 with type-safe translations and automatic browser detection.",
      },
      database: {
        title: "Database & Security",
        description:
          "Supabase with RLS, rate limiting, CSP headers, and enterprise-grade security defaults.",
      },
      components: {
        title: "Accessible Components",
        description:
          "shadcn/ui with React Aria for WCAG-compliant components with beautiful design by default.",
      },
      animations: {
        title: "GSAP Animations",
        description:
          "Smooth, performant animations with ScrollTrigger for landing pages that convert.",
      },
    },
    pricing: {
      title: "Simple, transparent pricing",
      subtitle: "Start free. Upgrade when you're ready.",
      monthly: "Monthly",
      annual: "Annual",
      perMonth: "/month",
      billedAnnually: "Billed annually",
      currentPlan: "Current plan",
      upgrade: "Upgrade",
      startFree: "Start for free",
      mostPopular: "Most popular",
      popular: "Most popular",
      features: {
        projects: "{{count}} project",
        projects_plural: "{{count}} projects",
        projectsUnlimited: "Unlimited projects",
        storage: "{{amount}} storage",
        storageUnlimited: "Unlimited storage",
        aiTokens: "{{count}} AI tokens/month",
        support: "{{type}} support",
        exportFormats: "Export to {{formats}}",
      },
    },
    faq: {
      title: "Frequently asked questions",
      subtitle: "Everything you need to know to get started.",
      items: {
        q1: "Is the free plan really free?",
        a1: "Yes. The free plan is free forever, no credit card required. You can sign up with Google and start using the platform immediately.",
        q2: "Can I upgrade or downgrade at any time?",
        a2: "Absolutely. You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.",
        q3: "What payment methods do you accept?",
        a3: "We accept all major credit cards and debit cards via Stripe. Additional payment methods may be available depending on your region.",
        q4: "Is my data secure?",
        a4: "Yes. We use enterprise-grade security with SSL encryption, row-level security policies, CSP headers, and never share your data with third parties.",
        q5: "Do you offer refunds?",
        a5: "Yes. Paid plans come with a 7-day money-back guarantee. After that, you can cancel anytime and keep access until the end of your billing period.",
        q6: "Can I self-host this?",
        a6: "This boilerplate is designed to be deployed on Vercel with Supabase, but you can adapt it to any hosting provider that supports Next.js.",
      },
    },
    footer: {
      description: "Production-ready SaaS boilerplate for modern web applications.",
      product: "Product",
      company: "Company",
      legal: "Legal",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      about: "About",
      blog: "Blog",
      contact: "Contact",
      rights: "All rights reserved.",
    },
  },

  // ─── Auth ───────────────────────────────────────────────────────
  auth: {
    login: {
      title: "Welcome back",
      subtitle: "Sign in to your account to continue.",
      googleButton: "Continue with Google",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
    },
    callback: {
      title: "Signing you in...",
      subtitle: "Please wait while we complete the authentication.",
      error: "Authentication failed. Please try again.",
    },
    errors: {
      invalidSession: "Invalid session",
      sessionExpired: "Your session has expired. Please sign in again.",
      unauthorized: "You need to sign in to access this page.",
      googleFailed: "Google sign-in failed. Please try again.",
    },
  },

  // ─── Dashboard ──────────────────────────────────────────────────
  dashboard: {
    welcome: "Welcome, {{name}}!",
    welcomeDefault: "Welcome!",
    overview: "Overview",
    plan: {
      title: "Your plan",
      free: "Free",
      pro: "Pro",
      max: "Max",
      upgrade: "Upgrade plan",
    },
    stats: {
      projects: "Projects",
      storage: "Storage used",
      aiTokens: "AI tokens remaining",
    },
    empty: {
      title: "No projects yet",
      subtitle: "Create your first project to get started.",
      cta: "Create project",
    },
  },

  // ─── Errors ─────────────────────────────────────────────────────
  errors: {
    notFound: {
      title: "Page not found",
      subtitle: "The page you're looking for doesn't exist or has been moved.",
      cta: "Go home",
    },
    generic: {
      title: "Something went wrong",
      subtitle: "An unexpected error occurred. Please try again.",
      cta: "Try again",
    },
    validation: {
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      tooShort: "Must be at least {{min}} characters",
      tooLong: "Must be at most {{max}} characters",
    },
  },

  // ─── Accessibility ──────────────────────────────────────────────
  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Toggle theme",
    switchLanguage: "Switch language",
  },
} as const;

export type TranslationKeys = typeof en;
