import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CyberpunkBackground3D from "../components/CyberpunkBackground3D";
import { verifyUserEmail } from "../api/handlers";

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [error, setError] = useState("");

  // OTP state - 6 digit code
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  // Refs for OTP inputs to enable auto-focus
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs
  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
    // Focus first input on load
    if (otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, []);

  // Handle OTP input change
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Only allow one digit and automatically move to next input
    if (/^\d{0,1}$/.test(value)) {
      // Update the OTP state
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Clear any existing error
      if (error) setError("");

      // Auto-focus next input if value is entered
      if (value !== "" && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace to go to previous input
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      // Move to previous input on backspace if current input is empty
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Handle pasting OTP code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      // Split the pasted data into individual digits
      const digits = pastedData.split("");
      setOtp(digits);

      // Focus the last input
      otpRefs.current[5]?.focus();
    }
  };

  // Function to handle resend verification OTP
  const handleResendOtp = () => {
    setIsResending(true);
    setError("");

    // Simulate API call to resend verification OTP
    setTimeout(() => {
      setIsResending(false);
      setResendSuccess(true);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Function to handle verification
  const handleVerifyOtp = async () => {
    // Check if OTP is complete
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 6 digits of the verification code");
      return;
    }

    setVerifying(true);
    setError("");

    // Simulate API call for verification
    const resp = await verifyUserEmail(otp.join(""));
    if (resp) {
      setVerificationSuccess(true);
      navigate("/login");
    } else {
      setVerificationSuccess(false);
      alert("Error while otp verifying Try again !");
    }
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

        {/* Email Verification Card */}
        <div className="glass-card max-w-md w-full p-8 relative z-10 border border-neon shadow-lg shadow-neon/20 backdrop-blur-sm">
          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-accent"></div>
          <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-neon"></div>
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-neon"></div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-accent"></div>

          <h2 className="text-3xl font-cyber text-center mb-6">
            <span className="text-neon">VERIFY</span>
            <span className="text-accent"> EMAIL</span>
          </h2>

          {!verificationSuccess ? (
            <>
              <div className="text-center mb-6">
                <div className="mb-2">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <p className="text-white font-futuristic mb-4">
                  A verification code has been sent to your email address. Enter
                  the 6-digit code below to verify your account.
                </p>
                <p className="text-gray-300 text-sm mb-4">
                  If you don't see the email, check your spam folder or request
                  a new code.
                </p>
              </div>

              {/* OTP Input Fields */}
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <div key={index} className="w-11 h-14 relative">
                    <input
                      type="text"
                      maxLength={1}
                      ref={(el) => {
                        otpRefs.current[index] = el;
                      }}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-full h-full text-center bg-gray-900 text-neon text-xl font-cyber border-2 border-neon/50 rounded-md focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon"
                    />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-neon"></div>
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-neon"></div>
                  </div>
                ))}
              </div>

              {error && (
                <div className="bg-red-900/40 border border-red-500 text-white p-3 rounded-md mb-4 text-center text-sm">
                  {error}
                </div>
              )}

              {resendSuccess && (
                <div className="bg-neon/20 border border-neon text-white p-3 rounded-md mb-4 text-center">
                  Verification code sent successfully!
                </div>
              )}

              <button
                onClick={handleVerifyOtp}
                disabled={verifying}
                className="cyber-button w-full py-2 px-4 relative overflow-hidden group mb-4"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                <span className="relative z-10">
                  {verifying ? "VERIFYING..." : "VERIFY ACCOUNT"}
                </span>
              </button>

              <div className="text-center text-sm mb-4">
                <button
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="text-neon hover:text-accent transition-colors font-futuristic"
                >
                  {isResending ? "SENDING..." : "RESEND VERIFICATION CODE"}
                </button>
              </div>
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
                Email verified successfully!
              </p>
              <p className="text-gray-300 text-sm mb-6">
                Redirecting you to login page...
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-white font-futuristic">
              Already verified?{" "}
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

export default EmailVerificationPage;
