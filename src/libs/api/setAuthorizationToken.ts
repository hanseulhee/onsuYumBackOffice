import axios from "axios";

function setAuthorizationToken(access_token) {
  if (access_token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default setAuthorizationToken;
