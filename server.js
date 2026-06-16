const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "   ",
    database: "taskmanager"
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database Connected");
    }
});

// Register
app.post("/register", (req, res) => {

    const { email, password } = req.body;

    db.query(
        "INSERT INTO users(email,password) VALUES (?,?)",
        [email, password],
        (err) => {

            if (err) {
                return res.send("Registration Failed");
            }

            res.send("Registration Successful");
        }
    );
});

// Login
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=? AND password=?",
        [email, password],
        (err, result) => {

            if (result.length > 0) {
                res.send("Login Success");
            } else {
                res.send("Invalid Login");
            }

        }
    );
});

// Add Task
app.post("/tasks", (req, res) => {

    const { title, description } = req.body;

    db.query(
        "INSERT INTO tasks(title,description) VALUES (?,?)",
        [title, description],
        (err) => {

            if (err) {
                return res.send("Task Not Added");
            }

            res.send("Task Added");
        }
    );
});

// Get Tasks
app.get("/tasks", (req, res) => {

    db.query(
        "SELECT * FROM tasks",
        (err, result) => {

            if (err) {
                return res.json([]);
            }

            res.json(result);
        }
    );
});

// Delete Task
app.delete("/tasks/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM tasks WHERE id=?",
        [id],
        (err) => {

            if (err) {
                return res.send("Delete Failed");
            }

            res.send("Deleted");
        }
    );
});

app.put("/tasks/:id", (req, res) => {

    const id = req.params.id;

    const { title, description } = req.body;

    db.query(
        "UPDATE tasks SET title=?, description=? WHERE id=?",
        [title, description, id],
        (err) => {

            if(err){
                return res.send("Update Failed");
            }

            res.send("Task Updated");
        }
    );
});

app.listen(3000, () => {
    console.log("Server Running On Port 3000");
});
