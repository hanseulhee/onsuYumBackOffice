/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { button } from "styles/css/button";
import { input } from "styles/css/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useGetRestaurantById from "hooks/api/useGetRestaurantById";
import { ChangeEvent, useState } from "react";
import { instance } from "libs/api/api";

function ModifyRestaurant() {
  const router = useRouter();

  const {
    query: { detailId },
  } = useRouter();

  const { restaurant } = useGetRestaurantById({
    detailId,
  });

  const { register, handleSubmit } = useForm<IPatchRestaurant>();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [time, setTime] = useState<string[]>();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const onChangeSummary = (e: ChangeEvent<HTMLInputElement>) => {
    setSummary(e.target.value);
  };

  const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onChangeLatitude = (e: ChangeEvent<HTMLInputElement>) => {
    setLatitude(e.target.valueAsNumber);
  };

  const onChangeLongitude = (e: ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.valueAsNumber);
  };

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime([e.target.value]);
  };

  async function modifyRestaurant() {
    await instance
      .patch<{}, IPatchRestaurant>(
        `/admin/restaurants/${detailId}`,
        {
          name: name,
          phone: phone,
          summary: summary,
          location: location,
          latitude: latitude,
          longitude: longitude,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            withCredentials: true,
          },
        }
      )
      .then(() => {
        router.push("/Restaurants");
      });
  }

  return (
    <section css={paddingWrapper}>
      <span css={title}>식당 수정하기</span>
      <form onSubmit={handleSubmit(modifyRestaurant)} css={wrapper}>
        <div css={inputLabelWrapper}>
          <label htmlFor="name" css={labelWrapper}>
            식당 이름
          </label>
          <p css={originalContent}>{restaurant?.name}</p>
          <input
            id="name"
            placeholder={restaurant?.name}
            css={inputWrapper}
            {...register("name")}
            onChange={onChangeName}
            required
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="phone" css={labelWrapper}>
            전화번호 (xxx-xxxx-xxxx 형태로 적어주세요)
          </label>
          <p css={originalContent}>{restaurant?.phone}</p>
          <input
            id="phone"
            placeholder={restaurant?.phone}
            css={inputWrapper}
            {...register("phone")}
            onChange={onChangePhone}
            maxLength={13}
            required
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="summary" css={labelWrapper}>
            식당 한 줄 설명
          </label>
          <p css={originalContent}>{restaurant?.summary}</p>
          <input
            id="summary"
            placeholder={restaurant?.summary}
            css={inputWrapper}
            {...register("summary", { maxLength: 17 })}
            onChange={onChangeSummary}
            required
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="location" css={labelWrapper}>
            위치
          </label>
          <p css={originalContent}>{restaurant?.location}</p>
          <input
            id="location"
            placeholder={restaurant?.location}
            css={inputWrapper}
            {...register("location")}
            onChange={onChangeLocation}
            required
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="latitude" css={labelWrapper}>
            위도
          </label>
          <p css={originalContent}>{restaurant?.latitude}</p>
          <input
            id="latitude"
            type="number"
            placeholder="latitude"
            css={inputWrapper}
            {...register("latitude")}
            onChange={onChangeLatitude}
            required
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="longitude" css={labelWrapper}>
            경도
          </label>
          <p css={originalContent}>{restaurant?.longitude}</p>
          <input
            id="longitude"
            type="number"
            placeholder="longitude"
            css={inputWrapper}
            {...register("longitude")}
            onChange={onChangeLongitude}
            required
          />
        </div>
        <div css={inputLabelWrapper}>
          <label htmlFor="time" css={labelWrapper}>
            영업시간
          </label>
          <p css={originalContent}>{restaurant?.time}</p>
          <input
            id="time"
            placeholder="time"
            css={inputWrapper}
            {...register("time")}
            onChange={onChangeTime}
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

const originalContent = (theme: Theme) => css`
  font-size: 0.85rem;
  font-weight: ${theme.fontWeight.light};
  color: ${theme.color.grey500};
`;
