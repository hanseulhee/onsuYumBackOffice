/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import DeleteBtn from "components/Button/DeleteBtn";
import ModifyBtn from "components/Button/ModifyBtn";
import { API_BASE_URL } from "constants/common";
import usePostMenu from "hooks/api/usePostMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  id: IMenuData["id"];
  name: IMenuData["name"];
  price: IMenuData["price"];
  menuImage: IMenuData["menuImage"];
}

function MenuList({ id, name, price, menuImage }: Props) {
  const {
    query: { detailId },
  } = useRouter();

  const { deleteRestaurant } = usePostMenu({
    detailId,
  });

  function onClickDeleteBtn(id: number) {
    if (confirm("삭제하시겠습니까?")) {
      deleteRestaurant(id);
    }
  }

  return (
    <div css={wrapper}>
      <div css={itemPlaced}>
        <div css={summaryWrapper}>
          <span css={menuName}>{name}</span>
          <span css={priceText}>{price}원</span>
          <div css={buttonWrapper}>
            <Link href={`/Menu/Modify/${id}`}>
              <ModifyBtn />
            </Link>
            <DeleteBtn onClick={() => onClickDeleteBtn(id)} />
          </div>
        </div>
        <div css={imgWrapper}>
          {menuImage?.id ? (
            <Image
              src={`${API_BASE_URL}/api/images/${menuImage?.id}`}
              alt="menu img"
              layout="fill"
              css={menuImg}
              priority
            />
          ) : (
            <Image
              src="/images/noImage.png"
              alt="Image in preparation"
              layout="fill"
              css={menuImg}
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuList;

const wrapper = (theme: Theme) => css`
  width: 100%;
  height: fit-content;
  border-bottom: 1px solid ${theme.color.grey100};
`;

const itemPlaced = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.85rem 1.3rem;
`;

const summaryWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const imgWrapper = css`
  position: relative;
  min-width: 8.3rem;
  width: 8.3rem;
  height: 7.5rem;
`;

const menuImg = css`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.6rem;
`;

const menuName = (theme: Theme) => css`
  width: 13rem;
  font-weight: ${theme.fontWeight.bold};
  font-size: 1.25rem;
  margin-bottom: 0.15rem;
`;

const priceText = (theme: Theme) => css`
  color: ${theme.color.grey500};
  font-weight: ${theme.fontWeight.light};
  font-size: 0.9rem;
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 9rem;
`;
