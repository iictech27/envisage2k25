import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CyberpunkBackground3D from "../components/CyberpunkBackground3D";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setResetComplete(true);

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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

        {/* Reset Password Card */}
        <div className="glass-card max-w-md w-full p-8 relative z-10 border border-neon shadow-lg shadow-neon/20 backdrop-blur-sm">
          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-accent"></div>
          <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-neon"></div>
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-neon"></div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-accent"></div>

          <h2 className="text-3xl font-cyber text-center mb-6">
            <span className="text-neon">SET NEW</span>
            <span className="text-accent"> PASSWORD</span>
          </h2>

          {!resetComplete ? (
            <>
              <p className="text-white font-futuristic mb-6 text-center">
                Create a new password for your account.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="New Password"
                    className="w-full bg-gray-900 text-white border border-neon/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-opacity-50 font-futuristic"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-neon"></div>
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-neon"></div>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                    className="w-full bg-gray-900 text-white border border-neon/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-opacity-50 font-futuristic"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
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
                    {isSubmitting ? "UPDATING..." : "SET NEW PASSWORD"}
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
              <p className="text-white font-futuristic mb-2">
                Password reset successful!
              </p>
              <p className="text-gray-300 text-sm mb-6">
                Redirecting you to login page in a few seconds...
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-white font-futuristic">
              <Link
                to="/login"
                className="text-neon hover:text-accent transition-colors"
              >
                BACK TO LOGIN
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
