import UserTaskCard from "./UserTaskCard";



export default function(){
    return (
        <div>
               <div className="w-full flex px-3 m-3 font-bold text-3xl">My Tasks</div>
                <div className="grid gap-2 mx-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-[180px]">
                    <UserTaskCard/>
                    <UserTaskCard/>
                    <UserTaskCard/>
                    <UserTaskCard/>
                    <UserTaskCard/>
                    <UserTaskCard/>
                    <UserTaskCard/>
                    <UserTaskCard/>
                    <UserTaskCard/>
                    <UserTaskCard/>
                    <UserTaskCard/>
                 
                </div>
        </div>
    )
}