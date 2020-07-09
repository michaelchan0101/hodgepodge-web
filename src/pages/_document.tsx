import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <html>
        <Head>
          <meta name='application-name' content='Zn App' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='Zn App' />
          <meta name='description' content='Best Zn App in the world' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          {/* <meta name='msapplication-config' content='/static/icons/browserconfig.xml' /> */}
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
          />

          {/* <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/static/icons/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/static/icons/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/static/icons/favicon-16x16.png'
          /> */}
          <link rel='manifest' href='/manifest.json' />
          {/* <link
            rel='mask-icon'
            href='/static/icons/safari-pinned-tab.svg'
            color='#5bbad5'
          /> */}
          <link rel='shortcut icon' href='/favicon.ico' />
          {/* <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
          /> */}

          <meta property='og:type' content='website' />
          <meta property='og:title' content='Zn App' />
          <meta property='og:description' content='Best Zn App in the world' />
          <meta property='og:site_name' content='Zn App' />
          <meta property='og:url' content='https://www.chenzn.com' />
          {/* <meta
            property='og:image'
            content='https://yourdomain.com/static/icons/apple-touch-icon.png'
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
