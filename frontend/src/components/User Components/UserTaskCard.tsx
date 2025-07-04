
import {  useUserSelectedStore } from "../../context/Store";

export default function UserTaskCard() {
  const setUserSelected = useUserSelectedStore((state:any)=>(state.setUserSelected))
  const title =
    'This is title of the task this is title of the task this is title of the task this is title of the task';
  const description =
    'This is description of the task this is description of the task this is description of the task this is description of the task this is description of the task this is description of the task';

  return (
    <div onClick={()=>{
      setUserSelected('Task')
    }} className="w-full cursor-pointer bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-3 shadow hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full border border-indigo-200">
          Due date
        </span>
        <span className="text-xs text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
          High Priority
        </span>
      </div>

      <div>
        <h2 className="font-bold text-gray-800 text-lg truncate">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
