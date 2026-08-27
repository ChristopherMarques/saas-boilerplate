/**
 * Portuguese (Brazil) translations — complete mirror of en.ts.
 * Every key in en.ts MUST have a corresponding key here.
 */
export const ptBR = {
  // ─── Common ─────────────────────────────────────────────────────
  common: {
    loading: "Carregando...",
    error: "Algo deu errado",
    retry: "Tentar novamente",
    save: "Salvar",
    cancel: "Cancelar",
    delete: "Excluir",
    edit: "Editar",
    create: "Criar",
    search: "Buscar",
    back: "Voltar",
    next: "Próximo",
    close: "Fechar",
    confirm: "Confirmar",
    yes: "Sim",
    no: "Não",
    or: "ou",
    and: "e",
    learnMore: "Saiba mais",
    getStarted: "Começar",
    signIn: "Entrar",
    signOut: "Sair",
    dashboard: "Painel",
    settings: "Configurações",
    profile: "Perfil",
    free: "Grátis",
  },

  // ─── Navigation ─────────────────────────────────────────────────
  nav: {
    home: "Início",
    features: "Funcionalidades",
    pricing: "Preços",
    faq: "Perguntas frequentes",
    dashboard: "Painel",
    login: "Entrar",
    signup: "Criar conta",
    language: "Idioma",
  },

  // ─── Landing Page ───────────────────────────────────────────────
  landing: {
    hero: {
      title: "Construa seu próximo SaaS,",
      titleHighlight: "mais rápido do que nunca.",
      subtitle:
        "Um boilerplate pronto para produção com autenticação, pagamentos, i18n e tudo que você precisa para lançar seu produto.",
      cta: "Comece gratuitamente",
      ctaSecondary: "Ver preços",
    },
    features: {
      title: "Tudo o que você precisa para lançar",
      subtitle:
        "Arquitetura testada em batalha, construída ao longo de 1 ano de desenvolvimento SaaS real.",
      auth: {
        title: "Autenticação",
        description:
          "Google OAuth via Better Auth com gerenciamento de sessão, controle de acesso por papel e integração Supabase pronta para uso.",
      },
      payments: {
        title: "Pagamentos e Assinaturas",
        description:
          "Fluxo de pagamento pronto para Stripe com webhooks, tiers de assinatura e gerenciamento de planos integrado.",
      },
      i18n: {
        title: "Internacionalização",
        description:
          "Inglês e Português desde o dia 1 com traduções tipadas e detecção automática do navegador.",
      },
      database: {
        title: "Banco de Dados e Segurança",
        description:
          "Supabase com RLS, limitação de requisições, cabeçalhos CSP e padrões de segurança empresarial.",
      },
      components: {
        title: "Componentes Acessíveis",
        description:
          "shadcn/ui com React Aria para componentes em conformidade com WCAG e design bonito por padrão.",
      },
      animations: {
        title: "Animações GSAP",
        description:
          "Animações suaves e performáticas com ScrollTrigger para landing pages que convertem.",
      },
    },
    pricing: {
      title: "Preços simples e transparentes",
      subtitle: "Comece grátis. Faça upgrade quando estiver pronto.",
      monthly: "Mensal",
      annual: "Anual",
      perMonth: "/mês",
      billedAnnually: "Cobrado anualmente",
      currentPlan: "Plano atual",
      upgrade: "Fazer upgrade",
      startFree: "Começar grátis",
      mostPopular: "Mais popular",
      popular: "Mais popular",
      features: {
        projects: "{{count}} projeto",
        projects_plural: "{{count}} projetos",
        projectsUnlimited: "Projetos ilimitados",
        storage: "{{amount}} de armazenamento",
        storageUnlimited: "Armazenamento ilimitado",
        aiTokens: "{{count}} tokens de IA/mês",
        support: "Suporte {{type}}",
        exportFormats: "Exportação para {{formats}}",
      },
    },
    faq: {
      title: "Perguntas frequentes",
      subtitle: "Tudo o que você precisa saber para começar.",
      items: {
        q1: "O plano gratuito é realmente gratuito?",
        a1: "Sim. O plano gratuito é grátis para sempre, sem necessidade de cartão de crédito. Você pode se cadastrar com Google e começar a usar a plataforma imediatamente.",
        q2: "Posso fazer upgrade ou downgrade a qualquer momento?",
        a2: "Com certeza. Você pode fazer upgrade, downgrade ou cancelar seu plano a qualquer momento. As alterações entram em vigor imediatamente.",
        q3: "Quais formas de pagamento vocês aceitam?",
        a3: "Aceitamos todos os principais cartões de crédito e débito via Stripe. Métodos de pagamento adicionais podem estar disponíveis dependendo da sua região.",
        q4: "Meus dados estão seguros?",
        a4: "Sim. Usamos segurança de nível empresarial com criptografia SSL, políticas de segurança por linha, cabeçalhos CSP e nunca compartilhamos seus dados com terceiros.",
        q5: "Vocês oferecem reembolso?",
        a5: "Sim. Os planos pagos têm garantia de devolução de 7 dias. Após isso, você pode cancelar a qualquer momento e manter o acesso até o final do período de cobrança.",
        q6: "Posso hospedar por conta própria?",
        a6: "Este boilerplate foi projetado para ser implantado na Vercel com Supabase, mas você pode adaptá-lo para qualquer provedor de hospedagem que suporte Next.js.",
      },
    },
    footer: {
      description: "Boilerplate SaaS pronto para produção para aplicações web modernas.",
      product: "Produto",
      company: "Empresa",
      legal: "Jurídico",
      terms: "Termos de Serviço",
      privacy: "Política de Privacidade",
      about: "Sobre",
      blog: "Blog",
      contact: "Contato",
      rights: "Todos os direitos reservados.",
    },
  },

  // ─── Auth ───────────────────────────────────────────────────────
  auth: {
    login: {
      title: "Bem-vindo de volta",
      subtitle: "Entre na sua conta para continuar.",
      googleButton: "Continuar com Google",
      noAccount: "Não tem uma conta?",
      signUp: "Criar conta",
    },
    callback: {
      title: "Fazendo login...",
      subtitle: "Por favor, aguarde enquanto completamos a autenticação.",
      error: "Falha na autenticação. Por favor, tente novamente.",
    },
    errors: {
      invalidSession: "Sessão inválida",
      sessionExpired: "Sua sessão expirou. Por favor, entre novamente.",
      unauthorized: "Você precisa entrar para acessar esta página.",
      googleFailed: "Falha no login com Google. Por favor, tente novamente.",
    },
  },

  // ─── Dashboard ──────────────────────────────────────────────────
  dashboard: {
    welcome: "Bem-vindo, {{name}}!",
    welcomeDefault: "Bem-vindo!",
    overview: "Visão geral",
    plan: {
      title: "Seu plano",
      free: "Grátis",
      pro: "Pro",
      max: "Max",
      upgrade: "Fazer upgrade",
    },
    stats: {
      projects: "Projetos",
      storage: "Armazenamento usado",
      aiTokens: "Tokens de IA restantes",
    },
    empty: {
      title: "Nenhum projeto ainda",
      subtitle: "Crie seu primeiro projeto para começar.",
      cta: "Criar projeto",
    },
  },

  // ─── Errors ─────────────────────────────────────────────────────
  errors: {
    notFound: {
      title: "Página não encontrada",
      subtitle: "A página que você procura não existe ou foi movida.",
      cta: "Ir para o início",
    },
    generic: {
      title: "Algo deu errado",
      subtitle: "Ocorreu um erro inesperado. Por favor, tente novamente.",
      cta: "Tentar novamente",
    },
    validation: {
      required: "Este campo é obrigatório",
      invalidEmail: "Por favor, insira um endereço de e-mail válido",
      tooShort: "Deve ter pelo menos {{min}} caracteres",
      tooLong: "Deve ter no máximo {{max}} caracteres",
    },
  },

  // ─── Accessibility ──────────────────────────────────────────────
  a11y: {
    skipToContent: "Pular para o conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    toggleTheme: "Alternar tema",
    switchLanguage: "Trocar idioma",
  },
} as const;
