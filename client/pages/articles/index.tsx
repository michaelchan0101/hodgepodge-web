import { listArticles } from 'services/article'
import { ArticlesProps } from 'types/article'

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
    <div>
      <h1 className='title'>Welcome to Articles</h1>
    </div>
  )
}
