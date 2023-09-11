// Import required libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const cors = require('cors');
// Create an instance of Express
const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB (you should replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect(process.env.VITE_APP_MONGODB)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));
  
// Define Mongoose schema and model for tasks
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

const Task = mongoose.model('Task', taskSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// CORS middleware (you should configure this based on your requirements)
// app.use(cors({
//   origin: 'https://localhost:3000',
// }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API Endpoints

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = new Task({ title, description, status });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing task
app.put('/api/tasks1/:id', async (req, res) => {
  const taskId = req.params.id;
    const { title,description,status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route to handle PUT requests for updating task status
app.put('/api/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  const { status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndRemove(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(deletedTask);
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Task.deleteMany({ }).then((result) => {
//   console.log(result);
// });

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });