import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";

import TeamMemberModal from "../components/ShowTeamModal";

// 3D Background Component
const Background = () => {
  return (
    <>
      <color attach="background" args={["#0f172a"]} />
      <fog attach="fog" args={["#0f172a", 8, 30]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
      {/* Particle system */}
      <Sparkles
        count={200}
        scale={20}
        size={1}
        speed={0.3}
        opacity={0.5}
        color="#22d3ee"
      />
      {/* Grid plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]}>
        <planeGeometry args={[60, 60, 60, 60]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#22d3ee"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  );
};

// Types for selected events and team members
interface Event {
  id: number;
  title: string;
  requiresTeam: boolean;
}

interface TeamMember {
  name: string;
  email: string;
  year:string;
  department:string
}

const ProfilePage: React.FC = () => {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([
    { id: 1, title: "HACK-UR-WAY", requiresTeam: true },
    { id: 2, title: "VENTURE VAULT", requiresTeam: false },
    { id: 2, title: "B-Plan", requiresTeam: true },
    { id: 2, title: "B-Plan", requiresTeam: true },
    { id: 2, title: "B-Plan", requiresTeam: true },
  ]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [eventId, setEventId] = useState<number | null>(null);
  const [teamMembers, setTeamMembers] = useState<Record<number, TeamMember[]>>({});

  // Function to handle adding team members
  const handleAddTeamMember = (name: string, email: string, year:string, department:string) => {
    if (eventId !== null) {
      setTeamMembers((prev) => ({
        ...prev,
        [eventId]: [...(prev[eventId] || []), { name, email, year, department }],
      }));
      setShowModal(false); 
    }
  };

  // Function to show the modal for a selected event
  const handleShowTeamMember = (eventId: number) => {
    setEventId(eventId);
    setShowModal(true); // Open the modal when button is clicked
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <Background />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90 z-10">
        {/* Additional radial gradient for better text contrast */}
        <div className="absolute inset-0 bg-radial-gradient"></div>
        {/* Vignette effect for better focus on content */}
        <div className="absolute inset-0 vignette-effect"></div>
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 py-16 z-20">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4">
              <span className="text-white font-rovelink">PROFILE</span>
              <span className="text-accent font-karnivor"> PAGE</span>
            </h1>
            <div className="h-1 w-40 sm:w-60 md:w-40 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-6 mb-8"></div>
          </motion.div>

          {/* Profile Info Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white/10 p-8 sm:p-10 md:p-12 rounded-xl shadow-lg backdrop-blur-lg"
          >
            <h2 className="text-2xl sm:text-3xl text-center text-white mb-8 font-bold">User Information</h2>

            {/* User Details */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-between text-sm sm:text-lg text-white">
                <span className="font-bold">Name:</span>
                <span className="text-accent font-bold">Utsav Tiwari</span>
              </div>
              <div className="flex justify-between text-sm sm:text-lg text-white">
                <span className="font-bold">Email:</span>
                <span className="text-accent font-bold">utsavtiwari@gmail.com</span>
              </div>
              <div className="flex justify-between text-sm sm:text-lg text-white">
                <span className="font-bold">Payment Method:</span>
                <span className="text-accent font-bold">Online (Paytm)</span>
              </div>
              <div className="flex justify-between text-sm sm:text-lg text-white">
                <span className="font-bold">Transaction Id:</span>
                <span className="text-accent font-bold">123344533gef4wwt45465644</span>
              </div>
            </div>
          </motion.div>

          <section id="profile">
            <h1 className="text-2xl sm:text-3xl text-center text-white mt-3 font-bold">Your Selected Events</h1>
            <p>Total events selected: {selectedEvents.length}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedEvents.map((event) => (
                <div key={event.id} className="relative">
                  <div className="card mt-2 p-4 bg-white/10 shadow-lg backdrop-blur-lg  rounded shadow-lg">
                    <h3 className="font-bold">{event.title}</h3>

                    {event.requiresTeam && (
                      <button
                        onClick={() => handleShowTeamMember(event.id)}
                        className="show-team-button mt-4 px-4 py-2 cursor-pointer bg-purple-600 text-white rounded"
                      >
                        Add Team Members
                      </button>
                    )}
                  </div>

                  {/* Display the team members if added */}
                  {teamMembers[event.id] && (
                    <div className="mt-2 bg-white/10 shadow-lg backdrop-blur-lg  rounded shadow-lg p-4">
                      <h4>Team Members:</h4>
                      {teamMembers[event.id].map((member, index) => (
                        <div key={index} className="mt-4">
                          <p>Name: {member.name}</p>
                          <p>Email: {member.email}</p>
                          <p>Department: {member.department}</p>
                          <p>Year: {member.year}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal for adding/editing team members */}
            <TeamMemberModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onAddTeamMember={handleAddTeamMember}
              event={selectedEvents.find((e) => e.id === eventId) || null}
            />
          </section>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 z-10 opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0,0 L60,0 L60,10 L10,10 L10,60 L0,60 Z"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            className="animate-enhanced-glow"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-24 h-24 z-10 opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M100,100 L40,100 L40,90 L90,90 L90,40 L100,40 Z"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="2"
            className="animate-enhanced-glow"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProfilePage;
