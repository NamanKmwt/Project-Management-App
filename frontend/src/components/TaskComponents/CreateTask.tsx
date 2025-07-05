import { Textarea } from "@headlessui/react"
import { useState } from "react";
import MemberSelectionDialog from "./MemberSelection";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelectedStoreTask } from "../../context/Store";


export default function (){
    const projectId = localStorage.getItem('projectId')
    const [todo , settodo] = useState<any>([]);
    const [todoist , setTodoist] = useState('');
    const setSelectedTask = useSelectedStoreTask((state:any)=>(state.setSelectedTask))
    const [selectedMembers, setSelectedMembers] = useState<{id: string, name: string}[]>([]);
   
    const [title , settitle] = useState<string>();
    const [description , setDescription] = useState<string>();
    const [due_date , setDue_date] = useState<string>();
    const [status , setStatus] = useState<string>();
    const [priority , setPriority] = useState<string>();
    

    return (
        <div className="w-full ml-2 my-4 pr-20 grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <div className="w-full bg-gradient-to-br from-blue-50 to-white col-span-3 rounded-2xl border-slate-400 border pt-2 bg-white">
            <div className="w-full flex px-3 font-bold text-3xl">Create Task</div>
            <div className="p-5">
                <form onSubmit={(e)=>{
                    e.preventDefault()
                }} className="flex flex-col">
                    <label className="text-base font-semibold text-slate-600 ">Task title</label>
                    <input onChange={(e)=>{
                        settitle(e.target.value)
                    }} name="task title" className="border border-slate-400 p-1.5 rounded-sm text-slate-500 my-2 focus:outline-none" type="text" placeholder="Enter task title" />
                    <label className="text-base font-semibold text-slate-600 ">Description</label>
                    <Textarea onChange={(e)=>{
                        setDescription(e.target.value)
                    }} className="border border-slate-400 p-1.5 rounded-sm text-slate-500 my-2 focus:outline-none h-auto"  placeholder="Describe Task" />

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 ">
                    <div className="flex flex-col">
                    <label className="text-base font-semibold text-slate-600 ">Status</label>
                    <select onChange={(e)=>{
                        setStatus(e.target.value)
                    }} className="border border-slate-400 font-bold p-1.5  rounded-sm text-black my-2 focus:outline-none"  >
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
                    }} className="border border-slate-400 p-1.5 rounded-sm text-black font-bold my-2 focus:outline-none" type="date" placeholder="Enter task title" />
                    </div>
                    <div className="flex flex-col">
                    <label className="text-base font-semibold text-slate-600 ">Priority</label>
                    <select onChange={(e)=>{
                        setPriority(e.target.value)
                    }} className="border border-slate-400 font-bold p-1.5 rounded-sm text-black my-2 focus:outline-none">
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
                            toast.error("Please select at least one member", {
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

                        axios.post(`http://localhost:3000/api/v1/project/${projectId}/create`, {
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
                            }
                        }).then(()=>{
                            toast.success('Task Created Successfully', {
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
                            setSelectedTask('Dashboard')

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

                    }} className="py-1.5 bg-sky-200 border border-blue-700 rounded-lg my-2 font-semibold cursor-pointer text-blue-700">CREATE TASK</button>
                </form>
            </div>
            </div>
           
        </div>
    )
}