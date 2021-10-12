import Document, { DocumentContext } from 'next/document';
import { createGlobalStyle, ServerStyleSheet } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body,#__next{
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      background-color: #fdfdfd;
      font-family: helvetica;
      font-size: 14px;
      word-break: keep-all;
      overflow: hidden;
      max-height: 1080px;
      @media screen and (max-width: 640px){
        font-size: 18px;
      }
  }
  #__next{
    display:flex;
    justify-content:center;
  }
  input{
    font-size: 1em;
    margin:0;
    padding: 0;
    box-sizing: border-box;
    @media screen and (max-width: 640px){
      text-align: right;
      height: 40px;
    }
  }
  select{
    font-size: 1em;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;
    background-size: 0.8em;
    background-position: calc(100% - 12px) center;
    background-repeat: no-repeat;
    @media screen and (max-width: 640px){
      height: 40px;
    }
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
