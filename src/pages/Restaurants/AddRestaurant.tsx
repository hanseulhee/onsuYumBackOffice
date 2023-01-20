/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { button } from "styles/css/button";
import { input } from "styles/css/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { API_BASE_URL } from "constants/common";
import axios from "axios";

function AddRestaurant() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [time, setTime] = useState<string[]>();
  const [insideImg, setInsideImg] = useState<File>();
  const [outsideImg, setOutsideImg] = useState<File>();

  const onChangeInsideImgFile = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    formData.append("file", e.currentTarget.value[0]);
    setInsideImg(files);
  };

  const onChangeOutsideImgFile = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    formData.append("file", e.currentTarget.value[0]);
    setOutsideImg(files);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [inputValue, setInputValue] = useState<string>("");

  function handlePress(e) {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setInputValue(e.target.value);
    }
    setPhone(e.target.value);
  }

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

  function onSubmit() {
    axios
      .post<{}, IPostRestaurantData>(
        `${API_BASE_URL}/admin/restaurants`,
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
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        if (insideImg === undefined || outsideImg === undefined) {
          router.push("/Restaurants");
          return;
        }
        const formData = new FormData();
        formData.append("insideImg", insideImg);
        formData.append("outsideImg", outsideImg);

        axios.post<{}, IPostRestaurantData>(
          `${API_BASE_URL}/admin/restaurants`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              withCredentials: true,
            },
          }
        );
        router.push("/Restaurants");
      });
  }

  const router = useRouter();
  const { register, handleSubmit } = useForm<IPostRestaurantData>();

  return (
    <section css={paddingWrapper}>
      <span css={title}>식당 추가하기</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={wrapper}
        encType="multipart/form-data"
        method="post"
      >
        <div css={inputLabelWrapper}>
          <label htmlFor="name" css={labelWrapper}>
            식당 이름
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
          <label htmlFor="phone" css={labelWrapper}>
            전화번호 (xxx-xxxx-xxxx 형태로 적어주세요)
          </label>
          <input
            id="phone"
            type="tel"
            value={inputValue}
            placeholder="phone"
            css={inputWrapper}
            {...register("phone")}
            onChange={handlePress}
            maxLength={13}
            required
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
            onChange={onChangeSummary}
            required
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
            {...register("location")}
            onChange={onChangeLocation}
            required
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
            onChange={onChangeLatitude}
            required
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
            onChange={onChangeLongitude}
            required
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
            onChange={onChangeTime}
            required
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
            onChange={onChangeInsideImgFile}
            required
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
            onChange={onChangeOutsideImgFile}
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
