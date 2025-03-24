import React, { useState } from "react";

interface FilterProps {
  onFilter: (eventName: string, eventType: string) => void;
  filteredEmails: string[];
}

const Filter: React.FC<FilterProps> = ({ onFilter, filteredEmails }) => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");

  const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
    onFilter(e.target.value, eventType);
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventType(e.target.value);
    onFilter(eventName, e.target.value);
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
        <div>
          <label className="mr-2">Event Type:</label>
          <select
            value={eventType}
            onChange={handleEventTypeChange}
            className="border p-1 rounded-md"
          >
            <option value="">All</option>
            <option value="individual">Individual</option>
            <option value="team">Team</option>
          </select>
        </div>
        <button
          onClick={handleSendEmail}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default Filter;
