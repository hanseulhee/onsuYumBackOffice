/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { button } from "styles/css/button";

interface Props {
  onClick(): void;
  summary?: string;
}

function DeleteBtn({ onClick, summary }: Props) {
  return (
    <button css={deleteButton} onClick={onClick}>
      {summary} 삭제하기
    </button>
  );
}

export default DeleteBtn;

const deleteButton = (theme: Theme) => css`
  ${button(theme)}
  color: ${theme.color.white};
  background-color: ${theme.color.red};
`;
