/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import useGetRestaurant from "hooks/api/useGetRestaurant";
import Link from "next/link";

import { button } from "styles/css/button";

function Restaurants() {
  const { restaurants, isLoading, deleteRestaurant } = useGetRestaurant();

  if (isLoading) {
    return "로딩중";
  }

  function onClickDeleteBtn(id: number) {
    if (confirm("삭제하시겠습니까?")) {
      deleteRestaurant(id);
    }
  }

  return (
    <div css={paddingWrapper}>
      <div css={navWrapper}>
        <span css={title}>온수냠냠냠 식당 모음</span>
        <Link href="/Restaurants/AddRestaurant">
          <button css={createButton}>식당 추가하기</button>
        </Link>
      </div>
      {restaurants.map((restaurant) => (
        <Link href={`/Detail/${restaurant.id}`} key={restaurant.id}>
          <div css={wrapper}>
            <span css={restaurantnName}>{restaurant.name}</span>
            <button
              css={deleteButton}
              onClick={() => onClickDeleteBtn(restaurant.id)}
            >
              삭제하기
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Restaurants;

const paddingWrapper = css`
  padding: 2rem;
`;

const navWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const wrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding: 0.8rem 0;
`;

const title = (theme: Theme) => css`
  font-size: 1.85rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.yellow};
`;

const restaurantnName = (theme: Theme) => css`
  font-size: 1.2rem;
  font-weight: ${theme.fontWeight.bold};
  opacity: 0.85;
`;

const createButton = (theme: Theme) => css`
  ${button(theme)}
  background-color: ${theme.color.yellow};
`;

const deleteButton = (theme: Theme) => css`
  ${button(theme)}
  background-color: ${theme.color.border};
  margin-left: 0.7rem;
`;
