import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add global meta tags, styles, or fonts here */}
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Add the dropdown script globally */}
        <Script src="node_modules/@material-tailwind/html@latest/scripts/popover.js"></Script>
      </body>
    </Html>
  );
}