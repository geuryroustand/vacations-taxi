import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${
                process.env.NODE_ENV === "production" &&
                process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
              }"height="0" width="0" style="display:none;visibility:hidden"></iframe>`
            }}
          />
          {/* <!-- End Google Tag Manager (noscript) --> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
