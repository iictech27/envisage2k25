import { useRef } from "react";
import Speakers from "../components/Speakers";

const SpeakersPage = () => {
  const speakersRef = useRef<HTMLElement>(null);

  return (
    <section
      id="speakers"
      className="min-h-screen py-20 relative overflow-hidden"
      ref={speakersRef}
    >
      <Speakers />
    </section>
  );
};

export default SpeakersPage;
