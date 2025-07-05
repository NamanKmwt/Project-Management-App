
import { useNavigate } from "react-router";
import {  useUserSelectedStore } from "../../context/Store";

export default function UserTaskCard({details}:any) {
  
  const navigate = useNavigate()
  const isoString: string = details.due_date
  const date : string = isoString?.split("T")[0];
  const setUserSelected = useUserSelectedStore((state:any)=>(state.setUserSelected))
 

  return (
    <div onClick={()=>{
      navigate(`/user/projects/${details._id}` , {state :{
        details : details
      }})
    }} className="w-full cursor-pointer bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-3 shadow hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full border border-indigo-200">
          {date}
        </span>
        <span className="text-xs text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
          {details.priority} Priority
        </span>
      </div>

      <div>
        <h2 className="font-bold text-gray-800 text-lg truncate">
          {details.title}
        </h2>
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          {details.description}
        </p>
      </div>
    </div>
  );
}
