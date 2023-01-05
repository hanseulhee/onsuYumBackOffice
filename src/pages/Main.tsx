/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import Explain from "components/Explain";
import Nav from "components/Nav";

function Main() {
  return (
    <main>
      <Nav />
      <div css={explainWrapper}>
        <Explain />
      </div>
    </main>
  );
}

export default Main;

const explainWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
