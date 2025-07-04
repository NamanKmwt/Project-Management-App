import  { useState, type Dispatch, type SetStateAction } from "react"
import SignUpUser from "../components/Auth Components/SignUpUser"
import SignInUser from "../components/Auth Components/SignInUser"
import SignInAdmin from "../components/Auth Components/SignInAdmin"


type myComponentProps = {
    setComp : Dispatch<SetStateAction<string>>
}
export default function(){
    const [comp , setComp] = useState<string>('Default')

    const ScreenComp = ({setComp}: myComponentProps)=>{
        switch(comp){
            case 'Default' : return <DefaultHome setComp = {setComp} />
            case 'SignUpUser' : return <SignUpUser setComp={setComp} />
            case 'SignInUser' : return <SignInUser setComp={setComp} />
            case 'SignInAdmin' : return <SignInAdmin setComp={setComp} />
        }
    }

    return (
        <div className="grid md:grid-cols-2 w-full grid-cols-1 ">
            <div className="flex flex-col px-10 py-2 justify-center items-center">
                {ScreenComp({setComp})}
            </div>
            <div className="flex h-cover" >
                <img className="h-screen w-full" src="https://images.unsplash.com/photo-1547731030-cd126f44e9c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbXB1dGVyfGVufDB8MnwwfHx8MA%3D%3D" alt="" />
            </div>
        </div>
    )
}


const  DefaultHome = ({setComp} :myComponentProps )=>{  
    return <>
        <div className="flex flex-col">
                <div className="text-5xl my-4 font-bold text-blue-950">Capture, organize, and tackle your to-dos from anywhere.</div>
                <div className="text-3xl lg:inline md:hidden text-[#000036]">Escape the clutter and chaos—unleash your productivity with TaskS</div>
                </div>
                <div className="mt-10">
                    <button className="m-2 cursor-pointer border border-blue-950 bg-blue-500 text-lg rounded-full text-white px-13.5 font-medium p-4"> Get Started</button>
                    <button className="m-2 lg:inline md:hidden cursor-pointer border border-blue-950 bg-white text-lg rounded-full text-blue-500 px-1.5 font-medium p-4"> Know more about TaskS</button>
                </div>
                <div className="flex justify-center w-full mt-8">
                    <button onClick={()=>{
                        setComp('SignInUser')
                    }}  className="m-2 cursor-pointer border border-blue-950 bg-blue-500 rounded-full text-white px-18.5 font-medium p-1.5"> Sign in </button>
                </div>
    </>
}
