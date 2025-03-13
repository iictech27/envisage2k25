import { useRef } from "react";
import Events from "../components/Events";

const EventsPage = () => {
  const eventsRef = useRef<HTMLElement>(null);

  return (
    <section
      id="events"
      className="min-h-screen py-20 relative"
      ref={eventsRef}
    >
      <Events />
    </section>
  );
};

export default EventsPage;
