
import {useUserSelectedStore } from "../../context/Store"


export const UserSideBar = ()=>{
    const userSelected = useUserSelectedStore((state:any)=>(state.userSelected))
    const setUserSelected = useUserSelectedStore((state:any)=>(state.setUserSelected))
  
  
    return (
        <div className=" bg-white bg-gradient-to-br from-blue-50 to-white  pt-5 h-full border border-slate-300 w-60 flex flex-col items-center ">
            <div className="flex  flex-col items-center px-10">
            <div className="rounded-full flex justify-center my-2 items-center bg-gray-400  w-16 h-16 border ">
                H
            </div>
            <div className=" bg-blue-700 text-[11px] px-3 font-semibold text-white p-0.5 rounded-sm ">
                Admin
            </div>
            <div className="mt-2 font-semibold  text-base">
                Mike
            </div>
            <div className="text-slate-700 ">
                mike@google.com
            </div>
            </div>

            <div  className="flex flex-col my-4 w-full items-start">
               
                <div onClick={()=>{
                    setUserSelected('Dashboard')
                }} className = "flex w-full p-2 my-2 gap-2  font-semibold text-lg cursor-pointer " style={userSelected === 'Dashboard'? {borderRightWidth : '2px' , borderRightColor:'#172554', backgroundColor: '#dbeafe' , color: '#1e40af' } : undefined} > <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"  fill={userSelected === 'Dashboard' ? '#1e40af' : '#000000'}><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
                Dashboard</div>
                <div onClick={()=>{
                    setUserSelected('Log Out')
                }} className = "flex w-full p-2 gap-2 my-2 font-semibold text-lg cursor-pointer " style={userSelected === 'Log Out'? {borderRightWidth : '2px' , borderRightColor:'#172554', backgroundColor: '#dbeafe' , color: '#1e40af' } : undefined}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={userSelected === 'Log Out' ? '#1e40af' : '#000000'}><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                    Log Out</div>
            </div>

        </div>
    )
}


