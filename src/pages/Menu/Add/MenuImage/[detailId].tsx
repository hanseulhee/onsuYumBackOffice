/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { button } from "styles/css/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { API_BASE_URL } from "constants/common";
import axios from "axios";

function AddMenuImage() {
  const {
    query: { detailId },
  } = useRouter();

  const [image, setImage] = useState<File>();

  const onChangemenuImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    formData.append("file", e.currentTarget.value[0]);
    setImage(files);
  };

  function onSubmit() {
    if (image === undefined) {
      router.push("/Restaurants");
      return;
    }
    
    const formData = new FormData();
    formData.append("image", image);

    axios
      .post<{}, IMenuImageModify>(
        `${API_BASE_URL}/admin/menus/${detailId}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            withCredentials: true,
          },
        }
      )
      .then(() => {
        alert("메뉴 이미지를 등록하였습니다.");
      });
  }

  const router = useRouter();
  const { handleSubmit } = useForm<IMenuImageModify>();

  return (
    <section css={paddingWrapper}>
      <span css={title}>메뉴 이미지 등록하기</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={wrapper}
        encType="multipart/form-data"
        method="post"
      >
        <div css={inputLabelWrapper}>
          <label htmlFor="image" css={labelWrapper}>
            메뉴 이미지 (이미지가 없을 경우 바로 업로드 할 수 있으나 있을 경우
            삭제 후 이미지 업로드가 가능합니다.)
          </label>
          <input
            id="image"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onChangemenuImageFile}
            required
          />
        </div>
        <div css={buttonWrapper}>
          <button css={submitButton}>등록하기</button>
        </div>
      </form>
    </section>
  );
}

export default AddMenuImage;

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

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1rem;
`;
