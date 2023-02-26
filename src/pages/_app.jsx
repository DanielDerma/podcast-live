import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'
import { SessionProvider } from 'next-auth/react'

import '@/styles/tailwind.css'
import 'focus-visible'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AudioProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AudioProvider>
    </SessionProvider>
  )
}
