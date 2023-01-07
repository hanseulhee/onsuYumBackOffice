/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { button } from "styles/css/button";
import { input } from "styles/css/input";
import { useForm } from "react-hook-form";
import { instance } from "libs/api/api";

function AddRestaurant(isRequest) {
  const { register, handleSubmit } = useForm<IPostRestaurantData>();
  function onSubmit(data: IPostRestaurantData) {
    console.log(data);

    async (formData: FormData) => {
      const config = {
        headers: { "Content-type": "multipart/form-data" },
      };
      instance
        .post<IPostRestaurantData>("/admin/restaurants", formData, config)
        .then((res) => {
          console.log(res);
        });
    };
  }

  return (
    <section css={paddingWrapper}>
      <span css={title}>식당 추가하기</span>
      <form onSubmit={handleSubmit(onSubmit)} css={wrapper}>
        <div css={inputLabelWrapper}>
          <label htmlFor="name" css={labelWrapper}>
            식당 이름
          </label>
          <input
            id="name"
            placeholder="name"
            css={inputWrapper}
            {...register("name", { required: true })}
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="phone" css={labelWrapper}>
            전화번호
          </label>
          <input
            id="phone"
            placeholder="phone"
            css={inputWrapper}
            {...register("phone", { required: true })}
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="summary" css={labelWrapper}>
            식당 한 줄 설명
          </label>
          <input
            id="summary"
            placeholder="summary"
            css={inputWrapper}
            {...register("summary", { required: true, maxLength: 17 })}
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="location" css={labelWrapper}>
            위치
          </label>
          <input
            id="location"
            placeholder="location"
            css={inputWrapper}
            {...register("location", { required: true })}
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="latitude" css={labelWrapper}>
            위도
          </label>
          <input
            id="latitude"
            type="number"
            placeholder="latitude"
            css={inputWrapper}
            {...register("latitude", { required: true })}
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="longitude" css={labelWrapper}>
            경도
          </label>
          <input
            id="longitude"
            type="number"
            placeholder="longitude"
            css={inputWrapper}
            {...register("longitude", { required: true })}
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="time" css={labelWrapper}>
            영업시간
          </label>
          <input
            id="time"
            placeholder="time"
            css={inputWrapper}
            {...register("time", { required: true })}
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="insideImg" css={labelWrapper}>
            안쪽 이미지 (detail 페이지에서 보일 이미지)
          </label>
          <input
            id="insideImg"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="outsideImg" css={labelWrapper}>
            바깥쪽 이미지 (placeCard에 보일 이미지)
          </label>
          <input
            id="outsideImg"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <div css={buttonWrapper}>
          <button type="submit" css={submitButton}>
            추가하기
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddRestaurant;

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
