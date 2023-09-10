import { Card,CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import DonutChart from "react-donut-chart";
import Typography from "@mui/material/Typography";

const TaskDashboard = ({data,tasks}) => {
const[total,setTotal]=useState();
const [completed,setCompleted]=useState("")
const [inprogress,setInProgress]=useState("")
const [started,setStarted]=useState("")
const [percentage,setPercentage]=useState("")
useEffect(()=>{
setCompleted(data[0]?.tasks?.length);
setInProgress(data[1]?.tasks?.length);
setStarted(data[2]?.tasks?.length);
setTotal(tasks?.length);
setPercentage((data[0]?.tasks?.length/tasks?.length)*100);
},[])

  return (
    <div style={{ flex: "1.5",paddingBlock:"1.5rem",gap:"1.5rem",paddingInline:"1rem",display:"flex",flexDirection:"column",backgroundColor:"#ffffff",marginBlock:"4rem",height:"auto" }}>
     <Card>
     <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
       Total : <strong>{percentage}</strong> 
      </Typography>
      </CardContent>
     </Card>
     <Card>
     <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
       Completed : <strong>{completed}</strong> 
      </Typography>
      </CardContent>
     </Card>
     <Card>
     <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
       In progress : <strong>{inprogress}</strong> 
      </Typography>
      </CardContent>
     </Card>
     <Card>
     <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
       Waiting : <strong>{started}</strong>
      </Typography>
      </CardContent>
     </Card>
      
    </div>
  );
};

export default TaskDashboard;
