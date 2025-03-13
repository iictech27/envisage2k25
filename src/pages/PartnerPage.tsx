import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CyberpunkBackground3D from "../components/CyberpunkBackground3D";

// Partner types
const partnerTypes = [
  {
    id: "technology",
    title: "Technology Partner",
    description:
      "Collaborate on cutting-edge metaverse technologies and infrastructure.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
  },
  {
    id: "content",
    title: "Content Creator",
    description:
      "Create immersive experiences, digital assets, and virtual environments.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg>
    ),
  },
  {
    id: "brand",
    title: "Brand Partner",
    description:
      "Establish your brand presence in the metaverse with custom experiences.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
        />
      </svg>
    ),
  },
  {
    id: "event",
    title: "Event Partner",
    description:
      "Host virtual events, conferences, and experiences in our metaverse.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

// Benefits data
const benefits = [
  {
    title: "Access to Cutting-Edge Technology",
    description:
      "Leverage our advanced metaverse platform and development tools.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Global Audience Reach",
    description:
      "Connect with our diverse community of metaverse enthusiasts worldwide.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Co-Marketing Opportunities",
    description:
      "Joint promotional campaigns and shared visibility across platforms.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
  {
    title: "Technical Support",
    description:
      "Dedicated support team to help integrate your solutions with our platform.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Revenue Sharing",
    description:
      "Fair and transparent revenue models for mutual growth and success.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Innovation Ecosystem",
    description:
      "Join a network of forward-thinking partners pushing the boundaries of the metaverse.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
];

const PartnerPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    partnerType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.partnerType) {
      newErrors.partnerType = "Please select a partnership type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
        {/* 3D Background */}
        <CyberpunkBackground3D
          variant="circles"
          intensity={1.3}
          color1="#22d3ee"
          color2="#7c3aed"
          interactive={true}
        />

        {/* Additional visual elements for depth */}
        <div className="absolute inset-0 bg-primary bg-opacity-70 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-cyber mb-4">
              <span className="text-neon">PARTNER</span>{" "}
              <span className="text-accent">WITH US</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-neon to-accent mx-auto mb-6"></div>
            <p className="text-white font-futuristic max-w-2xl mx-auto">
              Join forces with us to shape the future of the metaverse. We're
              looking for innovative partners who share our vision of creating
              immersive, interconnected digital experiences.
            </p>
          </div>

          {/* Partnership Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {partnerTypes.map((type) => (
              <div
                key={type.id}
                className="glass-card border border-neon/30 p-6 rounded-lg transition-all duration-300 hover:border-neon hover:shadow-lg hover:shadow-neon/20 group backdrop-blur-sm"
              >
                <div className="text-neon mb-4 group-hover:text-accent transition-colors duration-300">
                  {type.icon}
                </div>
                <h3 className="text-xl font-cyber text-white mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-300 font-futuristic text-sm">
                  {type.description}
                </p>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-cyber text-center mb-10">
              <span className="text-white">WHY</span>{" "}
              <span className="text-neon">PARTNER</span>{" "}
              <span className="text-accent">WITH US</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-gray-900 rounded-lg border border-neon/30 text-neon">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-cyber text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 font-futuristic text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-cyber text-center mb-8">
              <span className="text-neon">GET</span>{" "}
              <span className="text-accent">STARTED</span>
            </h2>

            {isSubmitted ? (
              <div className="glass-card border border-neon p-8 rounded-lg text-center backdrop-blur-sm">
                <div className="text-neon text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-cyber text-white mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-300 font-futuristic mb-6">
                  Your partnership request has been submitted successfully. Our
                  team will review your information and get back to you within
                  48 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      partnerType: "",
                      message: "",
                    });
                  }}
                  className="cyber-button py-2 px-6 relative overflow-hidden group"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                  <span className="relative z-10">SUBMIT ANOTHER REQUEST</span>
                </button>
              </div>
            ) : (
              <div className="glass-card border border-neon/30 p-8 rounded-lg backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="block text-neon font-cyber text-sm mb-2"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-900 text-white border border-neon/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-opacity-50 font-futuristic"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-neon"></div>
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-neon"></div>
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="block text-neon font-cyber text-sm mb-2"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-900 text-white border border-neon/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-opacity-50 font-futuristic"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-neon"></div>
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-neon"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label
                        htmlFor="company"
                        className="block text-neon font-cyber text-sm mb-2"
                      >
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-gray-900 text-white border border-neon/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-opacity-50 font-futuristic"
                      />
                      {errors.company && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.company}
                        </p>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-neon"></div>
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-neon"></div>
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="partnerType"
                        className="block text-neon font-cyber text-sm mb-2"
                      >
                        Partnership Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="partnerType"
                        name="partnerType"
                        value={formData.partnerType}
                        onChange={handleChange}
                        className="w-full bg-gray-900 text-white border border-neon/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-opacity-50 font-futuristic appearance-none"
                      >
                        <option value="">Select Partnership Type</option>
                        {partnerTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.title}
                          </option>
                        ))}
                      </select>
                      {errors.partnerType && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.partnerType}
                        </p>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-neon"></div>
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-neon"></div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-neon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block text-neon font-cyber text-sm mb-2"
                    >
                      Tell us about your partnership goals
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-gray-900 text-white border border-neon/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-opacity-50 font-futuristic"
                    ></textarea>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-neon"></div>
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-neon"></div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="cyber-button py-3 px-8 relative overflow-hidden group"
                    >
                      <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                      <span className="relative z-10">
                        {isLoading
                          ? "PROCESSING..."
                          : "SUBMIT PARTNERSHIP REQUEST"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerPage;
