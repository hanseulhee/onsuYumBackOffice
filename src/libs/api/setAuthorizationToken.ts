import { instance } from "libs/api/api";

function setAuthorizationToken(access_token) {
  if (access_token) {
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${access_token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
}

export default setAuthorizationToken;
