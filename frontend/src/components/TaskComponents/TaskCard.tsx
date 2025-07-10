
import { useNavigate } from "react-router";

export default function TaskCard({details}: any) {
  const navigate = useNavigate()
  const isoString: string = details.due_date
  const date : string = isoString?.split("T")[0];

  const priority = ()=>{
    switch(details.priority) {
      case 'HIGH' : return "text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200"
      case 'MEDIUM' : return "text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200"
      case 'LOW' : return "text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200"
    }
  }
  
  return (
    <div onClick={()=>{
     
      navigate(`/admin/projects/task/${details._id}`, {state :{
        details : details
      }})
    }} className="w-full bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-3 shadow hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full border border-indigo-200">
          {date}
        </span>
        <span  className= {priority()}>
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
