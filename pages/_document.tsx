import Document, { DocumentContext } from 'next/document';
import { createGlobalStyle, ServerStyleSheet } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #__next{
      height: 100%;
      width: 100%;
      padding: 0;
      margin: 0;
      font-family: helvetica;
      font-size: 14px;
      word-break: break-word;
      min-height: 500px;
      max-height: 1080px;
      @media screen and (max-width: 640px){
        font-size: 16px;
      }
  }
  #__next{
    display:flex;
    justify-content:center;
  }
  input{
    font-size: 1em;
  }
  select{
    font-size: 1em;
  }
`;

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <>
                <GlobalStyle />
                <App {...props} />
              </>,
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}

export default MyDocument;
