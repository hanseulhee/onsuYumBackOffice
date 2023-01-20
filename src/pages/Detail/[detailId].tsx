/** @jsxImportSource @emotion/react */
import { useRouter } from "next/router";
import { css, Theme } from "@emotion/react";
import useGetRestaurantById from "hooks/api/useGetRestaurantById";
import MenuList from "components/Menu/MenuList";
import CreateBtn from "components/Button/CreateBtn";
import PlaceInform from "components/Text/PlaceInform";
import Link from "next/link";
import SectionKeyword from "components/Text/SectionKeyword";

function Detail() {
  const {
    query: { detailId },
  } = useRouter();

  const { restaurant, restaurantMenu, isLoading } = useGetRestaurantById({
    detailId,
  });

  if (isLoading) {
    return "로딩중";
  }

  return (
    <div css={fullSizeWrapper}>
      <div css={itemSortWrapper}>
        <div css={imgWrapper}>
          {/* <img
            src={`${restaurant?.insideImage.s3Url}`}
            alt={restaurant?.name}
            css={imgSize}
          /> */}
        </div>
        <PlaceInform title="한 줄 설명" summary={restaurant?.summary} />
        <PlaceInform title="전화" summary={restaurant?.phone} />
        <PlaceInform title="위치" summary={restaurant?.location} />
        <span css={subName}>영업시간</span>
        <ul css={ulWrapper}>
          {restaurant?.time ? (
            restaurant?.time.map((each, index) => (
              <li css={timeList} key={index}>
                {each}
              </li>
            ))
          ) : (
            <li css={timeList}>정보 없음</li>
          )}
        </ul>
      </div>
      <div css={createMenuWrapper}>
        <Link href={`/Menu/Add/${restaurant?.id}`}>
          <CreateBtn summary="메뉴 추가하기" />˝
        </Link>
      </div>
      <SectionKeyword name="메뉴" />
      {restaurantMenu.map((menu) => {
        return (
          <MenuList
            key={menu.id}
            id={menu.id}
            name={menu.name}
            price={menu.price}
            menuImage={menu.menuImage}
          />
        );
      })}
    </div>
  );
}

export default Detail;

const fullSizeWrapper = css`
  max-width: 40rem;
  width: 100%;
  margin: 0 auto;
`;

const imgWrapper = css`
  position: relative;
  width: 100%;
  height: 14rem;
`;

const imgSize = css`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const itemSortWrapper = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.1rem;
`;

const subName = (theme: Theme) => css`
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.color.grey500};
  font-size: 1rem;
  margin-right: 0.65rem;
  margin-top: 0.14rem;
`;

const ulWrapper = css`
  all: unset;
  display: flex;
  flex-direction: column;
  height: auto;
`;

const timeList = (theme: Theme) => css`
  all: unset;
  font-weight: ${theme.fontWeight.light};
  color: ${theme.color.black};
  font-size: 1.25rem;
`;

const createMenuWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 2rem;
`;
