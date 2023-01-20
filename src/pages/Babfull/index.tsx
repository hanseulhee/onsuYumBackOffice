/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import CreateBtn from "components/Button/CreateBtn";
import DeleteBtn from "components/Button/DeleteBtn";
import useGetBabfull from "hooks/api/useGetBabfull";
import Link from "next/link";

function Babfull() {
  const { babfullMenus, isLoading, deleteBabfullMenu } = useGetBabfull();

  if (isLoading) {
    return "로딩중";
  }

  function onClickDeleteBtn(id: number) {
    if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
      deleteBabfullMenu(id);
    }
  }

  return (
    <div css={paddingWrapper}>
      <div css={navWrapper}>
        <span css={title}>밥full 주간 메뉴</span>
        <Link href="/Babfull/AddBabfullMenu">
          <CreateBtn summary="밥full 메뉴 추가하기" />
        </Link>
      </div>
      <span>아무것도 없을 경우 메뉴를 올리지 않았거나 or 주말이거나</span>
      {babfullMenus?.content.map((menu) => (
        <div key={menu.id}>
          <span>{menu.menuDate}</span>
          <span>{menu.deliciousFood}</span>
          <span>{menu.foods}</span>
          <DeleteBtn onClick={() => onClickDeleteBtn(menu.id)} />
        </div>
      ))}
    </div>
  );
}

export default Babfull;

const paddingWrapper = css`
  padding: 2rem;
`;

const navWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const title = (theme: Theme) => css`
  font-size: 1.85rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.yellow};
`;
