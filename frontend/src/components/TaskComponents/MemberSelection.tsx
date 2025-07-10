import { useState } from "react";
import { useAllMemberStore } from "./TaskStore";

type inputSchema =  {
    selectedMembers : any  , 
    setSelectedMembers : any  
}



export default function MemberSelectionDialog({selectedMembers , setSelectedMembers} :inputSchema) {
    const members = useAllMemberStore((state : any)=>state.AllmembersArray)
    

  const [isOpen, setIsOpen] = useState(false);

  const toggleMember = (id: number, name: string) => {
    setSelectedMembers((prev : any) => {
      const exists = prev.find((m : any) => m.id === id);
      if (exists) {
        // Remove if already selected
        return prev.filter((m : any) => m.id !== id);
      } else {
        // Add if not selected
        return [...prev, { id, name }];
      }
    });
  };

  const isSelected = (id: number) => {
    return selectedMembers.some((m : any) => m.id === id);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsOpen(true)}
        className="px-2 py-2 w-36 bg-blue-600 text-white rounded"
      >
        Select Members
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-2xl bg-opacity-50">
          <div className="bg-white rounded p-4 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Select Members</h2>

            <div className="space-y-2">
              {members.map((member:any) => (
                <button
                  key={member._id}
                  onClick={() => toggleMember(member._id, member.name)}
                  className={`flex justify-between w-full p-2 border rounded ${
                    isSelected(member._id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <span>{member.name}</span>
                  {isSelected(member._id) && (
                    <span className="text-blue-600 font-bold">✔</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                
                  setIsOpen(false);
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
