import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "src/store/index";

export const Guest = (props) => {
  const [authenticated, setAuthenticated] = useAuthenticated();
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  useEffect(() => {
    if (access_token) {
      navigate("/dashboard");
    }
  }, []);
  return props.render;
};
