/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { button } from "styles/css/button";
import { input } from "styles/css/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useMenu from "hooks/api/useMenu";
import { instance } from "libs/api/api";
import { ChangeEvent, useState } from "react";

function ModifyMenu() {
  const {
    query: { detailId },
  } = useRouter();

  const { register, handleSubmit } = useForm<IMenuModify>();
  const { menu } = useMenu({ detailId });

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>("");

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.valueAsNumber);
  };

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  async function modifyMenu() {
    await instance
      .patch<{}, IPostMenuData>(
        `/admin/menus/${detailId}`,
        {
          name: name,
          price: price,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            withCredentials: true,
          },
        }
      )
      .then(() => {
        alert("수정하였습니다.");
      });
  }

  return (
    <section css={paddingWrapper}>
      <span css={title}>메뉴 수정하기</span>
      <form onSubmit={handleSubmit(modifyMenu)} css={wrapper}>
        <div css={inputLabelWrapper}>
          <label htmlFor="name" css={labelWrapper}>
            메뉴 이름
          </label>
          <input
            id="name"
            placeholder={menu?.name}
            css={inputWrapper}
            {...register("name")}
            onChange={onChangeName}
            required
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="price" css={labelWrapper}>
            메뉴 가격
          </label>
          <input
            id="price"
            type="number"
            placeholder="price"
            css={inputWrapper}
            {...register("price")}
            onChange={onChangePrice}
            required
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="description" css={labelWrapper}>
            식당 한 줄 설명
          </label>
          <input
            id="description"
            placeholder={menu?.description}
            css={inputWrapper}
            {...register("description")}
            onChange={onChangeDescription}
            required
          />
        </div>
        <div css={buttonWrapper}>
          <button type="submit" css={submitButton}>
            수정하기
          </button>
        </div>
      </form>
    </section>
  );
}

export default ModifyMenu;

const paddingWrapper = css`
  padding: 2rem;
`;

const wrapper = css`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  padding: 0.8rem 0;
`;

const inputLabelWrapper = css`
  display: flex;
  flex-direction: column;
`;

const title = (theme: Theme) => css`
  font-size: 1.85rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.yellow};
`;

const submitButton = (theme: Theme) => css`
  ${button(theme)}
  background-color: ${theme.color.yellow};
`;

const labelWrapper = (theme: Theme) => css`
  font-weight: ${theme.fontWeight.bold};
  margin: 0.5rem 0;
`;

const inputWrapper = (theme: Theme) => css`
  ${input(theme)}
  font-size: 1rem;
  height: 1rem;
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1rem;
`;
