import React from "react";
import { Draggable } from "react-drag-and-drop";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const TaskCard = ({ task, setShowEdit, setShowEditId, setEditTask, index }) => {
  const handleClick = (task) => {
    setShowEdit(true);
    setEditTask(task);
    setShowEditId(task._id);
  };
  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="task-card"
        >
          {task.title}
          {/* <Card fullWidth sx={{ cursor: "pointer" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {task.title}
              </Typography>
              <Typography variant="body2">{task.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleClick(task)}>
                Edit task
              </Button>
            </CardActions>
          </Card> */}
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
