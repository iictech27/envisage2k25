import { useRef } from "react";
import Countdown from "../components/Countdown";

const CountdownPage = () => {
  const countdownRef = useRef<HTMLElement>(null);

  return (
    <section
      id="countdown"
      className="min-h-screen py-20 relative overflow-hidden"
      ref={countdownRef}
    >
      <Countdown />
    </section>
  );
};

export default CountdownPage;
