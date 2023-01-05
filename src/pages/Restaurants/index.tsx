/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import useGetRestaurant from "hooks/api/useGetRestaurant";

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
      <span css={title}>온수냠냠냠 식당 모음</span>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} css={wrapper}>
          <span css={restaurantnName}>{restaurant.name}</span>
          <button
            css={deleteButton}
            onClick={() => onClickDeleteBtn(restaurant.id)}
          >
            삭제하기
          </button>
        </div>
      ))}
    </div>
  );
}

export default Restaurants;

const paddingWrapper = css`
  padding: 2rem;
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

const deleteButton = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.45rem 0.8rem;
  margin-left: 0.7rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: ${theme.fontWeight.bold};
  background-color: ${theme.color.border};
`;
