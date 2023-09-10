import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Chip } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TaskList = ({ setData, data, tasks, setTasks }) => {
  const [todoArr, setTodoArr] = useState([]);
  const [doingArr, setDoingArr] = useState([]);
  const [doneArr, setDoneArr] = useState([]);
  const [task, setTask] = useState({
    _id: "",
    title: "",
    description: "",
    status: "todo",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEditId, setShowEditId] = useState("");
  const [editTask, setEditTask] = useState({
    _id: "",
    title: "",
    description: "",
    status: "todo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to create a new task
    axios
      .post("http://localhost:3001/api/tasks", task)
      .then((response) => {
        // Handle success, e.g., clear the form or update the task list
        fetchTasks();
        setShowAddModal(false);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    // Send a PUT request to update the task
    axios
      .put(`http://localhost:3001/api/tasks/${showEditId}`, editTask)
      .then((response) => {
        // Handle success, e.g., close the form or update the task list
        fetchTasks();
        setShowEdit(false);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };
  const handleClick = (task) => {
    setShowEdit(true);
    setEditTask(task);
    setShowEditId(task._id);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(destination, source, draggableId);
    if (source.droppableId == destination.droppableId) return;

    if (source.droppableId == 1) {
      setTodoArr(removeItemById(draggableId, todoArr));
    } else if (source.droppableId == 2) {
      setDoingArr(removeItemById(draggableId, doingArr));
    } else {
      setDoneArr(removeItemById(draggableId, doneArr));
    }

    const task = findItemById(draggableId, tasks);
    if (destination.droppableId == 1) {
      setTodoArr([{ ...task, status: "todo" }, ...todoArr]);
    } else if (destination.droppableId == 2) {
      setDoingArr([{ ...task, status: "doing" }, ...doingArr]);
    } else {
      setDoneArr([{ ...task, status: "done" }, ...doneArr]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item._id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item._id != id);
  }

  // Fetch tasks from the API
  const fetchTasks = () => {
    axios
      .get("http://localhost:3001/api/tasks")
      .then((response) => {
        setTasks(response.data);
        let todo = response.data?.filter((person) => person?.status == "todo");
        setTodoArr(todo);
        let doing = response.data?.filter(
          (person) => person?.status == "doing"
        );
        setDoingArr(doing);
        let done = response.data?.filter((person) => person?.status == "done");
        setDoneArr(done);
        setData([
          {
            id: "1",
            title: " 📃 To do",
            tasks: todoArr,
          },
          {
            id: "2",
            title: " 📃 Doing",
            tasks: doingArr,
          },
          {
            id: "3",
            title: " 📃 Done",
            tasks: doneArr,
          },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setData([
      {
        id: "1",
        title: " 📃 To do",
        tasks: todoArr,
      },
      {
        id: "2",
        title: " 📃 Doing",
        tasks: doingArr,
      },
      {
        id: "3",
        title: " 📃 Done",
        tasks: doneArr,
      },
    ]);
    console.log(todoArr, doingArr, doneArr);
  }, [todoArr, doingArr, doneArr]);

  return (
    <div className="task-list" style={{ flex: "9" }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3>Projects</h3>
      <Button
        variant="contained"
        onClick={() => setShowAddModal(true)}
        sx={{ borderRadius: "50px", backgroundColor: "#754be5" }}
      >
        Create task
      </Button>
      </div>
     
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Add new task</h2>
          <form className="add-task-form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              sx={{ mt: "1rem", textTransform: "capitalize" }}
              type="text"
              placeholder="Task Title"
              value={task?.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
            <TextField
              id="outlined-multiline-static"
              label="Task Description"
              multiline
              rows={4}
              fullWidth
              sx={{ mt: "1rem", textTransform: "capitalize" }}
              placeholder="Task Description"
              value={task?.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
            <div>
              <FormControl sx={{ mt: "1rem" }} fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={task?.status}
                  label="Status"
                  onChange={(e) => setTask({ ...task, status: e.target.value })}
                >
                  <MenuItem value="todo">Todo</MenuItem>
                  <MenuItem value="doing">Doing</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Button sx={{ mt: "1rem" }} variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={showEdit}
        onClose={() => setShowEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Edit the task</h2>
          <form className="add-task-form" onSubmit={handleSubmit2}>
            <TextField
              fullWidth
              sx={{ mt: "1rem", textTransform: "capitalize" }}
              type="text"
              placeholder="Task Title"
              value={editTask?.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />
            <TextField
              id="outlined-multiline-static"
              label="Task Description"
              multiline
              rows={4}
              fullWidth
              sx={{ mt: "1rem", textTransform: "capitalize" }}
              placeholder="Task Description"
              value={editTask?.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
            />
            <div>
              <FormControl sx={{ mt: "1rem" }} fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editTask?.status}
                  label="Status"
                  onChange={(e) =>
                    setEditTask({ ...editTask, status: e.target.value })
                  }
                >
                  <MenuItem value="todo">Todo</MenuItem>
                  <MenuItem value="doing">Doing</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Button sx={{ mt: "1rem" }} variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1.5rem",
            paddingInline: "1rem",
            paddingBlock: "1rem",
            backgroundColor: "#ffffff",
          }}
        >
          {data.map((column) => {
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
                  <strong style={{color:"#6f6a75"}}>{column.title}</strong>
                  <IconButton aria-label="delete">
                    <AddIcon onClick={() => setShowAddModal(true)} />
                  </IconButton>
                </div>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      className="task-list"
                      style={{
                        // backgroundColor: "#f5f5f8",
                        flex: "1",
                        minHeight: "73vh",
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "scroll",
                        padding: "1rem",
                      }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="task-card"
                            >
                              {/* {task.title} */}

                              <Card fullWidth sx={{ cursor: "pointer" }}>
                                <CardContent>
                                <Chip label={task?.title} sx={{textTransform:"capitalize",fontWeight:"600",backgroundColor:task.status==="todo"?"#ecf2ff":task.status==="doing"?"#ffefe1":"#f1ecff",color:task.status==="todo"?"#a58aef":task.status==="doing"?"#ee7714":"#a58aef"}}  />
                                  <Typography variant="body2" sx={{marginTop:"0.5rem",color:"#bcbbbf",textTransform:"capitalize"}}>
                                    {task.description}
                                  </Typography>
                                </CardContent>

                                <CardActions sx={{ display: "block" }}>
                                  <Button
                                    size="small"
                                    onClick={() => handleClick(task)}
                                  >
                                    Edit task
                                  </Button>
                                </CardActions>
                              </Card>

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
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
