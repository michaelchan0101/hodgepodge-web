import { Container, AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <nav>
        <Link href='/'>
          <a>Home</a>
        </Link>
        <Link href='/detail'>
          <a>Detail</a>
        </Link>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </Container>
  )
}
