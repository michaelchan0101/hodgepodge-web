import style from 'styles/article.module.css'
import { listArticles } from 'apis/article'
import { ArticlesProps } from 'types/article'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const LIMIT = 2
export async function getServerSideProps() {
  const response = await listArticles(LIMIT, 0)
  return {
    props: { ...response },
  }
}

export default function Articles(props: ArticlesProps) {
  const { articles: initArticles, offset: initOffset } = props

  const [articles, setArticles] = useState(initArticles)
  const [offset, setOffset] = useState(initOffset)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      const response = await listArticles(LIMIT, offset)
      setArticles([...articles, ...response.articles])
      setOffset(response.offset)
      setLoading(false)
    })()
  }, [offset])

  const loadArticles = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    setOffset(offset + LIMIT)
  }
  console.log(offset + LIMIT === articles.length)
  return (
    <>
      <div className={style.articleHeader}>文章列表</div>
      <ul className={style.articleBox}>
        {articles.map(article => (
          <li key={article.id}>
            <Link href={`/article/[id]`} as={`/article/${article.id}`}>
              <a>{article.title}</a>
            </Link>
            <span>{article.createdAt}</span>
          </li>
        ))}
        {offset + LIMIT === articles.length ? (
          <li>
            <a onClick={loadArticles}>获取更多文章......</a>
          </li>
        ) : (
          ''
        )}
      </ul>
    </>
  )
}
