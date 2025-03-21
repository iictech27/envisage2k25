import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import CyberpunkBackground3D from "../components/CyberpunkBackground3D";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user types
    if (error) {
      setError("");
    }
  };

  const validate = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-10 flex items-center justify-center relative overflow-hidden">
        {/* 3D Background */}
        <CyberpunkBackground3D
          variant="hexagons"
          intensity={1.2}
          color1="#22d3ee"
          color2="#7c3aed"
          interactive={true}
        />

        {/* Additional visual elements for depth */}
        <div className="absolute inset-0 bg-primary bg-opacity-60 z-0"></div>

        {/* Forgot Password Card */}
        <div className="glass-card max-w-md w-full p-8 relative z-10 border border-neon shadow-lg shadow-neon/20 backdrop-blur-sm">
          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-accent"></div>
          <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-neon"></div>
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-neon"></div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-accent"></div>

          <h2 className="text-3xl font-cyber text-center mb-6">
            <span className="text-neon">RESET</span>
            <span className="text-accent"> PASSWORD</span>
          </h2>

          {!submitted ? (
            <>
              <p className="text-white font-futuristic mb-6 text-center">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full bg-gray-900 text-white border border-neon/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-opacity-50 font-futuristic"
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-neon"></div>
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-neon"></div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cyber-button w-full py-2 px-4 relative overflow-hidden group"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                  <span className="relative z-10">
                    {isSubmitting ? "SUBMITTING..." : "SEND RESET LINK"}
                  </span>
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-neon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-white font-futuristic mb-6">
                Password reset link has been sent to your email address. Please
                check your inbox and follow the instructions.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="cyber-button w-full py-2 px-4 relative overflow-hidden group mb-4"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                <span className="relative z-10">SEND ANOTHER LINK</span>
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-white font-futuristic">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-neon hover:text-accent transition-colors"
              >
                LOGIN
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
