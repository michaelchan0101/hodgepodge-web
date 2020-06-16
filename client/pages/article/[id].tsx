import style from 'styles/detail.module.css'
import markdown from 'styles/markdown.module.css'
import { ArticleDetailProps, ArticleResponse } from 'types/article'
import { getArticle } from 'apis/article'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// export async function getStaticPaths() {
//   const { articles } = await listArticles(100, 0)
//   return {
//     paths: articles.map(article => `/articles/${article.id}`),
//     fallback: true,
//   }
// }

// export async function getServerSideProps(context: any) {
//   return {
//     props: {
//       articleId: context?.query?.id || null,
//     }, // will be passed to the page component as props
//   }
// }

export default function Article(props: ArticleDetailProps) {
  // const { articleId } = props
  const router = useRouter()
  const { id } = router.query
  const [articleId, setArticleId] = useState(Number(id))
  const [article, setArticle] = useState<ArticleResponse | null>(null)
  useEffect(() => {
    if (articleId) {
      getArticle(articleId).then(response => {
        setArticle(response)
      })
    }
  }, [articleId])
  if (!article) {
    return <div>loading...</div>
  }
  return (
    <>
      <h1 className={style.detailTitle}>{article.title}</h1>
      <div className={style.detailLable}>分类：{article.category?.name}</div>
      <div className={style.detailLable}>发表时间：{article.createdAt}</div>
      <article
        className={markdown['markdown-body']}
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></article>
    </>
  )
}
