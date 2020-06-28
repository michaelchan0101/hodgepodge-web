import 'styles/app.css'
import style from 'styles/app.module.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Footer from 'components/Footer'
import Header from 'components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{process.env.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className={style.content}>
        <main className={style.main}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default MyApp
