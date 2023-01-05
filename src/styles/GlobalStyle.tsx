import { Global, css, Theme } from "@emotion/react";

function GlobalStyle() {
  return <Global styles={globalStyle} />;
}

export default GlobalStyle;

const globalStyle = (theme: Theme) => css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Noto Sans KR", sans-serif;
  }

  html,
  body {
    background-color: ${theme.color.fullWhite};
    color: ${theme.color.black};
    line-height: 1.5;
  }

  img {
    all: unset;
  }

  button,
  a {
    all: unset;
    cursor: pointer;
  }
`;
