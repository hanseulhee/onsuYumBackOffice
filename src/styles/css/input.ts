/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";

export const input = (theme: Theme) => css`
  width: 30rem;
  height: 2.3rem;
  padding: 0.8rem 1rem;
  border-radius: 5px;
  font-size: 1.3rem;
  font-weight: ${theme.fontWeight.light};
  background-color: ${theme.color.grey100};
`;
