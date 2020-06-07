import 'styles/app.css'
import style from 'styles/app.module.css'
// import { AppProps } from 'next/app'
import Head from 'next/head'
import { getConfig } from 'services/config'
import Footer from 'components/Footer'
import Header from 'components/Header'

function MyApp({ Component, pageProps, props }: any) {
  const { config } = props
  return (
    <>
      <Head>
        <title>{config.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header config={config} />
      <div className={style.content}>
        <main className={style.main}>
          <Component {...pageProps} />
        </main>
        <Footer config={config} />
      </div>
    </>
  )
}

MyApp.getInitialProps = async () => {
  const config = await getConfig()
  return {
    props: { config },
  }
}

export default MyApp
