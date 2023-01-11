/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { css, Theme } from "@emotion/react";
import useGetRestaurantById from "hooks/api/useGetRestaurantById";
import MenuList from "components/Menu";

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
    <div>
      <div>
        <span>이미지</span>
        <img src={restaurant?.insideImage.s3Url} alt={restaurant?.name} />
      </div>
      <div>
        <span>전화</span>
        <p>{restaurant?.phone}</p>
        <span>위치</span>
        <p>{restaurant?.location}</p>
      </div>
      {restaurant?.time ? (
        restaurant?.time.map((each, index) => <li key={index}>{each}</li>)
      ) : (
        <li>정보 없음</li>
      )}

      <span>메뉴</span>
      {restaurantMenu.map((menu) => {
        return (
          <MenuList
            key={menu.id}
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
