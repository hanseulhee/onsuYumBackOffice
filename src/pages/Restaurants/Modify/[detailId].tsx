/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { button } from "styles/css/button";
import { input } from "styles/css/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useGetRestaurantById from "hooks/api/useGetRestaurantById";
import useGetRestaurant from "hooks/api/useGetRestaurant";
import { useEffect, useState } from "react";

function ModifyRestaurant() {
  const { register, handleSubmit } = useForm<IPatchRestaurant>();
  const [inputValue, setInputValue] = useState<string>("");
  
  const handlePress = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  useEffect(() => {
    if (inputValue.length === 10) {
      setInputValue(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (inputValue.length === 13) {
      setInputValue(
        inputValue
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [inputValue]);

  const {
    query: { detailId },
  } = useRouter();

  const { restaurant, isLoading } = useGetRestaurantById({
    detailId,
  });

  let restaurantId = restaurant?.id;

  const { modifyRestaurant } = useGetRestaurant();

  if (isLoading) {
    return "로딩중";
  }

  function onSubmit() {
    modifyRestaurant(restaurantId);
  }

  return (
    <section css={paddingWrapper}>
      <span css={title}>식당 수정하기</span>
      <form onSubmit={handleSubmit(onSubmit)} css={wrapper}>
        <div css={inputLabelWrapper}>
          <label htmlFor="name" css={labelWrapper}>
            식당 이름
          </label>
          <input
            id="name"
            placeholder={restaurant?.name}
            css={inputWrapper}
            {...register("name")}
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="phone" css={labelWrapper}>
            전화번호 (xxx-xxxx-xxxx 형태로 적어주세요)
          </label>
          <input
            id="phone"
            placeholder={restaurant?.phone}
            css={inputWrapper}
            {...register("phone")}
            onChange={handlePress}
            maxLength={13}
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="summary" css={labelWrapper}>
            식당 한 줄 설명
          </label>
          <input
            id="summary"
            placeholder={restaurant?.summary}
            css={inputWrapper}
            {...register("summary", { maxLength: 17 })}
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="location" css={labelWrapper}>
            위치
          </label>
          <input
            id="location"
            placeholder={restaurant?.location}
            css={inputWrapper}
            {...register("location")}
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
            {...register("latitude")}
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
            {...register("longitude")}
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
            {...register("time")}
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

export default ModifyRestaurant;

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
