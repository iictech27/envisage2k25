import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

import CyberpunkBackground3D from "../components/CyberpunkBackground3D";
import { ResUserBody } from "../api/bodies/user";
import { signUpUser } from "../api/handlers";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    if (!formData.fullName.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const apiError: Record<string, string> = {};

    setIsLoading(true);

    const response: ResUserBody | string = await signUpUser({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    });

    setIsLoading(false);

    // string only when error
    if(typeof response == "string") {
      apiError.api = response;
      setErrors(apiError);
      return;
    }

    // navigate("/login");

    // Redirect to email verification page after successful signup
    navigate("/verify-email");
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

        {/* Sign Up Form */}
        <div className="glass-card max-w-md w-full p-8 relative z-10 border border-neon shadow-lg shadow-neon/20 backdrop-blur-sm">
          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-accent"></div>
          <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-neon"></div>
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-neon"></div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-accent"></div>

          <h2 className="text-3xl font-cyber text-center mb-6">
            <span className="text-neon">SIGN</span>
            <span className="text-accent">UP</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-gray-900 text-white border border-neon/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-opacity-50 font-futuristic"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-neon"></div>
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-neon"></div>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-gray-900 text-white border border-neon/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-opacity-50 font-futuristic"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-neon"></div>
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-neon"></div>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-gray-900 text-white border border-neon/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-opacity-50 font-futuristic"
              />
              <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  // TODO : Add icon and fix styling
                  className="absolute text-xl font-black right-3 top-1.5 text-gray-300/60 hover:text-gray-200 transition-colors">
                  {showPassword ? "[o]" : "[x]"}
                </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-neon"></div>
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-neon"></div>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
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

            <div className="relative">
              {errors.api && (
                <p className="text-red-500 text-s mb-1">
                  {errors.api}
                </p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="cyber-button w-full py-2 px-4 relative overflow-hidden group"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                <span className="relative z-10">
                  {isLoading ? "PROCESSING..." : "CREATE ACCOUNT"}
                </span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white font-futuristic">
              Already have an account?{" "}
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

export default SignUpPage;
