import style from 'styles/detail.module.css'
import markdown from 'styles/markdown.module.css'
import { ArticleDetailProps, ArticleResponse } from 'types/article'
import { getArticle } from 'apis/article'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export async function getServerSideProps(context: any) {
  const article = await getArticle(context.query.id)
  return {
    props: { article }, // will be passed to the page component as props
  }
}

export default function Article(props: ArticleDetailProps) {
  const { article: initArticle = null } = props
  const { id: articleId } = useRouter().query
  const [article, setArticle] = useState<ArticleResponse | null>(initArticle)
  useEffect(() => {
    if (articleId && Number(articleId) !== article?.id) {
      getArticle(Number(articleId)).then(response => {
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
