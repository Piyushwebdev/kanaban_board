import React from "react";
import TaskCard from "./TaskCard";
import { Draggable, Droppable } from "react-drag-and-drop";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
const Column = ({ title, tasks, columnId }) => {
  return (
    <div
      className="column"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {" "}
        <strong>{title}</strong>
        <IconButton aria-label="delete">
          <AddIcon />
        </IconButton>
      </div>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="task-list"
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            style={{
              backgroundColor: "lightgrey",
              flex: "1",
              minHeight: "73vh",
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              padding: "1rem",
            }}
          >
            {tasks.map((task, index) => (
              // <TaskCard
              //   key={task?._id}
              //   task={task}
              //   index={index}
              //   columnId={columnId}
              // />
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
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
