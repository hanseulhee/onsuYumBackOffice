/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";

function ModifyBtn() {
  return <button css={button}>수정하기</button>;
}

export default ModifyBtn;

const button = (theme: Theme) => css`
  position: relative;
  background-color: ${theme.color.yellow};
  padding: 0.1rem 1rem;
  height: 2.5rem;
  border-radius: 30px;
  font-weight: ${theme.fontWeight.bold};
  font-size: 0.8rem;
  color: ${theme.color.black};
`;
