import { useState } from "react"
import { useSelectedStoreTask } from "../../context/Store"
import { AdminSideBarTask } from "../../components/TaskComponents/AdminSideBarTask"
import TaskDialogBox from "../../components/TaskComponents/TaskDialogBox"
import AdminTeamMembersTask from "../../components/TaskComponents/AdminTeamMembersTask"
import AdminDashboardTask from "../../components/TaskComponents/AdminDashboardTask"
import CreateTask from "../../components/TaskComponents/CreateTask"




export default function(){
    const selectedTask = useSelectedStoreTask((state:any)=>(state.selectedTask))

    const show = ()=>{
        switch(selectedTask){
            case 'Dashboard' : return <AdminDashboardTask/>
            case 'Create Tasks' : return <CreateTask/>
            case 'Team members': return <AdminTeamMembersTask/>
            case 'Log Out' : return <TaskDialogBox/>
            
        }
    }
    return (
            <div className="w-screen overflow-x-hidden   h-screen box-border grid lg:grid-cols-[.6fr_1fr_1fr_1fr] md:grid-cols-[.5fr_1fr_1fr] grid-cols-[.5fr_1fr]">
                {/* make this responsive */}
                <div className="col-span-1 sm:block hidden ">
                <AdminSideBarTask/>
                </div>
                <div className="lg:col-span-3 md:col-span-2 sm:col-span-1 col-span-2    ">
                    {show()}
                </div>
            </div>
    )
}


