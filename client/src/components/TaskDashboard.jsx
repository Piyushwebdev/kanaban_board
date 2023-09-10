import { Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import DonutChart from "react-donut-chart";
import Typography from "@mui/material/Typography";

const TaskDashboard = ({ data, tasks }) => {
  const [total, setTotal] = useState();
  const [completed, setCompleted] = useState("");
  const [inprogress, setInProgress] = useState("");
  const [started, setStarted] = useState("");
  const [percentage, setPercentage] = useState("");
  useEffect(() => {
    setCompleted(data[0]?.tasks?.length);
    setInProgress(data[1]?.tasks?.length);
    setStarted(data[2]?.tasks?.length);
    setTotal(tasks?.length);
    setPercentage(Math.round((data[0]?.tasks?.length / tasks?.length) * 100));
  }, []);

  return (
    <div
      style={{
        flex: "1.5",
        paddingBlock: "1.5rem",
        gap: "1.5rem",
        paddingInline: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        marginBlock: "4rem",
        height: "auto",
      }}
    >
      <Card sx={{ backgroundColor: "#ecf2ff" }}>
        <CardContent>
          <Typography sx={{ fontSize: 20, color: "#8763e9" }} gutterBottom>
            Percentage :{" "}
            <strong style={{ color: "#2e2932" }}>{percentage}</strong>
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          backgroundColor: "#ffefe1",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: 20,
              color: "#f5a661",
              display: "flex",
              alignItems: "center",
            }}
            gutterBottom
          >
            Total : <strong style={{ color: "#2e2932" }}>{total}</strong>
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ backgroundColor: "#f5a661" }}>
        <CardContent>
          <Typography sx={{ fontSize: 20, color: "#ffffff" }} gutterBottom>
            Completed :{" "}
            <strong style={{ color: "#2e2932" }}>{completed}</strong>
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          backgroundColor: "#ffefe1",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: 20,
              color: "#f5a661",
              display: "flex",
              alignItems: "center",
            }}
            gutterBottom
          >
            In progress :{" "}
            <strong style={{ color: "#2e2932" }}>{inprogress}</strong>
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ backgroundColor: "#ecf2ff" }}>
        <CardContent>
          <Typography sx={{ fontSize: 20, color: "#8763e9" }} gutterBottom>
            Waiting : <strong style={{ color: "#2e2932" }}>{started}</strong>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDashboard;
