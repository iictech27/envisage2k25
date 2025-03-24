import { useState, useEffect } from "react";
import Header from "../components/Header";

import CyberpunkBackground3D from "../components/CyberpunkBackground3D";

// Team member interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  
}

const TeamPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [animatedMembers, setAnimatedMembers] = useState<TeamMember[]>([]);

  // Sample team data - replace with your actual team members
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Aaquib Ahmed",
      role: "Convenor",
      bio: "Visionary metaverse architect with 10+ years experience in virtual reality and blockchain technologies.",
      image: "./images/Aaquib Ahmad.webp",
      
    },
    {
      id: 2,
      name: "Aadarsh Sharma",
      role: "Convenor of External Affairs",
      bio: "AI specialist and full-stack developer with expertise in creating immersive digital experiences.",
      image: "./images/Aadarsh Sharma.webp",
      
    },
    {
      id: 3,
      name: "Manash Goyal",
      role: "Co-Convenor",
      bio: "Award-winning digital artist specializing in cyberpunk aesthetics and futuristic UI/UX design.",
      image: "./images/Manash-Goyal.webp",
      
    },
    {
      id: 4,
      name: "Payel Chaudhuri",
      role: "Campus Director HULT Prize",
      bio: "Cryptography expert focused on building secure and decentralized metaverse infrastructure.",
      image: "./images/Payel Chaudhuri.webp",
      
    },
    {
      id: 5,
      name: "Ashhar Ali Ahmed",
      role: "Head of Tech wing",
      bio: "Specializes in creating breathtaking virtual worlds and interactive metaverse environments.",
      image: "./images/Ashhar Ali Ahmed.webp",
      
    },
    {
      id: 6,
      name: "Kumar Aditya",
      role: "Head of Tech wing",
      bio: "Human-computer interaction specialist focused on creating intuitive metaverse experiences.",
      image: "./images/Kumar Aditya.webp",
      
    },
    {
      id: 7,
      name: "Utsav Tiwari",
      role: "Co-Head of Tech wing",
      bio: "Expert in creating engaging gameplay mechanics and interactive experiences in virtual worlds.",
      image: "./images/Utsav Tiwari.webp",
      
    },
    {
      id: 8,
      name: "Sreejita Mukhopadhyay",
      role: "Head of Graphics wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Sreejita Mukhopadhyay.webp",
      
    },
    {
      id: 9,
      name: "Amit Saha",
      role: "Head of Graphics wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Amit Saha.webp",
      
    },
    {
      id: 10,
      name: "Atul Kumar Singh",
      role: "Co-Head of Graphics wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Atul Singh.webp",
      
    },
    {
      id: 11,
      name: "Shubham Keshri",
      role: "Head of Management and Resource wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Shubham Keshri.webp",
      
    },
    {
      id: 12,
      name: "Sachin Sharma",
      role: "Co-head of Management wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Sachin Sharma.webp",
      
    },
    {
      id: 13,
      name: "Sheetal Raj",
      role: "Co-head of Management wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Sheetal Raj.webp",
      
    },
    {
      id: 14,
      name: "Soumyadeep Adhikary",
      role: "Head of Press wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Soumyadeep Adhikary.webp",
      
    },
    {
      id: 15,
      name: "Akshat Alok",
      role: "Co-head of Press wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Akshat Alok.webp",
      
    },
    {
      id: 16,
      name: "Pushpendra Lal",
      role: "Head of Public Relations wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Pushpendra Lal.webp",
      
    },
    {
      id: 17,
      name: "Shubhankar Banerjee",
      role: "Co-head of Public Relations wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Shubhankar Banerjee.webp",
      
    },
    {
      id: 18,
      name: "Sananda Roy Chowdhury",
      role: "Co-head of Resource wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Sananda Roy Chowdhury.webp",
      
    },
    {
      id: 19,
      name: "Vaibhav Anand",
      role: "Co-head of Resource wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Vaibhav Anand.webp",
      
    },
    {
      id: 20,
      name: "Uddipta Kar",
      role: "Head of Social Media wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Uddipta Kar.webp",
      
    },
    {
      id: 21,
      name: "Pritam Ghosh",
      role: "Co-head of Social Media wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Pritam Ghosh.webp",
      
    },
    {
      id: 22,
      name: "Srija Chandra",
      role: "Co-head of Social Media wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Srija Chandra.webp",
      
    },
    {
      id: 23,
      name: "Arunabha Sengupta",
      role: "Head of Sponsorship wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Arunabha.webp",
      
    },
    {
      id: 24,
      name: "Sarthak Sarkar",
      role: "Co-head of Sponsorship wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Sarthak.webp",
      
    },
    {
      id: 25,
      name: "Makhdhum Hossain",
      role: "Co-head of Sponsorship wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Makhdum Hossain.webp",
      
    },
    {
      id: 26,
      name: "Abhimanyu Kanjilal",
      role: "Head of Start-Up wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Abhimanyu Kanjilal1.webp",
      
    },
    {
      id: 27,
      name: "Harshankit Raj",
      role: "Co-head of Start-Up wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Harshankit Raj.webp",
      
    },
    {
      id: 28,
      name: "Debabrata Debnath",
      role: "Co-head of Start-Up wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Debabrata Debnath.webp",
      
    },
    {
      id: 29,
      name: "Ayush Dev",
      role: "Head of Content Wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Ayush Dev.webp",
      
    },
    {
      id: 30,
      name: "Aparajita Goswami",
      role: "Co-head of Content Wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Aparajita Goswami.webp",
      
    },
    {
      id: 31,
      name: "Rajgopal Kumar",
      role: "Head of UI/UX wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "./images/Rajgopal Kumar.webp",
      
    },
  ];

  // Filter categories
  const filters = [
    { id: "all", label: "All Team" },
    { id: "leadership", label: "Administrative Heads" },
    { id: "tech", label: "Tech Wing" },
    { id: "management", label: "Management Wing" },
    { id: "graphics", label: "Graphics Wing" },
    { id: "resource", label: "Resource Wing" },
    { id: "press", label: "Press Wing" },
    { id: "publicRelations", label: "Public Relations Wing" },
    { id: "socialMedia", label: "Social Media Wing" },
    { id: "sponsorship", label: "Sponsorship Wing" },
    { id: "startup", label: "Start-up Wing" },
    { id: "content", label: "Content Wing" },
  ];

  // Filter team members based on active filter
  const getFilteredMembers = () => {
    if (activeFilter === "all") return teamMembers;

    const filterMap: Record<string, string[]> = {
      leadership: [
        "Convenor",
        "Convenor of External Affairs",
        "Co-Convenor",
        "Campus Director HULT Prize",
      ],
      tech: ["Head of Tech wing", "Co-Head of Tech wing"],
      management: [
        "Head of Management and Resource wing",
        "Co-head of Management wing",
      ],
      graphics: ["Head of Graphics wing", "Co-Head of Graphics wing"],
      resource: [
        "Head of Management and Resource wing",
        "Co-head of Resource wing",
      ],
      press: ["Head of Press wing", "Co-head of Press wing"],
      publicRelations: [
        "Head of Public Relations wing",
        "Co-head of Public Relations wing",
      ],
      socialMedia: [
        "Head of Social Media wing",
        "Co-head of Social Media wing",
      ],
      sponsorship: ["Head of Sponsorship wing", "Co-head of Sponsorship wing"],
      startup: ["Head of Start-Up wing", "Co-head of Start-Up wing"],
      content: ["Head of Content Wing", "Co-head of Content Wing"],
    };

    return teamMembers.filter((member) =>
      filterMap[activeFilter]?.includes(member.role),
    );
  };

  // Animate members appearing one by one
  useEffect(() => {
    const filtered = getFilteredMembers();

    // Reset animated members before applying animation
    setAnimatedMembers([]);

    // Use a fresh copy of the array to prevent unintended duplication
    let tempMembers: TeamMember[] = [];

    filtered.forEach((member, index) => {
      setTimeout(() => {
        tempMembers = [...tempMembers, member]; // Maintain a local copy
        setAnimatedMembers([...tempMembers]); // Update state with new copy
      }, index * 150);
    });
  }, [activeFilter]);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
        {/* 3D Background */}
        <CyberpunkBackground3D
          variant="grid"
          intensity={1.2}
          color1="#22d3ee"
          color2="#7c3aed"
          interactive={true}
        />

        {/* Additional visual elements for depth */}
        <div className="absolute inset-0 bg-primary bg-opacity-70 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-rovelink mb-4">
              <span className="text-neon">OUR</span>{" "}
              <span className="text-accent">TEAM</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-neon to-accent mx-auto mb-6"></div>
            <p className="text-white font-futuristic max-w-2xl mx-auto">
              Meet the visionaries, creators, and builders shaping the future of
              the metaverse. Our diverse team brings together expertise in
              blockchain, VR/AR, game development, and digital art.
            </p>
          </div>

          {/* Filters */}
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-4 py-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-lg font-cyber text-sm transition-all duration-300 transform whitespace-nowrap ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-neon to-accent text-white scale-105 shadow-lg"
                    : "bg-gray-900 text-white hover:bg-gray-800 border border-neon/30 hover:scale-105"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {animatedMembers.map((member) => (
              <div
                key={member.id}
                className="glass-card border border-neon/30 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-neon/80 hover:shadow-lg hover:shadow-neon/20 backdrop-blur-sm"
              >
                {/* Member Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary z-10"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-neon opacity-60"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16">
                    <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-accent opacity-60"></div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-cyber text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-neon font-futuristic text-sm mb-3">
                    {member.role}
                  </p>
                  {/* <p className="text-gray-300 text-sm mb-4">{member.bio}</p> */}

                </div>
              </div>
            ))}
          </div>

          {/* Join the Team CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-cyber mb-4">
              <span className="text-white">WANT TO </span>
              <span className="text-neon">JOIN</span>
              <span className="text-accent"> OUR TEAM?</span>
            </h2>
            <p className="text-gray-300 font-futuristic max-w-2xl mx-auto mb-6">
              We're always looking for talented individuals passionate about
              building the future of the metaverse. Check out our open positions
              or send us your portfolio.
            </p>
            <a
              href="/careers"
              className="cyber-button inline-block py-3 px-8 relative overflow-hidden group"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
              <span className="relative z-10">VIEW OPEN POSITIONS</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
