import Link from 'next/link'
import { AppProps } from 'next/app'

export default function HomeLayout(props: AppProps) {
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
      <footer></footer>
    </div>
  )
}
