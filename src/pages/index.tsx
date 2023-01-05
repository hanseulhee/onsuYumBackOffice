/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { instance } from "libs/api/api";
import setAuthorizationToken from "libs/api/setAuthorizationToken";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { button } from "styles/css/button";
import { input } from "styles/css/input";

function Signin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onUsernameHandler(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function onPasswordHandler(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let auth = {
      username: username,
      password: password,
    };
    instance
      .post("/api/auth/login", auth)
      .then((res) => {
        console.log(res.data.accessToken);
        localStorage.setItem("accessToken", res.data.accessToken);
        setAuthorizationToken(res.data.accessToken);
        router.push("/Main");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div css={fullWrapper}>
      <form onSubmit={onSubmitHandler} css={formWrapper}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="Username"
          value={username}
          onChange={onUsernameHandler}
          css={signinInput}
        />
        <label htmlFor="password" css={paddingWrapper}>
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="PW"
          value={password}
          onChange={onPasswordHandler}
          css={signinInput}
        />
        <button type="submit" css={signinButton}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Signin;

const fullWrapper = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  font-size: 2rem;
  font-weight: ${theme.fontWeight.bold};
`;

const formWrapper = css`
  display: flex;
  flex-direction: column;
`;

const signinInput = (theme: Theme) => css`
  ${input(theme)}
`;

const signinButton = (theme: Theme) => css`
  ${button(theme)}
  font-size: 1.6rem;
  background-color: ${theme.color.yellow};
  color: ${theme.color.white};
  margin-top: 2rem;
  :hover {
    color: ${theme.color.black};
    transition: all 0.4s;
  }
`;

const paddingWrapper = css`
  padding-top: 1.5rem;
`;
