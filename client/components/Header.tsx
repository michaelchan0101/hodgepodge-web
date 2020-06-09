import style from 'styles/header.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MyApp(props: any) {
  const router = useRouter()
  const headerStyle = {
    maxWidth: router.pathname === '/' ? 'none' : '430px',
    width: router.pathname === '/' ? '100%' : '32%',
  }
  return (
    <header className={style.header} style={headerStyle}>
      <div className={style.headerMain}>
        <div className={style.headerContent}>
          <h1 className={style.title}>{process.env.title}</h1>
          <div className={style.line100}></div>
          <h2 className={style.desc}>{process.env.desc}</h2>
          <div className={style.line50}></div>
          <nav>
            <Link href='/'>
              <li className={style.link}>
                <a>首页</a>
              </li>
            </Link>
            <Link href='/articles'>
              <li className={style.link}>
                <a>文章</a>
              </li>
            </Link>
            <li className={style.linkGithub}>
              <a href={process.env.github} target='_blank'>
                <img src='/github.png' />
              </a>
            </li>
          </nav>
        </div>
        <div className={style.overlay}></div>
      </div>
    </header>
  )
}
