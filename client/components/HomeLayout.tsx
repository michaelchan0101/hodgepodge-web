import Link from 'next/link'

export default function HomeLayout({ children }) {
  return (
    <div className='container'>
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
