import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

import CyberpunkBackground3D from "../components/CyberpunkBackground3D";
import { postUserLogIn } from "../api/fetch";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [rememberUser, setRememberUser] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleRememberUser = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRememberUser(e.target.checked);
  }

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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {

      const userLogInMessage = await postUserLogIn({
        email: formData.email,
        password: formData.password,
        rememberUser: rememberUser
      });

      setIsLoading(false);
      console.log(userLogInMessage);
      navigate("/register"); // TODO : Fix route later

    } catch(error) {
      console.log(error);

      setErrors({
        api: error instanceof Error ? error.message : "An error occurred!"
      });
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-10 flex items-center justify-center relative overflow-hidden">
        {/* 3D Background */}
        <CyberpunkBackground3D
          variant="particles"
          intensity={1.5}
          color1="#22d3ee"
          color2="#7c3aed"
          interactive={true}
        />

        {/* Additional visual elements for depth */}
        <div className="absolute inset-0 bg-primary bg-opacity-60 z-0"></div>

        {/* Login Form */}
        <div className="glass-card max-w-md w-full p-8 relative z-10 border border-neon shadow-lg shadow-neon/20 backdrop-blur-sm">
          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-accent"></div>
          <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-neon"></div>
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-neon"></div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-accent"></div>

          <h2 className="text-3xl font-cyber text-center mb-6">
            <span className="text-neon">LOG</span>
            <span className="text-accent">IN</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1.5 text-purple-300/60 hover:text-purple-200 transition-colors">
                {showPassword ? "(o)" : "(x)"}
              </button>

              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-neon"></div>
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-neon"></div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  onChange={handleRememberUser}
                  className="h-4 w-4 bg-gray-900 border-neon rounded focus:ring-neon"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-white font-futuristic"
                >
                  Remember me
                </label>
              </div>

              <div className="text-neon hover:text-accent transition-colors font-futuristic">
                <a href="#">Forgot password?</a>
              </div>
            </div>

            <div className="relative">
              {errors.api && (
                <p className="text-red-500 text-l mt-1 mb-1">{errors.api}</p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="cyber-button w-full py-2 px-4 relative overflow-hidden group"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                <span className="relative z-10">
                  {isLoading ? "AUTHENTICATING..." : "ACCESS SYSTEM"}
                </span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white font-futuristic">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-neon hover:text-accent transition-colors"
              >
                SIGN UP
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
