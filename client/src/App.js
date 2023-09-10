import './App.css'
import { useState } from 'react';
import TaskList from './components/TaskList'
import TaskDashboard from './components/TaskDashboard'

function App() {
  const [data, setData] = useState([]);
  const [tasks,setTasks]=useState([])
  return (
    <div style={{display:"flex",gap:"1rem",backgroundColor:"#f1f0f7",padding:"1rem",backgroundColor:"#f2f6fe"}}>
      <TaskList setData={setData} data={data} setTasks={setTasks} tasks={tasks}/>
      <TaskDashboard data={data} tasks={tasks}/>
    </div> 
  )
}

export default App
