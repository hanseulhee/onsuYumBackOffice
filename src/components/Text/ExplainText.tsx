/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";

interface Props {
  summary?: string;
  highlight?: string;
}

function ExplainText({ summary, highlight }: Props) {
  return (
    <p css={summaryContent}>
      <strong css={strongContent}>{highlight}</strong>
      {summary}
    </p>
  );
}

export default ExplainText;

const summaryContent = css`
  font-size: 0.9rem;
  white-space: pre-wrap;
  opacity: 0.7;
  line-height: 2;
`;

const strongContent = (theme: Theme) => css`
  color: ${theme.color.black};
  font-weight: ${theme.fontWeight.bold};
`;
