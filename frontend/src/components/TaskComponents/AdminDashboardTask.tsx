
import TaskCard  from './TaskCard'
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CardSkeleton } from "../Skeleton";
import { useMemberStore } from './TaskStore';

export default function TaskBoard() {
  const projectId = localStorage.getItem('projectId')
  const [tasks , setTasks] = useState([{}]);
  const [loading , setLoading] = useState(true);
  const [title , settitle] = useState();
  const [description , setDescription] = useState() 
  const [users , setUsers] = useState([{}]);
  const addMembers = useMemberStore((state:any)=>state.addMembers)
  const mySet = new Array
  
  
  useEffect(()=>{
    axios.get(`http://localhost:3000/api/v1/project/${projectId}` , {
      headers :{
        Authorization : localStorage.getItem('token')
      }
    }).then((response)=>{
            const data = response.data.tasks
            setUsers(response.data.users)
            settitle(response.data.title)
            setDescription(response.data.description)
            setTasks(data)
            setLoading(false)
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
  }, [])
  
  const seenIDs = new Set();

  if(!loading){
    users.map((item : any)=>{
        item.forEach((ele : any)=>{
            if(!seenIDs.has(ele._id)){
                seenIDs.add(ele._id)
                mySet.push(ele)
            }
        })
    }) 
    addMembers(mySet)
   
  }
 
 

  return (<>
    {loading ?<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 auto-rows-[160px]">
      {Array.from({ length: 15 }).map((_ , id) => {
          return  <CardSkeleton  key={id} />
        })}
      </div> :<div className="p-4">
        <div className="bg-white p-2 rounded-4xl">
      <div className="w-full px-3 my-2 font-bold text-3xl text-slate-800">{title}</div>
      <div className="w-full px-3 my-1 font-bold text-2xl text-slate-500">{description}</div>
      <div className="w-full px-3 font-bold text-xl text-slate-800">My Tasks</div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-4">
        {/* TODO Column */}
        <div className="flex flex-col bg-gradient-to-b from-blue-50 to-white border border-blue-200 rounded-xl shadow-sm">
          <div className="text-xl font-bold text-blue-700 py-2 text-center border-b border-blue-200">
            TODO
          </div>
          <div className="p-2 space-y-2">
            {tasks.filter((item: any) => item.status === "TODO").map((item:any)=>{
              return <TaskCard key={item._id}  details={item}/>
            })}
          </div>
        </div>
        {/* IN PROGRESS Column */}
        <div className="flex flex-col bg-gradient-to-b from-yellow-50 to-white border border-yellow-200 rounded-xl shadow-sm">
          <div className="text-xl font-bold text-yellow-700 py-2 text-center border-b border-yellow-200">
            IN PROGRESS
          </div>
          <div className="p-2 space-y-2">
            {tasks.filter((item: any) => item.status === "IN PROGRESS").map((item:any)=>{
              return <TaskCard key={item._id}  details={item}/>
            })}
          </div>
        </div>
        {/* DONE Column */}
        <div className="flex flex-col bg-gradient-to-b from-green-50 to-white border border-green-200 rounded-xl shadow-sm">
          <div className="text-xl font-bold text-green-700 py-2 text-center border-b border-green-200">
            DONE
          </div>
          <div className="p-2 space-y-2">
            {tasks.filter((item: any) => item.status === "DONE").map((item:any)=>{
              return <TaskCard key={item._id}  details={item}/>
            })}
          </div>
        </div>
      </div>
    </div>
    </div>
    }
    </>
  );
}
