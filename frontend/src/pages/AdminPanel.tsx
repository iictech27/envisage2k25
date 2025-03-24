import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filter from "../components/admin/Filter";
import RegistrationList, {
  Registration,
} from "../components/admin/RegistrationList";
import { AppDispatch, RootState } from "../store"; // adjust the path based on your project structure
import { clearAdmin } from "../features/adminSlice";

const dummyRegistrations: Registration[] = [
  {
    email: "john@example.com",
    fullname: "John Doe",
    events: [
      { name: "React Workshop", type: "individual" },
      { name: "Team Hackathon", type: "team" },
    ],
    paymentProof: "https://via.placeholder.com/150",
    verified: false,
  },
  {
    email: "jane@example.com",
    fullname: "Jane Smith",
    events: [{ name: "Vue Seminar", type: "individual" }],
    paymentProof: "https://via.placeholder.com/150",
    verified: false,
  },
];

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // Check if admin is logged in
  const admin = useSelector((state: RootState) => state.admin.admin);

  useEffect(() => {
    if (!admin) {
      navigate("/admin-login");
    }
  }, [admin, navigate]);

  const [registrations, setRegistrations] =
    useState<Registration[]>(dummyRegistrations);
  const [filteredRegistrations, setFilteredRegistrations] =
    useState<Registration[]>(registrations);

  const handleFilter = (eventName: string, eventType: string) => {
    const filtered = registrations.filter((reg) => {
      const nameMatch = eventName
        ? reg.events.some((event) =>
            event.name.toLowerCase().includes(eventName.toLowerCase())
          )
        : true;
      const typeMatch = eventType
        ? reg.events.some((event) => event.type === eventType)
        : true;
      return nameMatch && typeMatch;
    });
    setFilteredRegistrations(filtered);
  };

  const handleVerify = (email: string) => {
    setRegistrations((prev) =>
      prev.map((reg) =>
        reg.email === email ? { ...reg, verified: true } : reg
      )
    );
    setFilteredRegistrations((prev) =>
      prev.map((reg) =>
        reg.email === email ? { ...reg, verified: true } : reg
      )
    );
  };

  const handleLogout = () => {
    dispatch(clearAdmin());
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
      <Filter
        onFilter={handleFilter}
        filteredEmails={[
          ...new Set(filteredRegistrations.map((reg) => reg.email)),
        ]}
      />
      <RegistrationList
        registrations={filteredRegistrations}
        onVerify={handleVerify}
        showPaymentProof={true}
      />
    </div>
  );
};

export default AdminPanel;
