/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { button } from "styles/css/button";

interface Props {
  summary: string;
}

function CreateBtn({ summary }: Props) {
  return <button css={createButton}> {summary}</button>;
}

export default CreateBtn;

const createButton = (theme: Theme) => css`
  ${button(theme)}
  background-color: ${theme.color.grey100};
`;
