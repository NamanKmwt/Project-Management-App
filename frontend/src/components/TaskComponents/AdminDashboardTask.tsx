
import TaskCard  from './TaskCard'
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CardSkeleton } from "../Skeleton";
import { useMemberStore } from './TaskStore';
import { useNavigate } from 'react-router';

export default function TaskBoard() {
  const projectId = localStorage.getItem('projectId')
  const [tasks , setTasks] = useState([{}]);
  const [loading , setLoading] = useState(true);
  const [title , settitle] = useState('');
  const [description , setDescription] = useState('') 
  const [users , setUsers] = useState([{}]);
  const addMembers = useMemberStore((state:any)=>state.addMembers)
  const mySet = new Array
  const navigate = useNavigate()
  const [update , setUpdate] = useState('UPDATE')
  
  
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
        { update == 'UPDATE' ?   <>
          <div className="w-full px-3 my-2 font-bold text-3xl text-slate-800">{title}</div>
          <div className="w-full px-3 my-1 font-bold text-2xl text-slate-500">{description}</div>
          </> : <>
          <input onChange={(e)=>{
            settitle(e.target.value)
          }} type="text" className="w-full rounded-2xl border px-3 my-2 font-bold text-3xl text-slate-800" defaultValue={title}/>
          <input onChange={(e)=>{
            setDescription(e.target.value)
          }} type="text" className="w-full rounded-2xl border px-3 my-1 font-bold text-2xl text-slate-500" defaultValue={description}/>
          </>
        }
      <div className='flex justify-between'>
      <div className=" px-3 font-bold text-xl text-slate-800">My Tasks</div>
      <div className='flex '>
        {update == 'UPDATE' ? 
        <button onClick={()=>{
          setUpdate('SAVE')
        }} className="px-5 py-2 cursor-pointer bg-zinc-200 text-zinc-800 hover:bg-zinc-300 text-base font-semibold rounded-full">
            Update Project
        </button> : <button onClick={()=>{
          axios.put('http://localhost:3000/api/v1/project/update' , {
            title : title, 
            description : description
          }, {
            headers : {
              Authorization : localStorage.getItem('token')
            } , 
            params :{
              projectID : projectId
            }
            
          }).then((response)=>{
          toast.success('Project Updated Successfully', {
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
          
        }).catch((e)=>{
          console.log(e)
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
          setUpdate('UPDATE')

        }}  className="px-5 py-2 cursor-pointer bg-violet-200 text-violet-800 hover:bg-violet-300 text-base font-semibold rounded-full">
            Save Project
        </button>
}
      <div className="  px-3 font-bold text-xl text-slate-800"><img onClick={(e)=>{
        e.preventDefault();
        axios.delete('http://localhost:3000/api/v1/project/deleteProject' , {
          headers :{
            Authorization : localStorage.getItem('token')
          },
          data :{
            projectID : projectId
          }
        }).then((response)=>{
          toast.success('Project Deleted Successfully', {
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
          navigate('/admin/projects')
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
        }} className='w-7 h-7 cursor-pointer hover:scale-110' src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="" /></div>
      </div>
    </div>
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
