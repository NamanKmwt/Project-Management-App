import { useEffect, useState } from "react"
import Project from "./Project"
import toast from "react-hot-toast";

import axios  from "axios"
import { CardSkeleton } from "../Skeleton";

export default function(){
    const [projects , setProjects] = useState<any>();
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        const token = localStorage.getItem('token')
        axios.get("http://localhost:3000/api/v1/project" ,{
            headers :{
                Authorization : token
            }
        }).then((response)=>{
            setProjects(response.data.Projects)
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
    } , [])

    return (
        <div>
               <div className="w-full flex px-3 font-bold text-3xl">My Projects</div>
                
                  {loading ?<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 auto-rows-[160px]">
                    {Array.from({ length: 6 }).map((_ , id) => {
                       return  <CardSkeleton key={id} />
                    })}
                    </div> : <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-[160px]">
                {projects?.map((item : any)=>{
                  return  <Project id={item._id} key={item._id} title={item.title}/>
                })}
                </div>
        }
                 
        </div>
    )
}