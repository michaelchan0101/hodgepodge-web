import { Container } from 'next/app'
import Head from 'next/head'
// import HomeLayout from 'components/HomeLayout'
import { AppProps } from 'next/app'
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
// export default class MyApp extends App {
//   // constructor(props: AppProps) {
//   //   super(props)
//   //   // const isServer = !process.browser
//   //   // this.pageContext = getPageContext()
//   // }
//   render() {
//     const { Component, pageProps } = this.props
//     return (
//       <Container>
//         <Head>
//           <title>Create Next App</title>
//           <link rel='icon' href='/favicon.ico' />
//         </Head>
//         <nav>
//           <Link href='/'>
//             <a>Home</a>
//           </Link>
//           <Link href='/detail'>
//             <a>Detail</a>
//           </Link>
//         </nav>
//         <main>
//           <Component {...pageProps} />
//         </main>
//       </Container>
//     )
//   }
// }
