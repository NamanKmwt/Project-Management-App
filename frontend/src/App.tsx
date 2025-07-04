import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home" 
import ProjectDashboard from "./pages/admin/ProjectDashboard"
import TaskDashboard from "./pages/admin/TaskDashboard"
import UserTaskDashboard from "./pages/user/UserTaskDashboard"
import { Toaster } from "react-hot-toast"
import Task from "./components/TaskComponents/Task"

function App() {
  

  return (
    <>
    <div className="bg-gray-100">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin/projects" element={<ProjectDashboard/>}/>
        <Route path="/admin/projects/task" element={<TaskDashboard/>}/>
        <Route path="/user/projects" element={<UserTaskDashboard/>}/>
        <Route path="/admin/projects/task/:id" element={<Task/>}/>
      </Routes>
      <Toaster/>
      </BrowserRouter>
    </div>
    </>
    
  )
}

export default App
