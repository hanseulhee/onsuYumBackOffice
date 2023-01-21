/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import CreateBtn from "components/Button/CreateBtn";
import DeleteBtn from "components/Button/DeleteBtn";
import ModifyBtn from "components/Button/ModifyBtn";
import { API_BASE_URL } from "constants/common";
import useMenu from "hooks/api/useMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  id: IMenuData["id"];
  name: IMenuData["name"];
  price: IMenuData["price"];
  menuImage: IMenuData["menuImage"];
  description: IMenuData["description"];
}

function MenuList({ id, name, price, menuImage, description }: Props) {
  const {
    query: { detailId },
  } = useRouter();

  const { deleteMenu, deleteMenuImage } = useMenu({
    detailId,
  });

  function onClickMenuDeleteBtn(id: number) {
    if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
      deleteMenu(id);
    }
  }

  function onClickMenuImageDeleteBtn(id: number) {
    if (confirm("해당 메뉴의 이미지를 삭제하시겠습니까?")) {
      deleteMenuImage(id);
      alert("삭제되었습니다!");
    }
  }

  return (
    <div css={wrapper}>
      <div css={itemPlaced}>
        <div css={summaryWrapper}>
          <span css={menuName}>{name}</span>
          <span css={priceText}>설명: {description}</span>
          <span css={priceText}>{price}원</span>
          <div css={menuButtonWrapper}>
            <Link href={`/Menu/Modify/${id}`}>
              <ModifyBtn />
            </Link>
            <DeleteBtn onClick={() => onClickMenuDeleteBtn(id)} />
          </div>
          <div css={menuImageButtonWrapper}>
            <Link href={`/Menu/Add/MenuImage/${id}`}>
              <CreateBtn summary="메뉴 이미지 등록하기" />
            </Link>
            <DeleteBtn
              onClick={() => onClickMenuImageDeleteBtn(id)}
              summary="메뉴 이미지"
            />
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

const menuButtonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 9rem;
  margin: 0.2rem 0;
`;

const menuImageButtonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 17rem;
`;
