import { AppProps } from 'next/app'
import { getConfig } from 'services/config'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const config = await getConfig()
  return {
    props: { config },
  }
}

export default function Main(props: AppProps) {
  return <></>
}
