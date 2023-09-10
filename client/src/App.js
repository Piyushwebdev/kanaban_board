import './App.css'
import TaskList from './components/TaskList'
import TaskDashboard from './components/TaskDashboard'

function App() {
  return (
    <div style={{display:"flex",gap:"1rem",backgroundColor:"#f1f0f7",padding:"1rem"}}>
      <TaskList/>
      <TaskDashboard/>
    </div> 
  )
}

export default App
