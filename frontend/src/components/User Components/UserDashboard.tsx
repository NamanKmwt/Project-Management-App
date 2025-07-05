import UserTaskCard from "./UserTaskCard";
import { useEffect , useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CardSkeleton } from "../Skeleton";


export default function(){
    const [tasks , setTasks] = useState<any>();
    const [loading , setLoading] = useState(true)

    useEffect(()=>{
        const token = localStorage.getItem('token')
        axios.get("http://localhost:3000/api/v1/user/" ,{
            headers :{
                Authorization : token
            }
        }).then((response)=>{
            setTasks(response.data.tasks)
            setLoading(false);
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
    
    
    return (<>
        {loading ?<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 auto-rows-[160px]">
            {Array.from({ length: 6 }).map((_ , id) => {
                return  <CardSkeleton key={id} />
            })}
            </div> :
        <div>
               <div className="w-full flex px-3 m-3 font-bold text-3xl">My Tasks</div>
                <div className="grid gap-2 mx-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-[180px]">
                    {
                        tasks?.map((item:any)=>{
                           return  <UserTaskCard key={item._id} details={item}/>
                        })
                    }
                 
                </div>
        </div> }
    </>
    )
}