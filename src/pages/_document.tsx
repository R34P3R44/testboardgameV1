import { Html, Head, Main, NextScript } from 'next/document';

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
        <script src="node_modules/@material-tailwind/html@latest/scripts/popover.js"></script>
      </body>
    </Html>
  );
}