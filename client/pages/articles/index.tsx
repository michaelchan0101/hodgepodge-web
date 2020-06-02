import style from 'styles/article.module.css'
import { listArticles } from 'services/article'
import { ArticlesProps, ListArticlesResponse } from 'types/article'
import Link from 'next/link'
import { useReducer, DispatchWithoutAction } from 'react'

export async function getStaticProps() {
  const [limit, offset] = [20, 0]
  const listArticlesResponse = await listArticles(limit, offset)
  return {
    props: { listArticlesResponse },
  }
}

const articleReducer = async (
  state: ListArticlesResponse
): Promise<ListArticlesResponse> => {
  const { limit, offset } = state
  const listArticlesResponse = await listArticles(limit, offset + limit)
  return listArticlesResponse
}

export default function Articles(props: ArticlesProps) {
  const { listArticlesResponse } = props
  const [response, articleDispatch]: [
    ListArticlesResponse,
    DispatchWithoutAction
  ] = useReducer(articleReducer, listArticlesResponse)

  return (
    <>
      <div className={style.articleHeader}>文章列表</div>
      <ul className={style.articleBox}>
        {response.articles.map(article => (
          <li>
            <Link href={`/detail/${article.id}`}>
              <a>{article.title}</a>
            </Link>
            <span>{article.createdAt}</span>
          </li>
        ))}
        <li>
          <a onClick={() => articleDispatch()}>获取更多文章...</a>
        </li>
      </ul>
    </>
  )
}
