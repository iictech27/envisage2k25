import { useNavigate } from "react-router-dom";
import Register from "../components/Register";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Go back to the previous page
  };

  return <Register onClose={handleClose} />;
};

export default RegisterPage;
