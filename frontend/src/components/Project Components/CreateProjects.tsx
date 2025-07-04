import { Textarea } from "@headlessui/react"
import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useSelectedStore } from "../../context/Store";


export default function (){
    const [title , settitle] = useState<string>();
    const [description , setDescription] = useState<string>();
    const setSelected = useSelectedStore((state:any)=>(state.setSelected))


    return (
        <div className="w-full ml-2  my-4 pr-20 grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <div className="w-full col-span-3 bg-gradient-to-br from-blue-50 to-white rounded-2xl border-slate-400 border pt-2 bg-white">
            <div className="w-full flex px-3 font-bold text-3xl">Create Project</div>
            <div className="p-5">
                <form onSubmit={(e)=>{
                    e.preventDefault()
                }} className="flex flex-col">
                    <label className="text-base font-semibold text-slate-600 ">Project title</label>
                    <input onChange={(e)=>{
                        settitle(e.target.value)
                    }} className="border border-slate-400 p-1.5 rounded-sm text-slate-500 my-2 focus:outline-none" type="text" placeholder="Enter project title" />
                    <label className="text-base font-semibold text-slate-600 ">Description</label>
                    <Textarea onChange={(e)=>{
                        setDescription(e.target.value);
                    }} className="border border-slate-400 p-1.5 rounded-sm text-slate-500 my-2 focus:outline-none "  placeholder="Describe Project" />
                    <button onClick={(e)=>{
                e.preventDefault();
                const token = localStorage.getItem('token')
                axios.post('http://localhost:3000/api/v1/project/create' , {
                    title : title , 
                    description : description
                }, {
                    headers :{
                        Authorization :token 
                    }
                }
            ).then(()=>{
                    toast.success('Project Created Successfully', {
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
                    setSelected('Dashboard')
                    
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
            }} className="py-1.5 bg-sky-200 border border-blue-700 rounded-lg my-2 font-semibold cursor-pointer text-blue-700">CREATE PROJECT</button>
                </form>
            </div>
            </div>
           
        </div>
    )
}