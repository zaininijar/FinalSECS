import { useEffect } from "react";
import { useAuthenticated } from "src/store/index";
import { useNavigate } from "react-router-dom";

export const Authenticated = (props) => {
  const [authenticated, setAuthenticated] = useAuthenticated();
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  useEffect(() => {
    if (access_token === null) {
      navigate("/login");
    }
  }, []);
  return props.render;
};
