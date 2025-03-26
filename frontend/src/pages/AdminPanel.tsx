import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filter from "../components/admin/Filter";
import RegistrationList, {
  Registration,
} from "../components/admin/RegistrationList";
import { AppDispatch, RootState } from "../store"; // adjust path as needed
import {
  clearAdmin,
  fetchRegistrations,
  rejectRegistrationThunk,
  verifyRegistrationThunk,
} from "../features/adminSlice";

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Check if admin is logged in
  const admin = useSelector((state: RootState) => state.admin.admin);
  const registrations = useSelector(
    (state: RootState) => state.admin.registrations
  );
  const loading = useSelector((state: RootState) => state.admin.loading);
  const { verifyLoading, rejectLoading } = useSelector(
    (state: RootState) => state.admin
  );

  const [filteredRegistrations, setFilteredRegistrations] = useState<
    Registration[]
  >([]);

  useEffect(() => {
    if (!admin) {
      navigate("/admin-login");
    }
  }, [admin, navigate]);

  // Fetch registrations on mount or refresh
  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  // Update local filtered state when registrations change
  useEffect(() => {
    setFilteredRegistrations(registrations);
  }, [registrations]);

  // Filter registration entries
  const handleFilter = (
    eventName: string,
    eventType: string,
    status: string
  ) => {
    const filtered = registrations.filter((reg) => {
      const nameMatch = eventName
        ? reg.events.some((event) =>
            event.name.toLowerCase().includes(eventName.toLowerCase())
          )
        : true;
      const typeMatch = eventType
        ? reg.events.some((event) =>
            event.type.toLowerCase().includes(eventType.toLowerCase())
          )
        : true;
      const statusMatch =
        status === "verified"
          ? reg.verified === true
          : status === "unverified"
          ? reg.verified === false
          : true;
      return nameMatch && typeMatch && statusMatch;
    });
    setFilteredRegistrations(filtered);
  };

  // Verify registration by dispatching verifyRegistrationThunk
  const handleVerify = async (regID: string) => {
    await dispatch(verifyRegistrationThunk(regID));
  };

  // Verify registration by dispatching verifyRegistrationThunk
  const handleReject = async (regID: string) => {
    await dispatch(rejectRegistrationThunk(regID));
  };

  const handleLogout = () => {
    dispatch(clearAdmin());
  };

  const handleRefresh = () => {
    dispatch(fetchRegistrations());
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="flex gap-1">
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Logout
          </button>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
      </div>
      <Filter
        onFilter={handleFilter}
        filteredEmails={[
          ...new Set(filteredRegistrations.map((reg) => reg.email)),
        ]}
      />
      {loading ? (
        <div>Loading registrations...</div>
      ) : (
        <RegistrationList
          registrations={filteredRegistrations}
          onVerify={handleVerify}
          onReject={handleReject}
          verifyLoading={verifyLoading}
          rejectLoading={rejectLoading}
          showPaymentProof={true}
        />
      )}
    </div>
  );
};

export default AdminPanel;
