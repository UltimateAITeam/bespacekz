'use client';
import { SessionProvider } from "next-auth/react";
import { ChakraProvider  } from '@chakra-ui/react'
import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'
import {theme} from '../libs/chakraTheme'

if (typeof window !== 'undefined') { // checks that we are client-side
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
    },
  })
}

export function Providers({children}: {children: React.ReactNode}) {
    return (
        <SessionProvider>
            <ChakraProvider theme={theme}>
            <PostHogProvider client={posthog}>
            {children}
            </PostHogProvider>
            </ChakraProvider>
        </SessionProvider>
    )
}