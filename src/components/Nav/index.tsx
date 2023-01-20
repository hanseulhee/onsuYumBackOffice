/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import Link from "next/link";

function Nav() {
  return (
    <nav css={navWrapper}>
      <h1 css={logo}>온수냠냠냠</h1>
      <div css={linkWrapper}>
        <Link href="/Restaurants">식당</Link>
        <Link href="/Babfull">밥풀</Link>
      </div>
    </nav>
  );
}

export default Nav;

const navWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 3rem;
  margin: 2rem 0;
`;

const linkWrapper = (theme: Theme) => css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 10rem;
  font-size: 1.2rem;
  font-weight: ${theme.fontWeight.bold};
`;

const logo = (theme: Theme) => css`
  font-size: 1.85rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.yellow};
  cursor: pointer;
`;
