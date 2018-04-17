// pages/_document.js
// by Gavin Smith
// CS4242 Assignment 04
import Document, { Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
          <link rel="stylesheet" href="/static/app.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
