import { AudioProvider } from '@/components/AudioProvider'
import { RecorderProvider } from '@/components/RecorderProvider'
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
        <RecorderProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecorderProvider>
      </AudioProvider>
    </SessionProvider>
  )
}
