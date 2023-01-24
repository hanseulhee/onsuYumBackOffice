/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import CreateBtn from "components/Button/CreateBtn";
import DeleteBtn from "components/Button/DeleteBtn";
import ModifyBtn from "components/Button/ModifyBtn";
import useGetRestaurant from "hooks/api/useGetRestaurant";
import Link from "next/link";

function Restaurants() {
  const { restaurants, isLoading, deleteRestaurant } =
    useGetRestaurant();

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
          <CreateBtn summary="식당 추가하기" />
        </Link>
      </div>
      {restaurants.map((restaurant) => (
        <Link href={`/Detail/${restaurant.id}`} key={restaurant.id}>
          <div css={contentWrapper}>
            <span css={restaurantnName}>{restaurant.name}</span>
            <div css={buttonWrapper}>
              <Link href={`/Restaurants/Modify/${restaurant.id}`}>
                <ModifyBtn />
              </Link>
              <DeleteBtn onClick={() => onClickDeleteBtn(restaurant.id)} />
            </div>
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

const contentWrapper = css`
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
  margin-right: 0.6rem;
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 9rem;
`;
