/** @jsxImportSource @emotion/react */
import { useRouter } from "next/router";
import { css, Theme } from "@emotion/react";
import useGetRestaurantById from "hooks/api/useGetRestaurantById";

function DetailBabfullMenu() {
  const {
    query: { detailId },
  } = useRouter();

  const { babfullMenus, isLoading } = useGetRestaurantById({
    detailId,
  });

  if (isLoading) {
    return "로딩중";
  }

  return (
    <div css={fullSizeWrapper}>
      {babfullMenus?.menuDate}
      {babfullMenus?.foods}
      {babfullMenus?.deliciousFood}
    </div>
  );
}

export default DetailBabfullMenu;

const fullSizeWrapper = css`
  max-width: 40rem;
  width: 100%;
  margin: 0 auto;
`;
