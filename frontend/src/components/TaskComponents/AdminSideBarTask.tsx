
import { useSelectedStoreTask } from "../../context/Store"


export const AdminSideBarTask = ()=>{
    const selectedTask = useSelectedStoreTask((state:any)=>(state.selectedTask))
    const setSelectedTask = useSelectedStoreTask((state:any)=>(state.setSelectedTask))
    const name = localStorage.getItem('name')
    const email = localStorage.getItem('email')

    return (
        <div className=" bg-white bg-gradient-to-br from-blue-50 to-white  pt-5 h-full border border-slate-300 w-60 flex flex-col items-center ">
            <div className="flex  flex-col items-center px-10">
            <div className="rounded-full flex justify-center my-2 items-center bg-gray-400  w-16 h-16 border ">
                {name? name[0].toUpperCase() : "" }
            </div>
            <div className=" bg-blue-700 text-[11px] px-3 font-semibold text-white p-0.5 rounded-sm ">
                Admin
            </div>
            <div className="mt-2 font-semibold  text-base">
                {name}
            </div>
            <div className="text-slate-700 ">
                {email}
            </div>
            </div>

            <div  className="flex flex-col my-4 w-full items-start">
               
                <div onClick={()=>{
                    setSelectedTask('Dashboard')
                }} className = "flex w-full p-2 my-2 gap-2  font-semibold text-lg cursor-pointer " style={selectedTask === 'Dashboard'? {borderRightWidth : '2px' , borderRightColor:'#172554', backgroundColor: '#dbeafe' , color: '#1e40af' } : undefined} > <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"  fill={selectedTask === 'Dashboard' ? '#1e40af' : '#000000'}><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
                Dashboard</div>
                <div onClick={()=>{
                    setSelectedTask('Create Tasks')
                }} className = "flex w-full p-2 my-2 gap-2 font-semibold text-lg cursor-pointer " style={selectedTask === 'Create Tasks'? {borderRightWidth : '2px' , borderRightColor:'#172554', backgroundColor: '#dbeafe' , color: '#1e40af' } : undefined}>   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={selectedTask === 'Create Tasks' ? '#1e40af' : '#000000'}><path d="M200-200v-560 454-85 191Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v320h-80v-320H200v560h280v80H200Zm494 40L552-222l57-56 85 85 170-170 56 57L694-80ZM320-440q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 160h240v-80H440v80Zm0-160h240v-80H440v80Z"/></svg>
                    Create Tasks</div>
                <div onClick={()=>{
                    setSelectedTask('Team members')
                }} className = "flex w-full p-2 gap-2 my-2 font-semibold text-lg cursor-pointer  " style={selectedTask === 'Team members'? {borderRightWidth : '2px' , borderRightColor:'#172554', backgroundColor: '#dbeafe' , color: '#1e40af' } : undefined}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={selectedTask === 'Team members' ? '#1e40af' : '#000000'}><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
                    Team Members</div>
                <div onClick={()=>{
                    setSelectedTask('Log Out')
                }} className = "flex w-full p-2 gap-2 my-2 font-semibold text-lg cursor-pointer " style={selectedTask === 'Log Out'? {borderRightWidth : '2px' , borderRightColor:'#172554', backgroundColor: '#dbeafe' , color: '#1e40af' } : undefined}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={selectedTask === 'Log Out' ? '#1e40af' : '#000000'}><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                    Log Out</div>
            </div>

        </div>
    )
}


