import { instance } from "libs/api/api";
import setAuthorizationToken from "libs/api/setAuthorizationToken";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

function Home() {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <label>Username</label>
      <input
        placeholder="Username"
        value={username}
        onChange={onUsernameHandler}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="PW"
        value={password}
        onChange={onPasswordHandler}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Home;
