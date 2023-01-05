/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";

export const button = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.45rem 0.8rem;
  margin-left: 0.7rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: ${theme.fontWeight.bold};
`;
