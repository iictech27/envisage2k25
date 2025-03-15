import { useRef } from "react";
import Events from "../components/Events";
import { useTheme } from "../styles/ThemeProvider";

const EventsPage = () => {
  const eventsRef = useRef<HTMLElement>(null);
  const theme = useTheme();

  return (
    <section
      id="events"
      className="min-h-screen relative"
      ref={eventsRef}
      style={{ backgroundColor: "var(--color-background-default)" }}
    >
      <Events />
    </section>
  );
};

export default EventsPage;
