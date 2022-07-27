import { useEffect } from "react";
import { useAuthenticated } from "src/store/index";
import { useNavigate } from "react-router-dom";

export const Authenticated = (props) => {
  const [authenticated, setAuthenticated] = useAuthenticated();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authenticated.check) {
      navigate("/login");
    }
  }, []);
  return props.render;
};
