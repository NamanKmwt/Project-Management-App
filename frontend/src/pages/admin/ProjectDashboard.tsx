
import { AdminSideBar } from "../../components/Project Components/AdminSideBar"
import AdminDashboard from "../../components/Project Components/AdminDashboard"
import { useSelectedStore } from "../../context/Store"
import AdminTeamMembers from "../../components/Project Components/AdminTeamMembers"
import CreateProjects from "../../components/Project Components/CreateProjects"
import ProjectDialogBox from "../../components/Project Components/ProjectDialogBox"
import { useLocation } from "react-router"



export default function(){
    const selected = useSelectedStore((state:any)=>(state.selected))
    
    const show = ()=>{
        switch(selected){
            case 'Dashboard' : return <AdminDashboard/>
            case 'Create Projects' : return <CreateProjects/>
            case 'Team members': return <AdminTeamMembers/>
            case 'Log Out' : return <ProjectDialogBox/>
        }
    }
    return (
            <div className="w-screen overflow-x-hidden   h-screen box-border grid lg:grid-cols-[.6fr_1fr_1fr_1fr] md:grid-cols-[.5fr_1fr_1fr] grid-cols-[.5fr_1fr] ">
                {/* make this responsive */}
                <div className="col-span-1 sm:block hidden ">
                <AdminSideBar />
                </div>
                <div className="lg:col-span-3 md:col-span-2 sm:col-span-1 col-span-2    ">
                    {show()}
                </div>
            </div>
    )
}


