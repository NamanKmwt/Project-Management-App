import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSelectedStoreTask } from "../../context/Store";
import MemberSelectionDialog from "./MemberSelection";
import { Textarea } from "@headlessui/react";
import { useAllMemberStore } from "./TaskStore";

export default function Task() {
  const location = useLocation()
  const details = location?.state?.details
  const isoString: string = details.due_date
  const date : string = isoString?.split("T")[0];
  const navigate = useNavigate()
  const projectId = localStorage.getItem('projectId')
   const [update , setUpdate] = useState('UPDATE')

  const members = useAllMemberStore((state : any)=>state.AllmembersArray)
  
  
  
  const [todo , settodo] = useState<any>(details['todochecklist']);
  const [todoist , setTodoist] = useState('');
  const setSelectedTask = useSelectedStoreTask((state:any)=>(state.setSelectedTask))
  const [selectedMembers, setSelectedMembers] = useState<{id: string, name: string}[]>([]);
  
  useEffect(() => {
    if (!details?.usersAssigned || !Array.isArray(members)) return;
  
    const mem: Array<{ id: string; name: string }> = details.usersAssigned.map((userId: string) => {
      const found = members.find((item: any) => item._id === userId);
      return found ? { id: found._id, name: found.name } : null;
    }).filter(Boolean) as Array<{ id: string; name: string }>;
  
    setSelectedMembers(mem);
  }, [details, members]);

  const [title , settitle] = useState<string>(details.title);
  const [description , setDescription] = useState<string>(details.description);
  const [due_date , setDue_date] = useState<string>(details.due_date);
  const defaultDate = new Date(due_date)
  const [status , setStatus] = useState<string>(details.status);
  const [priority , setPriority] = useState<string>(details.priority);

  const priorityColor = ()=>{
    switch(details.priority) {
      case 'HIGH' : return "px-5 py-2 bg-rose-100 text-rose-700 text-base font-semibold rounded-full"
      case 'MEDIUM' : return "px-5 py-2 bg-amber-100 text-amber-700 text-base font-semibold rounded-full"
      case 'LOW' : return "px-5 py-2 bg-green-100 text-green-700 text-base font-semibold rounded-full"
    }
  }

  const statusColor = ()=>{
    switch(details.status){
      case 'TODO' : return "px-5 py-2 bg-blue-100 text-blue-800 text-base font-semibold rounded-full"
      case 'IN PROGRESS': return "px-5 py-2 bg-yellow-100 text-yellow-800 text-base font-semibold rounded-full"
      case 'DONE' : return "px-5 py-2 bg-green-100 text-green-700 text-base font-semibold rounded-full"
    }
  }

  
  return (<>{update == 'UPDATE' ?  
    <>
    <div className="flex min-h-screen items-center justify-center mb-5 bg-slate-100 ">
      <div className="mt-8 border border-slate-300 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-lg p-8 w-full max-w-5xl space-y-8">
        {/* Top Badges */}
        <div className="flex justify-between ">
        <div className="flex flex-wrap gap-4">
          <div className="px-5 py-2 bg-purple-100 text-purple-700 text-base font-semibold rounded-full">
            {localStorage.getItem('name')?.toUpperCase()}
          </div>
          <div className={statusColor()}>
            Status: {details.status}
          </div>
          <div className={priorityColor()}>
            Priority: {details.priority}
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
        <button onClick={()=>{
          setUpdate('SAVE')
        }} className="px-5 py-2 cursor-pointer bg-zinc-200 text-zinc-800 hover:bg-zinc-300 text-base font-semibold rounded-full">
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
        }} className="px-5 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-black text-base font-semibold rounded-full">
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
  </>
     :
     <div className="flex min-h-screen  items-center justify-center mb-5 bg-slate-100 ">
      <div className="w-full ml-2 px-10 grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <div className="w-full bg-gradient-to-br from-blue-50 to-white col-span-3 rounded-2xl border-slate-400 border pt-2 bg-white">
            <div className="w-full flex px-3 font-bold text-3xl">Update Task</div>
            <div className="p-5">
                <form onSubmit={(e)=>{
                    e.preventDefault()
                }} className="flex flex-col">
                    <label className="text-base font-semibold text-slate-600 ">Task title</label>
                    <input onChange={(e)=>{
                        settitle(e.target.value)
                    }} name="task title" className="border border-slate-400 p-1.5 rounded-sm text-slate-500 my-2 focus:outline-none" type="text" placeholder="Enter task title" defaultValue={title} />
                    <label className="text-base font-semibold text-slate-600 ">Description</label>
                    <Textarea onChange={(e)=>{
                        setDescription(e.target.value)
                    }} className="border border-slate-400 p-1.5 rounded-sm text-slate-500 my-2 focus:outline-none h-auto"  placeholder="Describe Task" defaultValue={description} />

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 ">
                    <div className="flex flex-col">
                    <label className="text-base font-semibold text-slate-600 ">Status</label>
                    <select onChange={(e)=>{
                        setStatus(e.target.value)
                    }} className="border border-slate-400 font-bold p-1.5  rounded-sm text-black my-2 focus:outline-none" defaultValue={status} >
                        <option className="text-black font-bold" hidden value="">Select a value</option>
                        <option className="text-black font-bold" value="TODO">TODO</option>
                        <option className="text-black font-bold" value="IN PROGRESS">IN PROGRESS</option>
                        <option className="text-black font-bold" value="DONE">DONE</option>
                    </select>
                    </div>
                    <div className="flex flex-col">
                    <label className="text-base font-semibold text-slate-600 ">Due Date</label>
                    <input onChange={(e)=>{
                        setDue_date(e.target.value)
                    }} className="border border-slate-400 p-1.5 rounded-sm text-black font-bold my-2 focus:outline-none" type="date" placeholder="Enter task title" defaultValue={defaultDate.toISOString().split("T")[0]}/>
                    </div>
                    <div className="flex flex-col">
                    <label className="text-base font-semibold text-slate-600 ">Priority</label>
                    <select onChange={(e)=>{
                        setPriority(e.target.value)
                    }} className="border border-slate-400 font-bold p-1.5 rounded-sm text-black my-2 focus:outline-none" defaultValue={priority}>
                        <option className="text-black font-bold" hidden value="">Select a value</option>
                        <option className="text-black font-bold" value="LOW">LOW</option>
                        <option className="text-black font-bold" value="MEDIUM">MEDIUM</option>
                        <option className="text-black font-bold" value="HIGH">HIGH</option>
                    </select>
                    </div>
                    </div>

                    {/* todo checklist */}
                    <div className="w-full flex flex-col ">
                    <div className="w-full flex justify-between items-end">
                    <div className="w-full flex flex-col">
                    <label className="text-base font-semibold text-slate-600 ">TODO Checklist</label>
                    <input onChange={(e)=>{
                        setTodoist(e.target.value)
                    }} className="border border-slate-400 p-1.5 rounded-sm text-slate-700 my-2 focus:outline-none" type="text"  placeholder="Enter Task" />
                    </div>
                    <button onClick={(item : any)=>{
                        if(todoist == ""){
                           return  toast.error("Please add a todo first", {
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
                                    }
                        
                                    settodo((prev : any)=>[...prev , todoist])
                    }} className="bg-gray-300 cursor-pointer mx-2 mb-2 p-1 h-10 w-20 border border-slate-500 px-3 text-black rounded-xs"> + Add</button>
                    </div>
                    <div>
                        {todo.map((item : string)=>{
                            return <div key={item} className="border flex justify-between border-slate-400  rounded-sm text-slate-700 my-2 focus:outline-none">
                                <div className="p-1.5">
                                    {item}
                                </div>
                                <div className="flex justify-center items-center px-3">
                                <img className="h-5 w-5 cursor-pointer" onClick={()=>{
                                    settodo((prev : any)=>{
                                        return prev.filter((todos:any)=>(todos != item))
                                    })
                                }} src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="" />
                                </div>
                            </div>
                        })}
                        </div>
                    </div>
                    <label className="text-base font-semibold text-slate-600 ">Selected Members</label>
                    <div className="flex justify-between items-start">
                        <div className="w-full">
                        {selectedMembers.map((item:any)=>{
                           return  <div className="border border-slate-400 p-1.5 rounded-sm text-slate-700 my-2 focus:outline-none w-full">
                                    {item.name}
                                 </div>
                        })}
                        </div>
                        <div >
                        <MemberSelectionDialog selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers}/>
                        </div>
                    </div>
                    <button onClick={(e)=>{
                        e.preventDefault()
                        if(selectedMembers.length == 0){
                          return  toast.error("Please select at least one member", {
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
                        }
                        
                        axios.put(`http://localhost:3000/api/v1/project/${projectId}/update`, {
                                title : title , 
                                description : description, 
                                due_date : due_date, 
                                status : status , 
                                priority : priority, 
                                todochecklist : todo , 
                                usersAssigned : selectedMembers
                              } , {
                                headers :{
                                  Authorization : localStorage.getItem('token')
                                }, 
                                params :{
                                  postID : details._id
                                }
                              }).then(()=>{
                                toast.success('Task Updated Successfully', {
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
                            setUpdate('UPDATE')
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
                              
                    }} className="py-1.5 bg-sky-200 border border-blue-700 rounded-lg my-2 font-semibold cursor-pointer text-blue-700">SAVE TASK</button>
                </form>
            </div>
            </div>
           
            </div>
        </div> 
        }         </>
  );
}


