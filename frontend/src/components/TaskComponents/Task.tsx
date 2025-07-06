import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Task() {
  const location = useLocation()
  const details = location?.state?.details
  const isoString: string = details.due_date
  const date : string = isoString?.split("T")[0];
  const navigate = useNavigate()
  const projectId = localStorage.getItem('projectId')
  
  return (
    <div className="flex min-h-screen items-center justify-center mb-5 bg-slate-100 ">
      <div className="mt-8 border border-slate-300 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-lg p-8 w-full max-w-5xl space-y-8">
        {/* Top Badges */}
        <div className="flex justify-between ">
        <div className="flex flex-wrap gap-4">
          <div className="px-5 py-2 bg-blue-100 text-blue-800 text-base font-semibold rounded-full">
            {localStorage.getItem('name')?.toUpperCase()}
          </div>
          <div className="px-5 py-2 bg-yellow-100 text-yellow-800 text-base font-semibold rounded-full">
            Status: {details.status}
          </div>
          <div className="px-5 py-2 bg-red-100 text-red-800 text-base font-semibold rounded-full">
            Priority: {details.priority}
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
        <button  className="px-5 py-2 cursor-pointer bg-green-100 text-green-800 text-base font-semibold rounded-full">
            Update Task
        </button>
        <button onClick={(e)=>{
          e.preventDefault();
          axios.delete(`http://localhost:3000/api/v1/project/${projectId}/deleteTask/` ,{
            headers :{
              Authorization : localStorage.getItem('token')
            },
            params :{
              postID : details._id
            }
          })
          .then(()=>{
            toast.success('Task Deleted Successfully', {
            style: {
                border: "2px solid #3fa53b",
                borderRadius: "8px",
                background: "#4BB543",
                color: "#fff",
                padding: "16px",
                boxShadow: "0 0 0 4px rgba(75,181,67,0.3)",
                
                transform: "scale(1)",
                opacity: "1",
                transition: "all 400ms ease",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#4BB543",
            },
            });
            navigate('/admin/projects/task')
          }).catch((e)=>{
            toast.error(e.response.data.msg, {
            style: {
                borderRadius: '8px',
                background: '#ff4d4f',
                color: '#fff',
                padding: '16px',
            },
            iconTheme: {
                primary: '#fff',
                secondary: '#ff4d4f',
            },
            });
          })
        }} className="px-5 py-2 cursor-pointer bg-red-500 text-black text-base font-semibold rounded-full">
            <img className="h-6 w-6" src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png" alt="" />
        </button>
        </div>
        </div>

        {/* Title */}
        <div className="border border-slate-200 rounded-lg p-5 text-3xl font-bold text-slate-800">
          {details.title}
        </div>

        {/* Description */}
        <div className="border border-slate-200 rounded-lg p-5 text-lg text-slate-700 leading-relaxed">
          {details.description}
        </div>

        {/* Todo List */}
        <div className="border border-slate-200 rounded-lg p-5 space-y-3">
          <div className="text-xl font-semibold text-slate-800 mb-2">To Do</div>
          <ul className="space-y-1">
              {details['todochecklist']?.map((item : any)=>{
            return  <li key={item._id} className="flex items-center gap-3">
                <span  className="text-slate-700 text-base">{item}</span>
            </li>
              })}
          </ul>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between flex-wrap gap-4">
          <div className="px-5 py-2 bg-slate-100 text-slate-700 text-base font-medium rounded-full">
            Due: {date}
          </div>
          <div className="px-5 py-2 bg-slate-100 text-slate-700 text-base font-medium rounded-full">
            Assigned: {details.usersAssigned.length}
          </div>
        </div>
      </div>
    </div>
  );
}
