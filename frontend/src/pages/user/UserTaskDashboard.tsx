import UserDashboard from "../../components/User Components/UserDashboard"
import UserDialogBox from "../../components/User Components/UserDialogBox"
import { UserSideBar } from "../../components/User Components/UserSideBar"
import UserTask from "../../components/User Components/UserTask"
import { useUserSelectedStore } from "../../context/Store"



export default function(){
    const userSelected = useUserSelectedStore((state:any)=>(state.userSelected))

    const show = ()=>{
        switch(userSelected){
            case 'Dashboard' : return <UserDashboard/>
            case 'Log Out': return <UserDialogBox/>
            case 'Task' : return <UserTask/>
        }
    }
    return (
            <div className="w-screen overflow-x-hidden   h-screen box-border grid lg:grid-cols-[.6fr_1fr_1fr_1fr] md:grid-cols-[.5fr_1fr_1fr] grid-cols-[.5fr_1fr] ">
                {/* make this responsive */}
                <div className="col-span-1 sm:block hidden ">
                <UserSideBar/>
                </div>
                <div className="lg:col-span-3 md:col-span-2 sm:col-span-1 col-span-2    ">
                    {show()}
                </div>
            </div>
    )
}


