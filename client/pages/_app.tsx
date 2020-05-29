import 'styles/app.css'
import { AppProps } from 'next/app'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Zn 的大杂烩</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}
