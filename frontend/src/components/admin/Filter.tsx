import React, { useState } from "react";

interface FilterProps {
  onFilter: (eventName: string, eventType: string, status: string) => void;
  filteredEmails: string[];
}

const Filter: React.FC<FilterProps> = ({ onFilter, filteredEmails }) => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [status, setStatus] = useState("");

  const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
    onFilter(e.target.value, eventType, status);
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventType(e.target.value);
    onFilter(eventName, e.target.value, status);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onFilter(eventName, eventType, e.target.value);
  };

  const handleSendEmail = () => {
    if (filteredEmails.length > 0) {
      // const mailtoLink = `mailto:${filteredEmails.join(",")}`;
      const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${filteredEmails.join(
        ","
      )}`;
      window.location.href = gmailURL;
    }
  };

  return (
    <div className="mb-4 space-y-2">
      <div>
        <label className="mr-2">Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={handleEventNameChange}
          placeholder="Search by event name"
          className="border p-1 rounded-md"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <div>
            <label className="mr-2">Event Type:</label>
            <select
              value={eventType}
              onChange={handleEventTypeChange}
              className="border p-1 rounded-md" // Explicitly set background color
              style={{
                backgroundColor: "transparent",
                color: "inherit",
              }}
            >
              <option
                value=""
                className="bg-blue-700" // Use Tailwind background class
              >
                All
              </option>
              <option
                value="individual"
                className="bg-blue-700" // Use Tailwind background class
              >
                Individual
              </option>
              <option
                value="team"
                className="bg-blue-700" // Use Tailwind background class
              >
                Team
              </option>
            </select>
          </div>
          <div>
            <label className="mr-2">Status:</label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="border p-1 rounded-md" // Explicitly set background color
              style={{
                backgroundColor: "transparent",
                color: "inherit",
              }}
            >
              <option
                value=""
                className="bg-blue-700" // Use Tailwind background class
              >
                All
              </option>
              <option
                value="verified"
                className="bg-blue-700" // Use Tailwind background class
              >
                Verified
              </option>
              <option
                value="unverified"
                className="bg-blue-700" // Use Tailwind background class
              >
                Unverified
              </option>
            </select>
          </div>
        </div>
        <button
          onClick={handleSendEmail}
          className="bg-blue-500 text-sm sm:text-base text-white px-1 sm:px-2 py-1 rounded hover:bg-blue-600 text-nowrap"
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default Filter;
