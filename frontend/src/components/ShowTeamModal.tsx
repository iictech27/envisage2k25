import { useState } from "react";

interface TeamMemberModalProps {
  event: { id: number; title: string } | null;
  isOpen: boolean;
  onClose: () => void;
  onAddTeamMember: (name: string, email: string, year:string, department:string) => void;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  event,
  isOpen,
  onClose,
  onAddTeamMember,
}) => {
  const [teamMemberName, setTeamMemberName] = useState<string>("");
  const [teamMemberEmail, setTeamMemberEmail] = useState<string>("");
  const [teamMemberYear, setTeamMemberYear] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to handle adding a team member
  const handleAddMember = () => {
    if (!teamMemberName || !teamMemberEmail || !teamMemberYear || !department) {
      setErrorMessage("All fields are required.");
      return;
    }

    setErrorMessage(""); 
    setIsLoading(true); 

    
    setTimeout(() => {
      onAddTeamMember(teamMemberName, teamMemberEmail, teamMemberYear, department);
      setTeamMemberName("");
      setTeamMemberEmail("");
      setTeamMemberYear("")
      setDepartment("")
      setIsLoading(false);
      onClose(); 
    }, 1000); 
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md w-80 max-w-lg">
          <h2 className="text-xl text-purple-500  font-bold text-center text-gray-900 mb-4">
            {event ? `Add/Edit Team Member for ${event.title}` : "Add/Edit Team Member"}
          </h2>

          {/* Error message display */}
          {errorMessage && (
            <div className="bg-red-100 text-red-800 p-2 rounded mb-4 text-sm">
              {errorMessage}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="teamMemberName">
              Team Member Name:
            </label>
            <input
              type="text"
              id="teamMemberName"
              value={teamMemberName}
              onChange={(e) => setTeamMemberName(e.target.value)}
              placeholder="Enter team member's name"
              className="w-full p-2 border text-black font-semibold border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="teamMemberEmail">
              Team Member Email:
            </label>
            <input
              type="email"
              id="teamMemberEmail"
              value={teamMemberEmail}
              onChange={(e) => setTeamMemberEmail(e.target.value)}
              placeholder="Enter team member's email"
              className="w-full p-2 border text-black font-semibold border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="teamMemberEmail">
              Department:
            </label>
            <input
              type="text"
              id="teamMemberDept"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter team member's Dept."
              className="w-full p-2 border text-black font-semibold border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="teamMemberEmail">
              Year of Department:
            </label>
            <input
              type="email"
              id="teamMemberDeptYr"
              value={teamMemberYear}
              onChange={(e) => setTeamMemberYear(e.target.value)}
              placeholder="Enter team member's Dept Year"
              className="w-full p-2 border text-black font-semibold border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              className="px-4 cursor-pointer py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={onClose}
            >
              Close
            </button>

            <button
              className={`px-4 py-2 rounded-md cursor-pointer text-white ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-800"
              }`}
              onClick={handleAddMember}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Member"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TeamMemberModal;
