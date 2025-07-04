import UserCard from "../Project Components/UserCard";
import { useEffect  , useState} from "react";

import { CardSkeleton } from "../Skeleton";
import { useMemberStore } from "./TaskStore";

export default function(){
    const [loading , setLoading] = useState(true);
    const membersArray = useMemberStore((state:any)=>state.membersArray)
    
    useEffect(()=>{
        if(membersArray.length >= 0){
            setLoading(false);
        }
    } , [])

    return (
        <div>
            {loading ? <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 auto-rows-[160px]">
            {Array.from({ length: 6 }).map(() => {
                return  <CardSkeleton />
            })}
            </div>  : <>
            <div className="w-full flex px-3 font-bold text-3xl">Team Members</div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-[160px]">
                    {
                        membersArray.map((item: any)=>{
                            return <UserCard name={item.name} email={item.email}/>
                        })
                    }
            </div>
            </>
         }
        </div>
    )
}