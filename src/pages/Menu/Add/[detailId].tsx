/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { button } from "styles/css/button";
import { input } from "styles/css/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { API_BASE_URL } from "constants/common";
import axios from "axios";

function AddMenu() {
  const {
    query: { detailId },
  } = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [menuImage, setMenuImage] = useState<File>();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.valueAsNumber);
  };

  const onChangeMenuImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuImage((e.target.files as FileList)[0]);
  };

  function onSubmit() {
    if (menuImage === undefined) {
      router.push("/Restaurants");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("menuImage", menuImage);

    axios.post<{}, IPostMenu>(
      `${API_BASE_URL}/admin/restaurants/${detailId}/menus`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          withCredentials: true,
        },
      }
    );
  }

  const router = useRouter();
  const { register, handleSubmit } = useForm<IPostMenu>();

  return (
    <section css={paddingWrapper}>
      <span css={title}>메뉴 추가하기</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={wrapper}
        encType="multipart/form-data"
        method="post"
      >
        <div css={inputLabelWrapper}>
          <label htmlFor="name" css={labelWrapper}>
            메뉴 이름
          </label>
          <input
            id="name"
            placeholder="name"
            css={inputWrapper}
            {...register("name")}
            onChange={onChangeName}
            required
          />
        </div>

        <div css={inputLabelWrapper}>
          <label htmlFor="description" css={labelWrapper}>
            메뉴 한 줄 설명
          </label>
          <input
            id="description"
            placeholder="description"
            css={inputWrapper}
            {...register("description", { required: true, maxLength: 17 })}
            onChange={onChangeDescription}
            required
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="price" css={labelWrapper}>
            가격
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
          <label htmlFor="menuImage" css={labelWrapper}>
            메뉴 이미지
          </label>
          <input
            id="menuImage"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onChangeMenuImageFile}
            required
          />
        </div>
        <div css={buttonWrapper}>
          <button css={submitButton}>추가하기</button>
        </div>
      </form>
    </section>
  );
}

export default AddMenu;

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
