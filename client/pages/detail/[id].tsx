import { ArticleDetailProps } from 'types/article'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps(context: any) {
  return {
    props: {
      article: {
        id: context.params.id,
      },
    }, // will be passed to the page component as props
  }
}

export default function Detail(props: ArticleDetailProps) {
  const { article } = props
  return (
    <div>
      <h1 className='title'>Welcome to Detail({article?.id})</h1>
    </div>
  )
}
