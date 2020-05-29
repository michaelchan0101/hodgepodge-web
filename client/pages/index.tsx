import indexStyle from 'styles/index.module.css'
import { AppProps } from 'next/app'
import Link from 'next/link'

export default function Main(props: AppProps) {
  return (
    <div className={indexStyle.main}>
      <div className={indexStyle.content}>
        <h1 className={indexStyle.title}>Zn - 稀奇古怪大杂烩</h1>
        <div className={indexStyle.line100}></div>
        <h2 className={indexStyle.desc}>真正的大师永远要怀有一颗学徒的心</h2>
        <div className={indexStyle.line50}></div>
        <nav>
          <Link href='/'>
            <span className={indexStyle.link}>首页</span>
          </Link>
          <Link href='/articles'>
            <span className={indexStyle.link}>文章列表</span>
          </Link>
          <a
            href='https://www.github.com/michaelchan0101'
            target='_blank'
            className={indexStyle.linkGithub}
          >
            <img src='/github.png' className={indexStyle.iconGithub} />
          </a>
        </nav>
      </div>
      <div className={indexStyle.overlay}></div>
    </div>
  )
}
