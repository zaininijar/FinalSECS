import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "src/store/index";

export const Guest = (props) => {
  const [authenticated, setAuthenticated] = useAuthenticated();
  const navigate = useNavigate();
  useEffect(() => {
    if (authenticated.check) {
      navigate("/dashboard");
    }
  }, []);
  return props.render;
};
