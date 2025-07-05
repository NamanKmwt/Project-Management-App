import UserCard from "./UserCard";
import { useState , useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CardSkeleton } from "../Skeleton";
import { useAllMemberStore } from "../TaskComponents/TaskStore";

export default function(){
    const AllmembersArray = useAllMemberStore((state:any)=> state.AllmembersArray)
    const [loading , setLoading] = useState(true);


    useEffect(()=>{
        if(AllmembersArray.length > 0){
            setLoading(false)
        }
    })

    return (
        <div>
            <div className="w-full flex px-3 font-bold text-3xl">Members</div>
            {loading ?<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 auto-rows-[160px]">
                {Array.from({ length: 6 }).map((_ , id) => {
                    return  <CardSkeleton key={id} />
                })}
                </div> : <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-[160px]">
            {AllmembersArray?.map((item : any)=>{
                return  <UserCard key={item._id} name={item.name} email={item.email}/>
            })}
            </div>
                }
                      
        </div>
    )
}