/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useParams } from "react-router-dom";
import { ReqParticipantRegistration } from "../../api/bodies/participant";
import { registerParticipant } from "../../features/participantSlice";
import { useState } from "react";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<any>;
  color?: string;
  name: string;
  accept?: string;
}

const FormInput = ({
  label,
  type = "text",
  placeholder,
  required = false,
  options = [],
  color = "#22d3ee",
  name,
}: // accept,
FormInputProps) => {
  return (
    <div className="mb-4 relative">
      <label
        className="block text-white font-cyber mb-2 text-sm tracking-wider"
        style={{ color }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "select" ? (
        <div className="relative">
          <select
            className="w-full bg-gray-900 text-white border border-opacity-50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-opacity-50 appearance-none font-futuristic"
            style={{ borderColor: color, boxShadow: `0 0 10px ${color}40` }}
            name={name}
            required={required}
          >
            <option value="">Select {label}</option>
            {options.map((option, index) => (
              <option
                key={index}
                value={typeof option === "object" ? option.id : option}
              >
                {typeof option === "object" ? option.name : option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <div
              className="w-4 h-4 border-r-2 border-b-2"
              style={{ borderColor: color, transform: "rotate(45deg)" }}
            ></div>
          </div>
          {/* Decorative corner */}
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b"
            style={{ borderColor: color }}
          ></div>
          <div
            className="absolute -top-1 -left-1 w-3 h-3 border-l border-t"
            style={{ borderColor: color }}
          ></div>
        </div>
      ) : type === "textarea" ? (
        <div className="relative">
          <textarea
            className="w-full bg-gray-900 text-white border border-opacity-50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-opacity-50 font-futuristic"
            style={{ borderColor: color, boxShadow: `0 0 10px ${color}40` }}
            placeholder={placeholder}
            name={name}
            required={required}
            rows={4}
          ></textarea>
          {/* Decorative corner */}
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b"
            style={{ borderColor: color }}
          ></div>
          <div
            className="absolute -top-1 -left-1 w-3 h-3 border-l border-t"
            style={{ borderColor: color }}
          ></div>
        </div>
      ) : (
        <div className="relative">
          <input
            type={type}
            className="w-full bg-gray-900 text-white border border-opacity-50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-opacity-50 font-futuristic"
            style={{ borderColor: color, boxShadow: `0 0 10px ${color}40` }}
            placeholder={placeholder}
            name={name}
            required={required}
          />
          {/* Decorative corner */}
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b"
            style={{ borderColor: color }}
          ></div>
          <div
            className="absolute -top-1 -left-1 w-3 h-3 border-l border-t"
            style={{ borderColor: color }}
          ></div>
        </div>
      )}
    </div>
  );
};

const ProblemDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { problemCode } = useParams();
  const { problems } = useSelector((state: RootState) => state.participant);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Find problem by code
  const problem = problems.find((p) => p.problemCode === problemCode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const fields: ReqParticipantRegistration = {
      teamName: form["team name"].value,
      problemCode: form["code"].value,
      leaderName: form["leader"].value,
      leaderEmail: form["leader-email"].value,
      member1Name: form["member1"].value,
      member1Email: form["mem1-email"].value,
      member2Name: form["member2"]?.value || "",
      member2Email: form["mem2-email"]?.value || "",
      member3Name: form["member3"]?.value || "",
      member3Email: form["mem3-email"]?.value || "",
      member4Name: form["member4"]?.value || "",
      member4Email: form["mem4-email"]?.value || "",
    };

    const res = await dispatch(registerParticipant({ ...fields }));

    if (registerParticipant.fulfilled.match(res)) {
      alert("Registration successful");
      setIsSubmitting(false);
    } else {
      alert("Registration failed");
      setIsSubmitting(false);
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Problem not found.
      </div>
    );
  }
  return (
    <>
      <Header />
      <section className="min-h-screen mb-12  bg-primary relative overflow-hidden">
        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-darkPurple/40 via-transparent to-darkCyan/40 z-10 animate-pulse-slow"></div>

        {/* Animated floating elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Floating digital cubes */}
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

          {/* Glowing orbs */}
          <div className="absolute top-20 right-1/4 w-6 h-6 rounded-full bg-accent/20 blur-sm animate-pulse"></div>
          <div className="absolute bottom-40 left-1/4 w-8 h-8 rounded-full bg-neon/20 blur-sm animate-pulse-slow"></div>

          {/* Digital circuits */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-highlight/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 pt-16 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-6 inline-block">
                <div className="relative inline-block">
                  <h1 className="text-5xl md:text-6xl font-cyber font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon via-accent to-highlight animate-glow">
                    ENVISAGE 2025
                  </h1>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-neon via-accent to-highlight"></div>
                  <div className="absolute -bottom-4 left-10 right-10 h-0.5 bg-gradient-to-r from-neon/50 via-accent/50 to-highlight/50"></div>
                </div>
              </div>
              <p className="text-4xl text-neon font-cyber uppercase tracking-widest">
                PROBLEM CODE: {problem.problemCode}
              </p>
              <p className="text-4xl text-[#ec4899] font-cyber font-bold uppercase tracking-widest">
                {problem.title}
              </p>
              <div className="mt-6 relative">
                <p className="-ml-15 text-lg text-gray-300 w-5xl font-futuristic">
                  {problem.description}
                </p>
                {/* Decorative separator */}
                <div className="mt-6 flex items-center justify-center">
                  <div className="w-16 h-px bg-accent"></div>
                  <div className="mx-4 text-accent font-cyber text-xl">
                    FILL YOUR DETAILS
                  </div>
                  <div className="w-16 h-px bg-neon"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/70 backdrop-blur-xl p-6 md:p-8 rounded-lg border-2 border-neon/30 relative shadow-2xl">
            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-neon"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-neon"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent"></div>

            {/* Digital scan line effect */}
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

            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-element">
                  <FormInput
                    label="TEAM NAME"
                    placeholder="Enter your team name"
                    required={true}
                    color="#22d3ee"
                    name="team name"
                    accept=""
                  />
                </div>

                <div className="form-element">
                  <FormInput
                    label="PROBLEM STATEMENT CODE"
                    type="text"
                    placeholder="Enter your problem statement code"
                    required={true}
                    color="#7c3aed"
                    name="code"
                    accept=""
                  />
                </div>

                <div className="form-element">
                  <FormInput
                    label="TEAM LEADER"
                    type="text"
                    placeholder="Enter team leader name"
                    required={true}
                    color="#ec4899"
                    name="leader"
                    accept=""
                  />
                </div>

                <div className="form-element">
                  <FormInput
                    label="TEAM LEADER'S EMAIL"
                    type="email"
                    placeholder="Enter team leader's email"
                    required={true}
                    color="#ec4899"
                    name="leader-email"
                    accept=""
                  />
                </div>

                <div className="form-element">
                  <FormInput
                    label="TEAM MEMBER 1"
                    type="text"
                    placeholder="Enter your first member"
                    required={true}
                    color="#7c3aed"
                    name="member1"
                    accept=""
                  />
                </div>

                <div className="form-element">
                  <FormInput
                    label="MEMBER 1 EMAIL"
                    type="email"
                    placeholder="Enter first member's email "
                    required={true}
                    color="#7c3aed"
                    name="mem1-email"
                    accept=""
                  />
                </div>

                <div className="form-element">
                  <FormInput
                    label="TEAM MEMBER 2"
                    type="text"
                    placeholder="Enter your second member"
                    color="#10b981"
                    name="member2"
                    accept=""
                  />
                </div>

                <div className="form-element">
                  <FormInput
                    label="MEMBER 2 EMAIL"
                    type="email"
                    placeholder="Enter second member's email"
                    color="#10b981"
                    name="mem2-email"
                    accept=""
                  />
                </div>

                <div className="form-element">
                  <FormInput
                    label="TEAM MEMBER 3"
                    type="text"
                    placeholder="Enter your third member"
                    color="#22d3ee"
                    name="member3"
                    accept=""
                  />
                </div>

                <div className="form-element">
                  <FormInput
                    label="MEMBER 3 EMAIL"
                    type="email"
                    placeholder="Enter third member's email"
                    color="#22d3ee"
                    name="mem3-email"
                    accept=""
                  />
                </div>

                <div className="form-element">
                  <FormInput
                    label="TEAM MEMBER 4"
                    type="text"
                    placeholder="Enter your fourth member"
                    color="#f59e0b"
                    name="member4"
                    accept=""
                  />
                </div>

                <div className="form-element">
                  <FormInput
                    label="MEMBER 4 EMAIL"
                    type="email"
                    placeholder="Enter fourth member's email"
                    color="#f59e0b"
                    name="mem2-email"
                    accept=""
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-400 text-white font-cyber rounded-md hover:opacity-90 transition-opacity relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  {/* Animated hover effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/0 via-white/20 to-cyan-400/0 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></span>
                  <span className="relative z-10 tracking-widest">
                    {isSubmitting ? "SUBMITTING...." : "SUBMIT"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProblemDetailsPage;
