/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";

interface Props {
  onClick(): void;
}

function DeleteBtn({ onClick }: Props) {
  return (
    <button css={button} onClick={onClick}>
      삭제하기
    </button>
  );
}

export default DeleteBtn;

const button = (theme: Theme) => css`
  position: relative;
  background-color: ${theme.color.red};
  padding: 0.1rem 1rem;
  height: 2.5rem;
  border-radius: 30px;
  font-weight: ${theme.fontWeight.bold};
  font-size: 0.8rem;
  color: ${theme.color.white};
`;
