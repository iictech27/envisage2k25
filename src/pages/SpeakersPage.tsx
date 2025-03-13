import { useRef } from "react";
import Speakers from "../components/Speakers";

const SpeakersPage = () => {
  const speakersRef = useRef<HTMLElement>(null);

  return (
    <section
      id="speakers"
      className="min-h-screen py-20 relative overflow-hidden bg-primary"
      ref={speakersRef}
    >
      {/* Background elements for mobile */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90">
        {/* Cyberpunk city silhouette */}
        <div
          className="absolute bottom-0 left-0 w-full h-[30%] opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 200'%3E%3Cpath fill='%237c3aed' d='M0,200 L0,160 L30,160 L30,150 L45,150 L45,140 L55,140 L55,130 L65,130 L65,150 L75,150 L75,140 L85,140 L85,160 L100,160 L100,140 L110,140 L110,150 L120,150 L120,130 L140,130 L140,150 L150,150 L150,120 L160,120 L160,140 L170,140 L170,130 L185,130 L185,150 L200,150 L200,120 L220,120 L220,150 L230,150 L230,140 L240,140 L240,130 L250,130 L250,150 L260,150 L260,140 L270,140 L270,160 L280,160 L280,150 L290,150 L290,160 L300,160 L300,140 L310,140 L310,150 L320,150 L320,160 L340,160 L340,150 L350,150 L350,140 L360,140 L360,130 L370,130 L370,150 L380,150 L380,140 L390,140 L390,160 L400,160 L400,150 L410,150 L410,140 L420,140 L420,160 L430,160 L430,150 L440,150 L440,130 L450,130 L450,150 L460,150 L460,140 L470,140 L470,130 L480,130 L480,150 L490,150 L490,140 L500,140 L500,160 L510,160 L510,150 L520,150 L520,140 L530,140 L530,130 L540,130 L540,150 L550,150 L550,140 L560,140 L560,160 L570,160 L570,150 L580,150 L580,140 L590,140 L590,160 L600,160 L600,150 L610,150 L610,140 L620,140 L620,130 L630,130 L630,150 L640,150 L640,140 L650,140 L650,160 L660,160 L660,150 L670,150 L670,140 L680,140 L680,130 L690,130 L690,150 L700,150 L700,140 L710,140 L710,160 L720,160 L720,150 L730,150 L730,140 L740,140 L740,130 L750,130 L750,150 L760,150 L760,140 L770,140 L770,160 L780,160 L780,150 L790,150 L790,140 L800,140 L800,130 L810,130 L810,150 L820,150 L820,140 L830,140 L830,160 L840,160 L840,150 L850,150 L850,140 L860,140 L860,130 L870,130 L870,150 L880,150 L880,140 L890,140 L890,160 L900,160 L900,150 L910,150 L910,140 L920,140 L920,130 L930,130 L930,150 L940,150 L940,140 L950,140 L950,160 L960,160 L960,150 L970,150 L970,140 L980,140 L980,130 L990,130 L990,150 L1000,150 L1000,200 Z'/%3E%3C/svg%3E\")",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        ></div>

        {/* Digital circuit pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0V0zm40 40v20h20V40H40zm0 40h20v20H40V80zm20-20h20v20H60V60zm0-20V20h20v20H60z' fill='%237c3aed' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Vignette effect for better focus on content */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(15, 23, 42, 0.6) 100%)",
          }}
        ></div>
      </div>

      <Speakers />
    </section>
  );
};

export default SpeakersPage;
