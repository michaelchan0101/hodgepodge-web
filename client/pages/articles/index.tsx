import style from 'styles/article.module.css'
import { listArticles } from 'services/article'
import { ArticlesProps } from 'types/article'
import Link from 'next/link'

export async function getStaticProps() {
  const [limit, offset] = [20, 0]
  const result = await listArticles(limit, offset)
  return {
    props: {
      ...result,
    },
  }
}

export default function Articles(props: ArticlesProps) {
  return (
    <>
      <div className={style.articleHeader}>文章列表</div>
      <ul className={style.articleBox}>
        <li>
          <Link href='/detail/1'>
            <a>文章标题</a>
          </Link>
          <span>2020-03-01 10:30:00</span>
        </li>
        <li>
          <a>文章标题</a>
          <span>2020-03-01 10:30:00</span>
        </li>
        <li>
          <a>获取更多文章...</a>
        </li>
      </ul>
    </>
  )
}
