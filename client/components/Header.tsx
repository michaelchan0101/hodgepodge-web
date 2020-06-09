import style from 'styles/header.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MyApp(props: any) {
  const router = useRouter()
  const headerStyle = {
    maxWidth: router.pathname === '/' ? 'none' : '430px',
    width: router.pathname === '/' ? '100%' : '32%',
  }
  const { config } = props
  return (
    <header className={style.header} style={headerStyle}>
      <div className={style.headerMain}>
        <div className={style.headerContent}>
          <h1 className={style.title}>{config.title}</h1>
          <div className={style.line100}></div>
          <h2 className={style.desc}>{config.desc}</h2>
          <div className={style.line50}></div>
          <nav>
            <li className={style.link}>
              <Link href='/'>
                <a>首页</a>
              </Link>
            </li>
            <li className={style.link}>
              <Link href='/articles'>
                <a>文章</a>
              </Link>
            </li>
            <li className={style.linkGithub}>
              <a href={config.github} target='_blank'>
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
