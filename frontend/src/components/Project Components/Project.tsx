

import { useNavigate } from "react-router";

type InputTypes = {
  title: string;
  id : string
};

export default function ProjectCard({ title , id }: InputTypes) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        localStorage.setItem('projectId' , id);
        navigate("/admin/projects/task" );
      }}
      className="flex flex-col relative justify-between border border-indigo-300 rounded-xl bg-gradient-to-br from-indigo-50 to-white hover:from-indigo-100 hover:to-white transition-all cursor-pointer m-4 p-4 max-w-sm shadow-sm"
    >
      <div className="text-lg font-semibold text-indigo-800 break-words">
        {title.length > 36 ? title.substring(0, 36) + "..." : title}
      </div>
      <div className="w-full absolute left-1.5 bottom-1 flex items-end justify-between mt-4">
        <img 
          className="w-8 h-8 "
          src="https://cdn-icons-png.flaticon.com/128/3126/3126647.png"
          alt="Task icon"
        />
        <img
          className="w-14 h-14"
          src="https://cdn-icons-png.flaticon.com/128/16869/16869587.png"
          alt="Project illustration"
        />
      </div>
    </div>
  );
}
