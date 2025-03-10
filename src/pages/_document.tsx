import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src="node_modules/@material-tailwind/html@latest/scripts/popover.js"></Script>
      </body>
    </Html>
  );
}