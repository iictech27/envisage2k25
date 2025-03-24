import { useNavigate } from "react-router-dom";
// import Register from "../components/Register";
import RegisterWithUPI from "../components/RegisterWithUPI";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Go back to the previous page
  };

  // return <Register onClose={handleClose} />;
 return <RegisterWithUPI onClose={handleClose} />;
};

export default RegisterPage;
