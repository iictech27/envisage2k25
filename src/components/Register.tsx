import { useState, useRef } from "react";
import Header from "./Header";

// Event data with fees and mode of conduction
const eventOptions = [
  { id: 1, name: "VR Hackathon", fee: 500, mode: "Virtual" },
  { id: 2, name: "Metaverse Art Gallery", fee: 300, mode: "Virtual" },
  { id: 3, name: "Crypto Conference", fee: 750, mode: "On Campus" },
  { id: 4, name: "Gaming Tournament", fee: 400, mode: "Hybrid" },
  { id: 5, name: "AI Workshop", fee: 600, mode: "On Campus" },
  { id: 6, name: "Digital Fashion Show", fee: 350, mode: "Virtual" },
  { id: 7, name: "Web3 Development", fee: 800, mode: "Hybrid" },
  { id: 8, name: "NFT Creation Workshop", fee: 450, mode: "Virtual" },
];

// Year options for dropdown
const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

// QR Code Modal Component
const QRCodeModal = ({ isOpen, onClose, totalFees, onPaymentComplete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-primary p-6 rounded-lg max-w-md w-full glass-card">
        <h3 className="text-xl font-cyber text-white mb-4">
          Complete Payment of ₹{totalFees}
        </h3>
        <div className="bg-white p-4 rounded-lg mb-4 flex justify-center">
          {/* Placeholder for QR code */}
          <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-800">QR Code Placeholder</span>
          </div>
        </div>
        <p className="text-sm text-gray-300 mb-4">
          Scan this QR code to complete your payment. After payment, click the
          button below to confirm.
        </p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onPaymentComplete}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-400 text-white rounded hover:opacity-90"
          >
            I've Completed Payment
          </button>
        </div>
      </div>
    </div>
  );
};

// Form Input Component
const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  options = [],
  color = "#22d3ee",
  name,
  accept,
}) => {
  const inputRef = useRef(null);

  const handleFileButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="mb-4">
      <label
        className="block text-white font-futuristic mb-2 text-sm"
        style={{ color }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "select" ? (
        <select
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{ borderColor: color, boxShadow: `0 0 5px ${color}33` }}
          value={value}
          onChange={onChange}
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
      ) : type === "textarea" ? (
        <textarea
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{ borderColor: color, boxShadow: `0 0 5px ${color}33` }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          rows={4}
        ></textarea>
      ) : type === "file" ? (
        <div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={onChange}
            name={name}
            required={required}
            accept={accept}
          />
          <button
            type="button"
            onClick={handleFileButtonClick}
            className="bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none hover:bg-gray-700 transition-colors"
            style={{ borderColor: color, boxShadow: `0 0 5px ${color}33` }}
          >
            Choose File
          </button>
        </div>
      ) : (
        <input
          type={type}
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{ borderColor: color, boxShadow: `0 0 5px ${color}33` }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
        />
      )}
    </div>
  );
};

interface RegisterProps {
  onClose: () => void;
}

const Register = ({ onClose }: RegisterProps) => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    events: [],
    paymentMethod: "",
    message: "",
  });

  // Additional state
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [totalFees, setTotalFees] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle event selection
  const handleEventChange = (e) => {
    const eventId = parseInt(e.target.value);
    const event = eventOptions.find((event) => event.id === eventId);

    if (event) {
      // Check if event is already selected
      if (selectedEvents.some((e) => e.id === event.id)) {
        // Remove event
        const updatedEvents = selectedEvents.filter((e) => e.id !== event.id);
        setSelectedEvents(updatedEvents);
        // Update total fees
        const newTotal = updatedEvents.reduce((sum, e) => sum + e.fee, 0);
        setTotalFees(newTotal);
      } else {
        // Add event
        const updatedEvents = [...selectedEvents, event];
        setSelectedEvents(updatedEvents);
        // Update total fees
        const newTotal = updatedEvents.reduce((sum, e) => sum + e.fee, 0);
        setTotalFees(newTotal);
      }
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0]);
    }
  };

  // Handle payment completion
  const handlePaymentComplete = () => {
    setPaymentComplete(true);
    setShowQRCode(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission
    console.log("Form submitted:", {
      ...formData,
      events: selectedEvents,
      totalFees,
    });
    // Show success message or redirect
    alert("Registration successful! Thank you for registering.");
    onClose();
  };

  return (
    <>
      <Header />
      <section className="min-h-screen py-20 bg-primary relative overflow-x-hidden">
        {/* Static background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/90 to-primary z-0"></div>

        <div className="container mx-auto px-4 pt-16 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-cyber font-bold mb-4">
                <span className="text-white">REGISTER FOR </span>
                <span className="text-accent">ENVISAGE 2025</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto font-futuristic">
                Join us for the ultimate metaverse experience. Complete the form
                below to secure your spot.
              </p>
            </div>

            <div className="bg-gray-900/70 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg border border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-element">
                    <FormInput
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required={true}
                      color="#22d3ee"
                      name="name"
                    />
                  </div>

                  <div className="form-element">
                    <FormInput
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required={true}
                      color="#7c3aed"
                      name="email"
                    />
                  </div>

                  <div className="form-element">
                    <FormInput
                      label="Phone Number"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required={true}
                      color="#ec4899"
                      name="phone"
                    />
                  </div>

                  <div className="form-element">
                    <FormInput
                      label="College/University"
                      placeholder="Enter your college name"
                      value={formData.college}
                      onChange={handleChange}
                      required={true}
                      color="#10b981"
                      name="college"
                    />
                  </div>

                  <div className="form-element">
                    <FormInput
                      label="Year of Study"
                      type="select"
                      value={formData.year}
                      onChange={handleChange}
                      required={true}
                      options={yearOptions}
                      color="#f59e0b"
                      name="year"
                    />
                  </div>

                  <div className="form-element">
                    <FormInput
                      label="Payment Method"
                      type="select"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      required={true}
                      options={["UPI", "Net Banking", "Credit/Debit Card"]}
                      color="#8b5cf6"
                      name="paymentMethod"
                    />
                  </div>
                </div>

                <div className="form-element mt-4">
                  <label className="block text-white font-futuristic mb-2 text-sm">
                    Select Events <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {eventOptions.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md border border-gray-700"
                      >
                        <input
                          type="checkbox"
                          id={`event-${event.id}`}
                          value={event.id}
                          checked={selectedEvents.some(
                            (e) => e.id === event.id,
                          )}
                          onChange={handleEventChange}
                          className="form-checkbox h-5 w-5 text-cyan-400 rounded"
                        />
                        <label
                          htmlFor={`event-${event.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium text-white">
                            {event.name}
                          </div>
                          <div className="text-sm text-gray-400 flex justify-between">
                            <span>₹{event.fee}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                event.mode === "Virtual"
                                  ? "bg-cyan-900 text-cyan-300"
                                  : event.mode === "On Campus"
                                  ? "bg-purple-900 text-purple-300"
                                  : "bg-amber-900 text-amber-300"
                              }`}
                            >
                              {event.mode}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-element mt-4 p-4 bg-gray-800/50 rounded-md border border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-futuristic">
                      Total Registration Fee:
                    </span>
                    <span className="text-2xl font-cyber text-accent">
                      ₹{totalFees}
                    </span>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setShowQRCode(true)}
                      className="w-full py-2 bg-gradient-to-r from-purple-600 to-cyan-400 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
                      disabled={totalFees === 0}
                    >
                      Proceed to Payment
                    </button>
                    {totalFees === 0 && (
                      <p className="text-xs text-amber-400 mt-1">
                        Please select at least one event
                      </p>
                    )}
                  </div>
                </div>

                {paymentComplete && (
                  <div className="form-element mt-3">
                    <FormInput
                      label="Upload Payment Screenshot"
                      type="file"
                      onChange={handleFileChange}
                      required={true}
                      color="#10b981"
                      name="paymentScreenshot"
                      accept="image/*"
                    />
                    {paymentScreenshot && (
                      <p className="text-xs text-green-400 mt-1">
                        ✓ Payment screenshot uploaded
                      </p>
                    )}
                  </div>
                )}

                <div className="form-element mt-3">
                  <FormInput
                    label="Additional Information"
                    type="textarea"
                    placeholder="Any additional information you'd like to share..."
                    value={formData.message}
                    onChange={handleChange}
                    color="#8b5cf6"
                    name="message"
                  />
                </div>

                <div className="form-element mt-6 text-center">
                  <button
                    type="submit"
                    className="cyber-button text-lg px-8 py-3 relative overflow-hidden group"
                    disabled={!paymentComplete || !paymentScreenshot}
                    style={{
                      background: "linear-gradient(45deg, #7c3aed, #22d3ee)",
                      boxShadow:
                        "0 0 20px rgba(124, 58, 237, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)",
                      opacity: !paymentComplete || !paymentScreenshot ? 0.5 : 1,
                    }}
                  >
                    <span className="relative z-10 font-bold">
                      SUBMIT REGISTRATION
                    </span>
                  </button>
                  {!paymentComplete && (
                    <p className="text-xs text-amber-400 mt-2">
                      Complete payment to enable registration
                    </p>
                  )}
                </div>
              </form>
            </div>

            <div className="text-center mt-4 text-gray-400 font-futuristic text-sm">
              <p>
                By registering, you agree to our{" "}
                <a href="#" className="text-neon hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-neon hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        <QRCodeModal
          isOpen={showQRCode}
          onClose={() => setShowQRCode(false)}
          totalFees={totalFees}
          onPaymentComplete={handlePaymentComplete}
        />
      </section>
    </>
  );
};

export default Register;
