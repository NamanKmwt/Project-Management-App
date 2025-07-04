import { useState, type Dispatch, type SetStateAction } from "react";
import axios from 'axios'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

type myComponentProps = {
    setComp : Dispatch<SetStateAction<string>>
}


export default function SignUpUser({setComp} : myComponentProps){
    const [email , setEmail] = useState<string>();
    const [name , setName] = useState<string>();
    const [password , setPassword] = useState<string>();
    const navigate = useNavigate()
    return <>
        <div className="border p-4 rounded-2xl  flex flex-col w-full px-20">
            <div className="flex justify-center text-4xl font-bold m-2 mb-4">Create Account</div>
            <input onChange={(e)=>{
                setEmail(e.target.value)
            }} type="email" className="border rounded-sm p-2 my-4 " placeholder="Email"/>
            <input onChange={(e)=>{
                setName(e.target.value)
            }} type="text" className="border rounded-sm p-2 my-4 " placeholder="Name"/>
            <input onChange={(e)=>{
                setPassword(e.target.value)
            }} type="password" className="border rounded-sm p-2 my-4 " placeholder="password" />
            <button onClick={(e)=>{
                e.preventDefault();
                axios.post('http://localhost:3000/api/v1/user/signup' , {
                    name : name , 
                    email : email , 
                    password : password
                }).then((response)=>{
                    toast.success('Signed Up successfully', {
                    position:"top-right",
                    style: {
                        border: "2px solid #3fa53b",
                        borderRadius: "8px",
                        background: "#4BB543",
                        color: "#fff",
                        padding: "16px",
                        boxShadow: "0 0 0 4px rgba(75,181,67,0.3)",
                        
                        transform: "scale(1)",
                        opacity: "1",
                        transition: "all 400ms ease",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#4BB543",
                    },
                    });
                    const token = response.data.token
                    localStorage.setItem('token' , token);
                    navigate('/user/projects')
                    
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
            }} className="bg-blue-500 p-2 text-white text-lg font-medium rounded-full cursor-pointer my-4">Sign Up </button>
            <div className="flex justify-center">Already have an account ? <span className="mx-2 cursor-pointer underline" onClick={()=>{
                setComp('SignInUser')
            }}>Login</span> </div>
            <div className="flex justify-center cursor-pointer underline" onClick={()=>{
                setComp('SignInAdmin')
            }}>
                Login as Admin
            </div>
        </div>
    </>
}