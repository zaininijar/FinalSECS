import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "src/store/index";

export const Guest = (props) => {
  const [authenticated, setAuthenticated] = useAuthenticated();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  return props.render;
};
