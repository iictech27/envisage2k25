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
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
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
      image: "/images/Aaquib Ahmad.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      id: 2,
      name: "Aadarsh Sharma",
      role: "Convenor of External Affairs",
      bio: "AI specialist and full-stack developer with expertise in creating immersive digital experiences.",
      image: "/images/Aadarsh Sharma.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 3,
      name: "Manash Goyal",
      role: "Co-Convenor",
      bio: "Award-winning digital artist specializing in cyberpunk aesthetics and futuristic UI/UX design.",
      image: "/images/Manash-Goyal.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      id: 4,
      name: "Payel Chaudhuri",
      role: "Campus Director HULT Prize",
      bio: "Cryptography expert focused on building secure and decentralized metaverse infrastructure.",
      image: "/images/Payel Chaudhuri.webp",
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 5,
      name: "Ashhar Ali Ahmed",
      role: "Head of Tech wing",
      bio: "Specializes in creating breathtaking virtual worlds and interactive metaverse environments.",
      image: "/images/Ashhar Ali Ahmed.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 6,
      name: "Kumar Aditya",
      role: "Head of Tech wing",
      bio: "Human-computer interaction specialist focused on creating intuitive metaverse experiences.",
      image: "/images/Kumar Aditya.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 7,
      name: "Utsav Tiwari",
      role: "Co-Head of Tech wing",
      bio: "Expert in creating engaging gameplay mechanics and interactive experiences in virtual worlds.",
      image: "/images/Utsav Tiwari.webp",
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 8,
      name: "Sreejita Mukhopadhyay",
      role: "Head of Graphics wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Sreejita Mukhopadhyay.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 9,
      name: "Amit Saha",
      role: "Head of Graphics wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Amit Saha.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 10,
      name: "Atul Kumar Singh",
      role: "Co-Head of Graphics wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Atul Singh.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 11,
      name: "Shubham Keshri",
      role: "Head of Management and Resource wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Shubham Keshri.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 12,
      name: "Sachin Sharma",
      role: "Co-head of Management wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Sachin Sharma.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 13,
      name: "Sheetal Raj",
      role: "Co-head of Management wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Sheetal Raj.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 14,
      name: "Soumyadeep Adhikary",
      role: "Head of Press wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Soumyadeep Adhikary.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 15,
      name: "Akshat Alok",
      role: "Co-head of Press wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Akshat Alok.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 16,
      name: "Pushpendra Lal",
      role: "Head of Public Relations wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Pushpendra Lal.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 17,
      name: "Shubhankar Banerjee",
      role: "Co-head of Public Relations wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Shubhankar Banerjee.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 18,
      name: "Sananda Roy Chowdhury",
      role: "Co-head of Resource wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Sananda Roy Chowdhury.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 19,
      name: "Vaibhav Anand",
      role: "Co-head of Resource wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Vaibhav Anand.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 20,
      name: "Uddipta Kar",
      role: "Head of Social Media wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Uddipta Kar.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 21,
      name: "Pritam Ghosh",
      role: "Co-head of Social Media wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Pritam Ghosh.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 22,
      name: "Srija Chandra",
      role: "Co-head of Social Media wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Srija Chandra.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 23,
      name: "Arunabha Sengupta",
      role: "Head of Sponsorship wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Arunabha.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 24,
      name: "Sarthak Sarkar",
      role: "Co-head of Sponsorship wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Sarthak.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 25,
      name: "Makhdhum Hossain",
      role: "Co-head of Sponsorship wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Makhdum Hossain.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 26,
      name: "Abhimanyu Kanjilal",
      role: "Head of Start-Up wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Abhimanyu Kanjilal1.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 27,
      name: "Harshankit Raj",
      role: "Co-head of Start-Up wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Harshankit Raj.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 28,
      name: "Debabrata Debnath",
      role: "Co-head of Start-Up wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Debabrata Debnath.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 29,
      name: "Ayush Dev",
      role: "Head of Content Wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Ayush Dev.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 30,
      name: "Aparajita Goswami",
      role: "Co-head of Content Wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Aparajita Goswami.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 31,
      name: "Rajgopal Kumar",
      role: "Head of UI/UX wing",
      bio: "Building and nurturing our vibrant community of metaverse enthusiasts and creators.",
      image: "/images/Rajgopal Kumar.webp",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
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

                  {/* Social Links */}
                  <div className="flex space-x-3">
                    {member.socialLinks.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-neon transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    )}
                    {member.socialLinks.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-neon transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {member.socialLinks.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-neon transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                      </a>
                    )}
                  </div>
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
