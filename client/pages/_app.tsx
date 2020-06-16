import 'styles/app.css'
import style from 'styles/app.module.css'
// import { AppProps } from 'next/app'
import Head from 'next/head'
import Footer from 'components/Footer'
import Header from 'components/Header'

export async function getServerSideProps(context: any) {
  return {
    props: {
      title: context?.query?.title || null,
    }, // will be passed to the page component as props
  }
}

function MyApp({ Component, pageProps, props }: any) {
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
