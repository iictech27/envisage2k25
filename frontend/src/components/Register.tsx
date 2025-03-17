import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { reqEvents } from "../api/fetch";

// Event data with fees and mode of conduction
let resEvents;
try {
  const resEventData = await reqEvents();
  resEvents = resEventData.events;
} catch(error) {
  console.log(error);
}

// WARN: Uncomment and delete dulplicate before production

// const eventOptions = resEvents ? resEvents : [];
const eventOptions = resEvents ? resEvents : [
    {
        id: 0,
        name: "Test_Event_0",
        fee: 50,
        mode: "Virtual - Individual Participation",
    },
    {
        id: 1,
        name: "Test_Event_1",
        fee: 30,
        mode: "Offline - Individual Participation",
    },
    {
        id: 2,
        name: "Test_Event_2",
        fee: 200,
        mode: "Hybrid - Team of 5"
    },
    {
        id: 3,
        name: "Test_Event_3",
        fee: 150,
        mode: "On Campus - Team of 4"
    },
    {
        id: 4,
        name: "Test_Event_4",
        fee: 60,
        mode: "On Campus - Team of 4"
    },
    {
        id: 5,
        name: "Test_Event_5",
        fee: 50,
        mode: "On Campus - Team of 2"
    },
    {
        id: 6,
        name: "Test_Event_6",
        fee: 30,
        mode: "On Campus - Individual Participation",
    },
    {
        id: 7,
        name: "Test_Event_7",
        fee: 200,
        mode: "On Campus - Team of 4",
    }
];

// Year options for dropdown
const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

// Define Event type
interface Event {
  id: number;
  name: string;
  fee: number;
  mode: string;
}

// Define PaymentModal Props
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalFees: number;
  onPaymentComplete: () => void;
}

// Payment Modal Component
const PaymentModal = ({
  isOpen,
  onClose,
  totalFees,
  onPaymentComplete,
  selectedEvents,
}: PaymentModalProps & { selectedEvents: Event[] }) => {
  if (!isOpen) return null;

  const handleConfirmPayment = () => {
    // Log the payment details
    console.log("Payment confirmed for:", {
      totalFees,
      selectedEvents,
    });

    // Complete the payment process
    onPaymentComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-black p-6 rounded-lg max-w-md w-full glass-card relative border border-cyan-500 backdrop-blur-xl">
        {/* Cyberpunk decorative elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-accent"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-neon"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-neon"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-accent"></div>

        <h3 className="text-xl font-cyber text-white mb-4 animate-pulse">
          <span className="text-neon mr-2">PAYMENT</span>{" "}
          <span className="text-accent">₹{totalFees}</span>
        </h3>

        <div className="bg-gray-900 p-4 rounded-lg mb-4 border border-neon">
          <p className="text-neon font-cyber text-center mb-2">
            SELECTED EVENTS
          </p>
          <div className="space-y-2 text-white max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {selectedEvents.map((event) => (
              <div
                key={event.id}
                className="flex justify-between items-center border-b border-gray-800 pb-2"
              >
                <div>
                  <p className="text-white font-cyber text-sm">{event.name}</p>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      event.mode === "Virtual"
                        ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700"
                        : event.mode === "On Campus"
                        ? "bg-purple-900/50 text-purple-300 border border-purple-700"
                        : "bg-amber-900/50 text-amber-300 border border-amber-700"
                    }`}
                  >
                    {event.mode}
                  </span>
                </div>
                <span className="text-accent font-cyber">₹{event.fee}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-800 flex justify-between">
            <span className="text-gray-400">Total:</span>
            <span className="text-accent font-cyber">₹{totalFees}</span>
          </div>
        </div>

        <p className="text-sm text-neon mb-4 font-futuristic">
          Please review your selected events and confirm to proceed with
          payment.
        </p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 border border-gray-700 transition-all duration-300 font-cyber text-sm"
          >
            CANCEL
          </button>
          <button
            onClick={handleConfirmPayment}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-400 text-white rounded hover:opacity-90 font-cyber text-sm relative overflow-hidden group"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
            <span className="relative z-10">COMPLETE PAYMENT</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Define FormInput Props
interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
  options?: Array<any>;
  color?: string;
  name: string;
  accept?: string;
}

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
}: // accept,
FormInputProps) => {
  // const inputRef = useRef<HTMLInputElement>(null);

  // const handleFileButtonClick = () => {
  //   if (inputRef.current) {
  //     inputRef.current.click();
  //   }
  // };

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
            value={value}
            onChange={onChange}
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
            value={value}
            onChange={onChange}
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
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [totalFees, setTotalFees] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInitiatePayment = () => {
    if (
      !selectedEvents.length ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.college ||
      !formData.year ||
      !formData.paymentMethod
    ) {
      alert("Please fill all the fields to proceed");
      console.log(paymentComplete);
      return;
    }
    setShowPaymentModal(true);
  };

  // Handle event selection
  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Handle payment completion
  const handlePaymentComplete = () => {
    setPaymentComplete(true);
    setShowPaymentModal(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
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
      <section className="min-h-screen  bg-primary relative overflow-hidden">
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
                REGISTRATION PORTAL
              </p>
              <div className="mt-6 relative">
                <p className="text-lg text-gray-300 max-w-2xl mx-auto font-futuristic">
                  Enter the metaverse through this portal. Complete your details
                  to access the next level of digital experience.
                </p>
                {/* Decorative separator */}
                <div className="mt-6 flex items-center justify-center">
                  <div className="w-16 h-px bg-accent"></div>
                  <div className="mx-4 text-accent font-cyber text-xs">
                    JACK IN
                  </div>
                  <div className="w-16 h-px bg-neon"></div>
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

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-element">
                    <FormInput
                      label="FULL NAME"
                      placeholder="Enter your identity"
                      value={formData.name}
                      onChange={handleChange}
                      required={true}
                      color="#22d3ee"
                      name="name"
                      accept=""
                    />
                  </div>

                  <div className="form-element">
                    <FormInput
                      label="EMAIL ADDRESS"
                      type="email"
                      placeholder="Enter your digital contact"
                      value={formData.email}
                      onChange={handleChange}
                      required={true}
                      color="#7c3aed"
                      name="email"
                      accept=""
                    />
                  </div>

                  <div className="form-element">
                    <FormInput
                      label="NEURAL LINK (PHONE)"
                      type="tel"
                      placeholder="Enter your connect code"
                      value={formData.phone}
                      onChange={handleChange}
                      required={true}
                      color="#ec4899"
                      name="phone"
                      accept=""
                    />
                  </div>

                  <div className="form-element">
                    <FormInput
                      label="HOME NODE (COLLEGE)"
                      placeholder="Enter your base location"
                      value={formData.college}
                      onChange={handleChange}
                      required={true}
                      color="#10b981"
                      name="college"
                      accept=""
                    />
                  </div>

                  <div className="form-element">
                    <FormInput
                      label="EXPERIENCE LEVEL"
                      type="select"
                      value={formData.year}
                      onChange={handleChange}
                      required={true}
                      options={yearOptions}
                      color="#f59e0b"
                      name="year"
                      accept=""
                    />
                  </div>

                  <div className="form-element">
                    <FormInput
                      label="PAYMENT PROTOCOL"
                      type="select"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      required={true}
                      options={["UPI", "Net Banking", "Credit/Debit Card"]}
                      color="#8b5cf6"
                      name="paymentMethod"
                      accept=""
                    />
                  </div>
                </div>

                <div className="form-element mt-8">
                  <label className="block text-white font-cyber mb-4 text-sm tracking-wider border-b border-neon/30 pb-2">
                    SELECT EXPERIENCES <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eventOptions.length <= 0 && (
                      <p className="text-red-500 text-l mt-1 mb-1">Sorry for the inconvenience! Events will be updated shortly!</p>
                    )}
                    {eventOptions.map((event) => (
                      <div key={event.id} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-accent/20 rounded-md blur-sm group-hover:blur-none transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                        <div className="flex items-center space-x-2 bg-gray-900/80 p-4 rounded-md border border-gray-800 relative hover:border-neon/50 transition-all duration-300 z-10">
                          <input
                            type="checkbox"
                            id={`event-${event.id}`}
                            value={event.id}
                            checked={selectedEvents.some(
                              (e) => e.id === event.id,
                            )}
                            onChange={handleEventChange}
                            className="form-checkbox h-5 w-5 text-neon rounded"
                          />
                          <label
                            htmlFor={`event-${event.id}`}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="font-cyber text-white text-sm">
                              {event.name}
                            </div>
                            <div className="text-sm text-gray-400 flex justify-between items-center mt-1">
                              <span className="text-neon font-cyber">
                                ₹{event.fee}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  event.mode === "Virtual"
                                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700"
                                    : event.mode === "On Campus"
                                    ? "bg-purple-900/50 text-purple-300 border border-purple-700"
                                    : "bg-amber-900/50 text-amber-300 border border-amber-700"
                                }`}
                              >
                                {event.mode}
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-element mt-6">
                  <FormInput
                    label="ADDITIONAL DATA"
                    type="textarea"
                    placeholder="Enter any supplementary information for your profile..."
                    value={formData.message}
                    onChange={handleChange}
                    color="#8b5cf6"
                    name="message"
                    accept=""
                  />
                </div>
                <div className="form-element mt-8 p-6 bg-gray-900/80 rounded-md border border-neon/30 relative overflow-hidden">
                  {/* Animated background for payment section */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-accent/20 to-transparent"></div>
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-cyber tracking-wider">
                        TOTAL CREDITS:
                      </span>
                      <span className="text-3xl font-cyber text-accent">
                        ₹{totalFees}
                      </span>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handleInitiatePayment}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-400 text-white font-cyber rounded-md hover:opacity-90 transition-opacity relative overflow-hidden group"
                        disabled={totalFees === 0}
                      >
                        {/* Animated hover effect */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/0 via-white/20 to-cyan-400/0 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></span>
                        <span className="relative z-10 tracking-widest">
                          INITIATE PAYMENT
                        </span>
                      </button>
                      {totalFees === 0 && (
                        <p className="text-xs text-amber-400 mt-2 font-futuristic">
                          //ERROR: Select at least one experience to continue
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* <div className="form-element mt-8 text-center">
                  <button
                    type="submit"
                    className="cyber-button text-lg px-10 py-4 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!paymentComplete}
                  >
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 z-0"></div>
                    <div className="absolute inset-px bg-gray-900 z-10 group-hover:bg-opacity-0 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-grid-pattern opacity-20 z-20"></div>

                    
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon transition-all duration-500 z-20"></div>

                  
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-neon z-30"></div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-accent z-30"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-accent z-30"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-neon z-30"></div>

                    <span className="relative z-40 font-cyber tracking-widest group-hover:text-white transition-colors duration-300">
                      INITIALIZE ACCESS
                    </span>
                  </button>
                  {!paymentComplete && (
                    <p className="text-xs text-amber-400 mt-3 font-futuristic">
                      //SYSTEM: Complete payment protocol to unlock registration
                    </p>
                  )}
                </div> */}
              </form>
            </div>

            <div className="text-center mt-6 text-gray-400 font-futuristic text-sm">
              <p className="relative inline-block">
                By registering, you accept the{" "}
                <a
                  href="#"
                  className="text-neon hover:underline relative inline-block group"
                >
                  Neural Contract
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon group-hover:w-full transition-all duration-300"></span>
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-accent hover:underline relative inline-block group"
                >
                  Data Protocols
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300"></span>
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          totalFees={totalFees}
          onPaymentComplete={handlePaymentComplete}
          selectedEvents={selectedEvents}
        />
      </section>
      <Footer />
    </>
  );
};

export default Register;
