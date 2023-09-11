import { Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import DonutChart from "react-donut-chart";
import Typography from "@mui/material/Typography";

const TaskDashboard = ({ data, tasks }) => {
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [inprogress, setInProgress] = useState(0);
  const [started, setStarted] = useState(0);
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    setCompleted(data[2]?.tasks?.length);
    setInProgress(data[1]?.tasks?.length);
    setStarted(data[0]?.tasks?.length);
    setTotal(tasks?.length);
    setPercentage(Math.round((data[2]?.tasks?.length / tasks?.length) * 100));
  }, [data, tasks]);

  return (
    <div
      style={{
        flex: "1.5",
        paddingBlock: "3rem",
        gap: "1.5rem",
        paddingInline: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        marginBlock: "4.5rem",
        height: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#ecf2ff",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          paddingBlock: "1.3rem",
          paddingInline: "1rem",
        }}
      >
        <Typography sx={{ fontSize: 20, color: "#8763e9" }} gutterBottom>
          Percentage :{" "}
          <strong style={{ color: "#2e2932" }}>{percentage}</strong>
        </Typography>
      </div>
      <div
        style={{
          backgroundColor: "#FFEFE1",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          paddingBlock: "1.3rem",
          paddingInline: "1rem",
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            color: "#f5a661",
            display: "flex",
            alignItems: "center",
          }}
          gutterBottom
        >
          Total :<strong style={{ color: "#2e2932" }}> {total}</strong>
        </Typography>
      </div>
      <div
        style={{
          backgroundColor: "#ecf2ff",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          paddingBlock: "1.3rem",
          paddingInline: "1rem",
        }}
      >
        <Typography sx={{ fontSize: 20, color: "#8763e9" }} gutterBottom>
          Completed : <strong style={{ color: "#2e2932" }}>{completed}</strong>
        </Typography>
      </div>
      <div
        style={{
          backgroundColor: "#FFEFE1",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          paddingBlock: "1.3rem",
          paddingInline: "1rem",
        }}
      >
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
          <strong style={{ color: "#2e2932" }}> {inprogress}</strong>
        </Typography>
      </div>
      <div
        style={{
          backgroundColor: "#ecf2ff",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          paddingBlock: "1.3rem",
          paddingInline: "1rem",
        }}
      >
        <Typography sx={{ fontSize: 20, color: "#8763e9" }} gutterBottom>
          Waiting : <strong style={{ color: "#2e2932" }}>{started}</strong>
        </Typography>
      </div>
    </div>
  );
};

export default TaskDashboard;
