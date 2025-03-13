import NeonHero3D from "../components/NeonHero3D";
import { useNavigate } from "react-router-dom";
import EventsPage from "./EventsPage";
import Countdown from "./CountdownPage";
import SpeakersPage from "./SpeakersPage";

const HomePage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <section>
      <NeonHero3D onRegisterClick={handleRegisterClick} />
      <EventsPage />
      <Countdown />
      <SpeakersPage />
    </section>
  );
};

export default HomePage;
