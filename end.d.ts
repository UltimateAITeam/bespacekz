declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string;
      NEXT_PUBLIC_POSTHOG_KEY: string;
      NEXT_PUBLIC_POSTHOG_HOST: string;
      DATABASE_URL: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      LINKEDIN_ID: string;
      LINKEDIN_SECRET: string;
      POSTGRES_DATABASE: string;
      POSTGRES_HOST: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_PRISMA_URL: string;
      POSTGRES_URL: string;
      POSTGRES_URL_NON_POOLING: string;
      POSTGRES_USER: string;
      API_URL: string;
      POSTMARK_SERVER_TOKEN: string;
      EPAY_CLIENT_ID: string;
      EPAY_CLIENT_SECRET: string;
      EPAY_TERMINAL_ID: string;
      EPAY_SHOP_ID: string;
      EPAY_USERNAME: string;
      EPAY_PASSWORD: string;
    }
  }
}

export {};
