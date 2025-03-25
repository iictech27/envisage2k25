import React from "react";
import * as XLSX from "xlsx";

export interface Event {
  name: string;
  type: string;
}

export interface Registration {
  regID: string;
  email: string;
  fullname: string;
  events: Event[];
  paymentProof: string;
  verified: boolean;
  phone?: string;
  year?: number;
  college?: string;
}

export interface RegistrationListProps {
  registrations: Registration[];
  onVerify: (email: string) => void;
  showPaymentProof?: boolean;
}

const RegistrationList: React.FC<RegistrationListProps> = ({
  registrations,
  onVerify,
  showPaymentProof = false,
}) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      registrations.map((reg) => ({
        Email: reg.email,
        "Full Name": reg.fullname,
        "Registered Events": reg.events
          .map((event) => `${event.name} (${event.type})`)
          .join(", "),
        Verified: reg.verified ? "Yes" : "No",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(workbook, "registrations.xlsx");
  };

  return (
    <div>
      <button
        onClick={exportToExcel}
        className="mb-4 float-right bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
      >
        Export to Excel
      </button>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Full Name</th>
            <th className="border px-4 py-2 text-left">Registered Events</th>
            {showPaymentProof && (
              <th className="border px-4 py-2 text-left">Payment Proof</th>
            )}
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg, index) => (
            <tr
              key={index}
              className="border odd:bg-transparent even:bg-white/10"
            >
              <td className="border px-4 py-2">{reg.email}</td>
              <td className="border px-4 py-2">{reg.fullname}</td>
              <td className="border px-4 py-2">
                {reg.events.map((event, idx) => (
                  <p key={idx}>
                    {event.name} ({event.type})
                  </p>
                ))}
              </td>
              {showPaymentProof && (
                <td className="border px-4 py-2">
                  <a
                    href={reg.paymentProof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Image
                  </a>
                </td>
              )}
              <td className="border px-4 py-2">
                {reg.verified ? (
                  <span className="text-green-500">Verified</span>
                ) : (
                  <button
                    onClick={() => onVerify(reg.email)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Verify
                  </button>
                )}
                <button className="ml-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                  Send Email
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationList;
