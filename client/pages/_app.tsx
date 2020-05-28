import { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <nav>
        <Link href='/'>
          <a>Home</a>
        </Link>
        <Link href='/detail/1'>
          <a>Detail</a>
        </Link>
        <Link href='/articles'>
          <a>Articles</a>
        </Link>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}
