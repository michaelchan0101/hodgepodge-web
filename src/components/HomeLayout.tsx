import Head from 'next/head'
import Link from 'next/link'

export default function HomeLayout({ children }) {
  return (
    <div className='container'>
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
      <main>{children}</main>
      {/* <main>{render()}</main> */}
      <footer></footer>
    </div>
  )
}
