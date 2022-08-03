import 'ress'
import { css, Global } from '@emotion/react'
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useState } from 'react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Global styles={globalStyle} />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp

const globalStyle = css`
  html {
    --color-primary: #3a4452;
    --color-secondary: #bfcbdc;
    --color-base: #f6f7f8;
    --color-accent: #d35692;
    --color-white: #fdfdfd;
    --color-black: #1f1f1f;
  }

  body {
    background-color: var(--color-white);
    color: var(--color-black);
  }

  a {
    color: var(--color-secondary);

    &:hover,
    &:focus,
    &:active {
      color: var(--color-accent);
      text-decoration: underline;
    }
  }
`
