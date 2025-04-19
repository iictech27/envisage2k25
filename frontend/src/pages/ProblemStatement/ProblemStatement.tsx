/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store";
// import { fetchProblemsThunk } from "../../features/participantSlice";
// import CyberpunkButton from "../../components/CyberpunkButton";

export const problems = [
  {
    _id: "6802168140a25d5ec03acb28",
    title: "Smart Grocery Management",
    description:
      "Raja, a busy working professional with a packed schedule, frequently finds himself throwing away expired food items due to forgotten expiry dates and lack of meal planning. His hectic routine leaves little time for manually tracking grocery usage or coming up with ideas for meals using the ingredients he already has. This leads to unnecessary food waste, increased expenses, and inconvenience. A smart solution is needed to help Raja — and others like him — manage groceries more efficiently by automatically tracking expiry dates, reducing waste, and offering recipe suggestions based on available items.",
    overview: "Track expiry, reduce waste, suggest recipes.",
    category: "Web & Mobile App",
    problemCode: "WEB-001",
  },
  {
    _id: "6802168140a25d5ec03acb29",
    title: "Personal Finance Buddy",
    description:
      "Priya, a college student on a tight budget, struggles to manage her monthly expenses. With limited income from allowances or part-time jobs, she finds it hard to track spending, often overspends, and rarely saves for personal goals—like buying a concert ticket. She needs a simple, smart solution to monitor her expenses, categorize spending, and get personalized money-saving tips.\nThe goal is to build a personal finance assistant that helps students like Priya take control of their finances through features like budget tracking, goal setting, smart insights, and spending alerts—making money management easier and more effective.",
    overview: "Track expenses, save smarter.",
    category: "Web & Mobile App",
    problemCode: "WEB-002",
  },
  {
    _id: "6802168140a25d5ec03acb2a",
    title: "Streamlining Solo Travel Safety for Digital Nomads",
    description:
      "Maya is an avid digital nomad who travels the world while working remotely. While she enjoys exploring new places, she often finds herself anxious about her safety, especially when traveling alone in unfamiliar cities. There are limited resources that combine safety information with real-time updates, such as nearby safe zones, emergency contacts, and trusted community recommendations. Maya dreams of a solution that would give her peace of mind by helping her navigate new places with confidence, alerting her to potential risks and offering immediate support in case of emergencies.",
    overview: "Real-time safety alerts for solo travelers.",
    category: "Digital Nomads",
    problemCode: "DN-001",
  },
  {
    _id: "6802168140a25d5ec03acb2b",
    title: "Neighborhood Safety & Alert Network",
    description:
      "Ayesha, a concerned mother and active member of her community, often worries about the safety of her neighborhood. From suspicious activity to minor incidents, there's no quick or reliable way for residents to report concerns or stay informed about local safety issues. By the time word spreads, it's often too late to act. This lack of communication creates anxiety and leaves residents unprepared. A smart solution is needed to help Ayesha — and communities like hers — stay safe by enabling real-time alerts, easy reporting of incidents, and a connected neighborhood network that fosters collective awareness and response.",
    overview: "Report threats, alert neighbors.",
    category: "Web & Mobile App",
    problemCode: "WEB-003",
  },
  {
    _id: "6802168140a25d5ec03acb2c",
    title: "Elderly Care Reminder System",
    description:
      "Rahul’s grandfather, who lives with him, often forgets to take his medicines on time. Despite Rahul’s best efforts, his busy schedule makes it difficult to keep track of his grandfather’s daily health routines. Missed medications or appointments can lead to serious health issues and added stress for the whole family. Rahul needs a simple, reliable solution that reminds his grandfather about his medications and appointments — while also keeping Rahul informed. A smart system is needed to support elderly care through timely reminders, health tracking, and caregiver alerts, helping families like Rahul’s ensure better care with peace of mind.",
    overview: "Med reminders, family check-ins.",
    category: "Web & Mobile App",
    problemCode: "WEB-004",
  },
  {
    _id: "6802168140a25d5ec03acb2d",
    title: "AI – Mental Health Support for Gig Workers",
    description:
      "Deepak, a Swiggy delivery partner, works long hours under stressful conditions, often without proper breaks or support. He feels constantly exhausted and demotivated but doesn’t realize he may be experiencing burnout. Like many gig workers, Deepak lacks access to mental health resources, emotional support, or even someone to talk to. The irregular schedules and job insecurity only make things worse. A smart solution is needed to help Deepak — and gig workers like him — monitor their mental well-being, access support tools, receive AI-driven mood insights, and find ways to de-stress through personalized guidance, all while preserving their privacy.",
    overview: "AI stress alerts, wellness tips.",
    category: "AI/ML Solution",
    problemCode: "AI-001",
  },
  {
    _id: "6802168140a25d5ec03acb2e",
    title: "Smart Resume & Job Match Tool",
    description:
      "Ananya has sent over 100 resumes to potential employers but has received no replies. Despite her qualifications, she feels lost in the sea of job applications and struggles to stand out. She wishes for a tool that could help her tailor her resumes, match them with the right job opportunities, and even highlight her strengths in a way that resonates with employers. A smart solution is needed to help Ananya — and job seekers like her — optimize their resumes, get personalized job recommendations, and improve their chances of landing interviews through AI-driven matching and insights.",
    overview: "Resume AI, perfect job matches.",
    category: "AI/ML Solution",
    problemCode: "AI-002",
  },
  {
    _id: "6802168140a25d5ec03acb2f",
    title: "AI-Driven Daily Habit Builder",
    description:
      "Vikram wants to build a consistent gym habit but keeps failing. He starts strong, but soon the motivation fades, and his routine falls apart. He imagines an AI-powered system that could understand his challenges, track his progress, and offer personalized encouragement. A smart solution is needed to help Vikram — and others like him — develop healthy habits by providing tailored reminders, motivational insights, habit tracking, and progress updates, ensuring they stay on course and build lasting routines, whether it’s for the gym, dieting, or other personal goals.",
    overview: "AI habit coach, tiny wins.",
    category: "AI/ML Solution",
    problemCode: "AI-003",
  },
  {
    _id: "6802168140a25d5ec03acb30",
    title: "Community Skill Barter Platform",
    description:
      "Neha is an excellent graphic designer but struggles with coding. She often finds herself wishing for a way to get help with programming without having to hire expensive developers. She dreams of a platform where people like her can exchange skills with others in their community, offering their expertise in design in exchange for coding assistance. A smart solution is needed to create a Community Skill Barter Platform where individuals can connect, share their skills, and trade services, fostering collaboration and helping everyone learn, grow, and accomplish more without financial barriers.",
    overview: "Trade skills, no money.",
    category: "Community Platform",
    problemCode: "COM-001",
  },
  {
    _id: "6802168140a25d5ec03acb31",
    title: "Freelancer Marketplace with Smart Contracts",
    description:
      "Ravi, a freelancer, is tired of clients ghosting him after he delivers his work. Despite his best efforts, he often ends up without payment or clear communication, leaving him frustrated and unpaid. He wishes for a platform that guarantees fair compensation and accountability. A smart solution is needed to build a Freelancer Marketplace with Smart Contracts, where freelancers like Ravi can securely execute projects, with automated contracts ensuring payment upon completion. This system will eliminate disputes, protect both parties, and create a trusted environment where freelancers can focus on their work, knowing they’ll get paid fairly and on time.",
    overview: "No scams, auto-payments.",
    category: "Blockchain",
    problemCode: "BC-001",
  },
  {
    _id: "6802168140a25d5ec03acb32",
    title: "Transparent Donation Tracker",
    description:
      "Aditi regularly donates to various NGOs, but she often wonders where her money actually goes and how it's being used. Despite trusting the organizations, she feels disconnected from the impact her contributions make. She wishes for a system that provides transparency, showing exactly how her donations are spent and the outcomes they generate. A smart solution is needed to create a Transparent Donation Tracker, where donors like Aditi can see a real-time breakdown of their donations, track project progress, and receive updates on the difference their contributions are making, ensuring trust and encouraging more giving.",
    overview: "Track donations, no secrets.",
    category: "Blockchain",
    problemCode: "BC-002",
  },
  {
    _id: "6802168140a25d5ec03acb33",
    title: "Empowering Remote Workers with Task/Goal Accountability",
    description:
      "Mark is a remote worker who often struggles with productivity and staying accountable to his goals. While he enjoys the flexibility of working from home, he finds it hard to stick to a routine without the structure of an office environment. He wishes for a tool that would not only track his tasks but also hold him accountable by rewarding small milestones, setting up virtual challenges with friends, and encouraging healthy work habits like taking breaks and maintaining work-life balance. The goal is to gamify productivity in a way that motivates remote workers to stay on track and reach their goals.",
    overview: "Gamified productivity and goal tracking.",
    category: "Digital Nomads",
    problemCode: "DN-002",
  },
  {
    _id: "6802168140a25d5ec03acb34",
    title: "AI – Personalized Education for Remote Learning",
    description:
      "8th grader Kavya finds online classes boring and struggles to stay engaged with the generic teaching methods. She often feels left behind as the pace doesn’t match her learning style. Kavya wishes for an AI tutor that can personalize lessons, track her progress, and make learning more interactive and fun. A smart solution is needed to create an AI-powered Personalized Education System for remote learning, where students like Kavya can receive customized lessons, real-time feedback, and engaging content tailored to their unique strengths and weaknesses, helping them stay motivated and excel in their studies.",
    overview: "AI tutor, learns your way.",
    category: "AI/ML Solution",
    problemCode: "AI-004",
  },
  {
    _id: "6802168140a25d5ec03acb35",
    title: "AI-Powered Legal Assistant for Contracts",
    description:
      "Startup founder Raj often gets confused by the legal jargon in contracts, making him anxious about signing agreements. He needs a simple way to understand complex legal terms and ensure he’s not missing critical clauses. Raj wishes for an AI-powered assistant that can analyze contracts, explain terms in plain language, and highlight important details or potential risks. A smart solution is needed to create an AI-powered Legal Assistant for Contracts, helping entrepreneurs like Raj quickly and easily understand legal documents, make informed decisions, and avoid costly mistakes, all without the need for expensive legal consultations.",
    overview: "AI lawyer, simplifies contracts.",
    category: "AI/ML Solution",
    problemCode: "AI-005",
  },
  {
    _id: "6802168140a25d5ec03acb36",
    title: "Decentralized Identity Wallet",
    description:
      "Techie Aarav hates remembering countless passwords and is constantly worried about data breaches and identity theft. With so many online accounts, keeping track of login details and securing personal information has become a major hassle. He wishes for a more secure, hassle-free solution to manage his digital identity. A smart solution is needed to create a Decentralized Identity Wallet, allowing Aarav and others to store and manage their personal data securely, using blockchain technology. This system would provide a single, encrypted access point to verify identity, eliminating the need for multiple passwords and reducing the risk of data leaks.",
    overview: "Own your ID, no leaks.",
    category: "Blockchain",
    problemCode: "BC-003",
  },
  {
    _id: "68029066d86c28102dcb4e44",
    title: "Open Innovation: Build What Matters",
    description:
      "Why limit innovation to predefined problems? Some of the best solutions come from exploring new ideas that don’t fit within traditional boundaries. The challenge is to create an open platform where innovators can propose their own problems and solutions, without restrictions, while tapping into the collective creativity of the community. This approach encourages out-of-the-box thinking and empowers individuals to build what truly matters to them and society. A smart solution is needed to foster Open Innovation, enabling people to connect, collaborate, and create solutions that go beyond conventional constraints, driving meaningful change in various sectors.",
    overview:
      "No constraints. No boundaries. Just innovation. Bring your own problem, build your own solution.",
    category: "Open Innovation",
    problemCode: "ON-001",
  },
];

const Card = ({ problem }: { problem: any }) => {
  return (
    <div className="perspective-[1000px]">
      <div className="relative w-[220px] h-[300px] cursor-pointer transition-all duration-200 group">
        <div className="absolute inset-0 z-0 flex items-center justify-center rounded-[12px] border border-[#00ffaa]/20 bg-[linear-gradient(160deg,_#0f172a_0%,_#1e293b_100%)] shadow-[0_0_30px_-10px_rgba(0,255,170,0.3)] overflow-hidden transition-all duration-500 transform-style-preserve-3d group-hover:shadow-[0_0_50px_-10px_rgba(0,255,170,0.5)]">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
            <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzAgNjBINHYtMjZoMjZ2MjZ6TTYwIDYwSDM0di0yNmgydjI0aDI0djI2ek0zNCAzNHYtMjZoMjZ2MjZIMzR6TTYgMzRINHYtMjZoMjZ2MjZINnptMjQtMjRINnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bS0yOCA0SDZ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem0tMjggNEg2di0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptLTI4IDRINnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bS0yOCA0SDZ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem00IDBoLTJ2LTJoMnYyem0tMjggNEg2di0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptNCAwaC0ydi0yaDJ2MnptLTI4IDRINnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6bTQgMGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ffaa] to-transparent"></div>
            <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ffaa]/30 to-transparent"></div>
            <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ffaa]/30 to-transparent"></div>
            <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#00ffaa] to-transparent"></div>
            <div className="absolute left-1/3 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#00ffaa]/30 to-transparent"></div>
            <div className="absolute left-2/3 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#00ffaa]/30 to-transparent"></div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute w-[120px] h-[120px] bg-[radial-gradient(circle,_rgba(0,255,170,0.4)_0%,_rgba(0,255,170,0)_70%)] blur-[25px] rounded-full opacity-0 group-hover:opacity-100 transition duration-500"
              style={{ top: "10%", left: "10%" }}
            ></div>
            <div
              className="absolute w-[150px] h-[150px] bg-[radial-gradient(circle,_rgba(0,162,255,0.3)_0%,_rgba(0,162,255,0)_70%)] blur-[30px] rounded-full opacity-0 group-hover:opacity-80 transition duration-700"
              style={{ bottom: "10%", right: "10%" }}
            ></div>
          </div>

          <div className="absolute inset-0 overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity duration-300">
            <div className="absolute top-0 left-0 w-full h-full animate-[scrollBinary_20s_linear_infinite]">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="text-[10px] font-mono text-[#00ffaa] whitespace-nowrap"
                >
                  {Array.from({ length: 30 }).map((_, j) => (
                    <span key={j} className="opacity-[0.03] mr-1">
                      {Math.random() > 0.5 ? "1" : "0"}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 transform-style-preserve-3d transition-transform duration-500">
            <div className="relative mb-6 group-hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#00ffaa]/10 rounded-lg border border-[#00ffaa]/30 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-[#00ffaa]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 15V18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect
                    x="5"
                    y="9"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M9 6V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="9" cy="13" r="1" fill="currentColor" />
                  <circle cx="15" cy="13" r="1" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-[#00ffaa]/50 blur-[2px] rounded-full group-hover:blur-[4px] transition-all duration-300"></div>
            </div>

            <h2 className="text-l font-bold text-white mb-2 relative">
              <span className="group-hover:opacity-0 group-hover:animate-glitch2 transition-all duration-300">
                Problem Code: {problem.problemCode}
              </span>
            </h2>

            <p className="text-xs text-center text-[#a0aec0] mb-6 group-hover:text-[#cbd5e0] transition-colors duration-300">
              {problem.overview}
            </p>

            <div className="flex items-center mb-6">
              <div className="w-2 h-2 rounded-full bg-[#00ffaa] mr-2 animate-pulse"></div>
              <span className="text-xs font-mono text-[#00ffaa]">
                {problem.category}
              </span>
            </div>

            <NavLink
              to={`/iictmsl-envisage2k25-hack-ur-way-problem-details/${problem.problemCode}`}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-mono px-2 py-1 bg-[#00ffaa]/10 text-[#00ffaa] border border-[#00ffaa]/20 rounded group-hover:bg-[#00ffaa]/20 group-hover:border-[#00ffaa]/30 transition-all duration-300"
            >
              VIEW MORE
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

// const CountdownTimer = ({ onTimeUp }: { onTimeUp: () => void }) => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   const [showTimer, setShowTimer] = useState(() => {
//     // Agar timer already end ho chuka hai (refresh pe check)
//     const timerEnded = localStorage.getItem("timerEnded");
//     return timerEnded !== "true";
//   });

//   // State to track if we're in the final countdown (last 10 seconds)
//   const [inFinalCountdown, setInFinalCountdown] = useState(false);
//   // Glitch intensity increases as we get closer to zero
//   const glitchIntensity = inFinalCountdown ? (10 - timeLeft.seconds) / 10 : 0;

//   useEffect(() => {
//     if (!showTimer) return;

//     const calculateTimeLeft = () => {
//       const now = new Date();

//       // Store the target time in localStorage so it persists across refreshes
//       let target;
//       const savedTarget = localStorage.getItem("testTargetTime");

//       if (!savedTarget) {
//         target = target = new Date();

//         // Set target to upcoming Saturday 11:00 AM
//         // const day = now.getDay(); // 0 (Sun) to 6 (Sat)
//         // const daysUntilSaturday = (6 - day + 7) % 7 || 7; // If already Saturday, move to next
//         // target.setDate(now.getDate() + daysUntilSaturday);
//         // target.setHours(11, 0, 0, 0); // 11:00 AM
//         target.setHours(11, 10, 0, 0);
//         localStorage.setItem("testTargetTime", target.toString());
//       } else {
//         target = new Date(savedTarget);
//       }

//       const diff = target.getTime() - now.getTime();

//       if (diff <= 0) {
//         localStorage.setItem("timerEnded", "true");
//         // Also clear the test target time for future tests
//         localStorage.removeItem("testTargetTime");
//         setShowTimer(false);
//         onTimeUp();
//         return;
//       }

//       const newTimeLeft = {
//         days: Math.floor(diff / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((diff / 1000 / 60) % 60),
//         seconds: Math.floor((diff / 1000) % 60),
//       };

//       setTimeLeft(newTimeLeft);

//       // Check if we're in the final countdown (10 seconds or less)
//       // Only when all other units are 0
//       if (
//         newTimeLeft.days === 0 &&
//         newTimeLeft.hours === 0 &&
//         newTimeLeft.minutes === 0 &&
//         newTimeLeft.seconds <= 10
//       ) {
//         setInFinalCountdown(true);
//       } else {
//         setInFinalCountdown(false);
//       }
//     };

//     calculateTimeLeft();
//     const interval = setInterval(calculateTimeLeft, 1000);

//     return () => clearInterval(interval);
//   }, [showTimer, onTimeUp]);

//   // Effect for glitch animations in final countdown
//   useEffect(() => {
//     if (!inFinalCountdown) return;

//     // Add random glitch effects
//     const glitchInterval = setInterval(() => {
//       if (Math.random() < glitchIntensity * 0.7) {
//         // Add random glitch classes
//         document
//           .querySelector(".countdown-timer")
//           ?.classList.add("glitch-shake");

//         setTimeout(() => {
//           document
//             .querySelector(".countdown-timer")
//             ?.classList.remove("glitch-shake");
//         }, 150);
//       }
//     }, 300);

//     return () => {
//       clearInterval(glitchInterval);
//       document
//         .querySelector(".countdown-timer")
//         ?.classList.remove("glitch-shake");
//     };
//   }, [inFinalCountdown, glitchIntensity, timeLeft.seconds]);

//   if (!showTimer) return null;

//   // Generate glitch lines based on intensity
//   const glitchLines = Array.from({
//     length: Math.floor(glitchIntensity * 8),
//   }).map((_, i) => (
//     <div
//       key={i}
//       className="absolute bg-accent/30 h-px w-full left-0 z-10"
//       style={{
//         top: `${Math.random() * 100}%`,
//         opacity: Math.random() * 0.7,
//         filter: `blur(${Math.random() * 2}px)`,
//         transform: `translateY(${Math.random() * 5 - 2.5}px)`,
//         animation: "glitch-horizontal 0.2s ease-in-out infinite alternate",
//       }}
//     ></div>
//   ));

//   return (
//     <div
//       className={`countdown-timer mb-8 relative ${
//         inFinalCountdown ? "animate-pulse-rapid" : ""
//       }`}
//     >
//       {inFinalCountdown && (
//         <style>{`
//           @keyframes glitch-horizontal {
//             0% {
//               transform: translateX(0);
//             }
//             100% {
//               transform: translateX(${Math.random() * 10 - 5}px);
//             }
//           }
//           @keyframes text-shadow-glitch {
//             0% {
//               text-shadow: 1px 0 #00ffaa, -1px 0 #ff00aa;
//             }
//             50% {
//               text-shadow: -1px 0 #00ffaa, 1px 0 #ff00aa;
//             }
//             100% {
//               text-shadow: 1px 0 #00ffaa, -1px 0 #ff00aa;
//             }
//           }
//           .glitch-shake {
//             animation: shake 0.1s ease-in-out;
//           }
//           @keyframes shake {
//             0%,
//             100% {
//               transform: translateX(0);
//             }
//             25% {
//               transform: translateX(-5px);
//             }
//             50% {
//               transform: translateX(0);
//             }
//             75% {
//               transform: translateX(5px);
//             }
//           }
//           .animate-pulse-rapid {
//             animation: pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//           }
//           @keyframes pulse {
//             0%,
//             100% {
//               opacity: 1;
//             }
//             50% {
//               opacity: 0.85;
//             }
//           }
//         `}</style>
//       )}

//       {/* Glitch effects container */}
//       {inFinalCountdown && (
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {glitchLines}
//           <div className="absolute inset-0 bg-accent/5 z-5 mix-blend-overlay"></div>
//         </div>
//       )}

//       <div
//         className={`text-center relative z-20 ${
//           inFinalCountdown ? "glitch-text" : ""
//         }`}
//       >
//         <h3
//           className={`text-3xl font-bold text-[#00ffaa] mb-4 ${
//             inFinalCountdown ? "animate-text-shadow-glitch" : ""
//           }`}
//           style={
//             inFinalCountdown
//               ? {
//                   textShadow: `${Math.random() * 3 - 1.5}px 0 #ff00aa, ${
//                     -1 * (Math.random() * 3 - 1.5)
//                   }px 0 #00ffaa`,
//                   animation:
//                     "text-shadow-glitch 0.3s ease-in-out infinite alternate",
//                 }
//               : {}
//           }
//         >
//           HACKATHON STARTS IN
//         </h3>
//         <div className="flex justify-center gap-4">
//           <div className="flex flex-col items-center">
//             <span
//               className={`text-3xl font-bold text-white ${
//                 inFinalCountdown && timeLeft.days === 0 ? "text-red-500" : ""
//               }`}
//             >
//               {timeLeft.days}
//             </span>
//             <span className="text-sm text-gray-400">DAYS</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span
//               className={`text-3xl font-bold text-white ${
//                 inFinalCountdown && timeLeft.hours === 0 ? "text-red-500" : ""
//               }`}
//             >
//               {timeLeft.hours}
//             </span>
//             <span className="text-sm text-gray-400">HOURS</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span
//               className={`text-3xl font-bold text-white ${
//                 inFinalCountdown && timeLeft.minutes === 0 ? "text-red-500" : ""
//               }`}
//             >
//               {timeLeft.minutes}
//             </span>
//             <span className="text-sm text-gray-400">MINUTES</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span
//               className={`text-3xl font-bold ${
//                 inFinalCountdown
//                   ? "text-red-500 scale-110 transform transition-all duration-300"
//                   : "text-white"
//               }`}
//               style={
//                 inFinalCountdown
//                   ? {
//                       filter: `blur(${
//                         Math.random() * glitchIntensity * 1.5
//                       }px)`,
//                       transition: "filter 0.1s",
//                     }
//                   : {}
//               }
//             >
//               {timeLeft.seconds}
//             </span>
//             <span className="text-sm text-gray-400">SECONDS</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export function ProblemStatement() {
  // const dispatch = useDispatch<AppDispatch>();

  // const { problems, loading, error } = useSelector(
  //   (state: RootState) => state.participant
  // );

  const [selectedCategory, setSelectedCategory] = useState("All");
  // const [timeUp, setTimeUp] = useState(() => {
  //   return localStorage.getItem("timeUp") === "true";
  // });
  // const [isQuestionRevealed, setIsQuestionRevealed] = useState(() => {
  //   return localStorage.getItem("timeUp") === "true";
  // });
  // const [isFinalCountdownOn, setFinalCountdownOn] = useState(() => {
  //   return localStorage.getItem("timeUp") === "true";
  // });

  // useEffect(() => {
  //   localStorage.setItem("timeUp", String(timeUp));
  // }, [timeUp]);

  // useEffect(() => {
  //   dispatch(fetchProblemsThunk());
  // }, [dispatch])

  // Get unique categories from problems
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    problems.forEach((p) => categorySet.add(p.category));
    return ["All", ...Array.from(categorySet)];
  }, []);

  // Handle start final countdown
  // const handleStartFinalCountdown = () => {
  //   // setFinalCountdownOn(true);
  //   console.log("Starts...");
  // };

  // const handleCountdownComplete = () => {
  //   console.log("Countdown completed!");
  //   setFinalCountdownOn(false);
  //   setIsQuestionRevealed(true);
  // };

  const filteredProblems =
    selectedCategory === "All"
      ? problems
      : problems.filter(
          (problem) =>
            problem.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // if (error) {
  //   return (
  //     <h1 className="text-red-500">Error loading problem statements...</h1>
  //   );
  // }
  return (
    <>
      <Header />
      <section className="min-h-screen mb-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-darkPurple/40 via-transparent to-darkCyan/40 z-10 animate-pulse-slow"></div>

        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-10 w-16 h-16 border border-neon opacity-30 animate-float"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-1/3 right-20 w-24 h-24 border border-accent opacity-20 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-highlight opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-20 right-1/4 w-6 h-6 rounded-full bg-accent/20 blur-sm animate-pulse"></div>
          <div className="absolute bottom-40 left-1/4 w-8 h-8 rounded-full bg-neon/20 blur-sm animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-highlight/20 to-transparent"></div>
        </div>

        <div className="container mx-auto mt-17 px-4 pt-16 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="container mx-auto px-4 relative z-10 flex justify-center items-center">
                <h2 className="text-3xl md:text-5xl font-rovelink font-bold mb-4 tracking-wider text-center">
                  <span className="text-white">PROBLEM</span>
                  <span className="text-accent ml-3">STATEMENTS</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.length > 0 &&
              categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                      ${
                        selectedCategory === category
                          ? "bg-[#00ffaa]/10 border-[#00ffaa]/50 text-[#00ffaa] shadow-lg shadow-[#00ffaa]/20"
                          : "border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-[#00ffaa]/30"
                      }`}
                >
                  {category}
                </button>
              ))}
          </div>

          <div className="bg-gray-900/70 backdrop-blur-xl p-6 md:p-8 rounded-lg border-2 border-neon/30 relative shadow-2xl">
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-neon"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-neon"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent"></div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="w-full h-1 bg-neon/10 absolute animate-pulse-slow"
                style={{ top: "30%" }}
              ></div>
              <div
                className="w-full h-1 bg-accent/10 absolute animate-pulse-slow"
                style={{ top: "60%", animationDelay: "2s" }}
              ></div>
              <div
                className="w-full h-1 bg-highlight/10 absolute animate-pulse-slow"
                style={{ top: "90%", animationDelay: "1s" }}
              ></div>
            </div>

            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-18 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProblems.map((problem) => (
                  <Card key={problem._id} problem={problem} />
                ))}
              </div>
            </div>

            {filteredProblems.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No problems found in this category.
              </div>
            )}
          </div>
        </div>

        {/* {!isQuestionRevealed && (
          <FinalCountdown
            isCountdownOn={isFinalCountdownOn}
            onComplete={handleCountdownComplete}
          />
        )} */}

        {/* {!isFinalCountdownOn && !isQuestionRevealed && ( */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-8 z-50">
          {/* <CountdownTimer onTimeUp={() => setTimeUp(true)} /> */}
          {/* <CyberpunkButton handleClick={handleStartFinalCountdown} /> */}
        </div>
        {/* )} */}
      </section>
      <Footer />
    </>
  );
}

<style>{`
  @keyframes scrollBinary {
    0% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
  }
  @keyframes glitch1 {
    0% { clip-path: polygon(0 0%, 100% 0%, 100% 50%, 0 50%); }
    20% { clip-path: polygon(0 10%, 100% 20%, 100% 60%, 0 60%); }
    40% { clip-path: polygon(0 30%, 100% 30%, 100% 70%, 0 80%); }
    60% { clip-path: polygon(0 50%, 100% 40%, 100% 80%, 0 70%); }
    80% { clip-path: polygon(0 70%, 100% 80%, 100% 100%, 0 90%); }
    100% { clip-path: polygon(0 80%, 100% 70%, 100% 100%, 0 100%); }
  }
  @keyframes glitch2 {
    0% { transform: translateX(0); }
    20% { transform: translateX(-3px); }
    40% { transform: translateX(2px); }
    60% { transform: translateX(-1px); }
    80% { transform: translateX(3px); }
    100% { transform: translateX(0); }
  }
  
}

`}</style>;
