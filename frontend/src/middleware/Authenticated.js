import { useEffect } from "react";
import { useAuthenticated } from "src/store/index";
import { useNavigate } from "react-router-dom";

export const Authenticated = (props) => {
  const [authenticated, setAuthenticated] = useAuthenticated();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, []);
  return props.render;
};
