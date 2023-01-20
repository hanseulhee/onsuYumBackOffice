/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { button } from "styles/css/button";

function ModifyBtn() {
  return <button css={modifyButton}>수정하기</button>;
}

export default ModifyBtn;

const modifyButton = (theme: Theme) => css`
  ${button(theme)}
  background-color: ${theme.color.yellow};
`;
