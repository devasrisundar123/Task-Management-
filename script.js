async function registerUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    const response = await fetch(
        "http://localhost:3000/register",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.text();

    alert(data);
}
async function loginUser() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch(
  
  
        "http://localhost:3000/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.text();

    if(data === "Invalid Login") {
        alert(data);
    }
    else {
        localStorage.setItem("user", data);
        window.location.href = "dashboard.html";
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
async function addTask() {

    const title =
        document.getElementById("title").value;

    const description =
        document.getElementById("description").value;

    const response = await fetch(
        "http://localhost:3000/tasks",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description
            })
        }
    );

    const data = await response.text();
    alert(data);
    loadTasks();
}

async function loadTasks() {
    const response =
        await fetch("http://localhost:3000/tasks");

    const tasks =
        await response.json();
    let output = "";
    tasks.forEach(task => {
        output += `
<div class="task-card">

    <h3>${task.title}</h3>

    <p>${task.description}</p>
<button onclick="editTask(${task.id},
'${task.title}',
'${task.description}')">
    Edit
</button>

<button
    class="delete-btn"
    onclick="deleteTask(${task.id})">
    Delete
</button>

</div>
`;
    });
    document.getElementById("taskList")
        .innerHTML = output;
}


async function deleteTask(id) {

    await fetch(
        `http://localhost:3000/tasks/${id}`,
        {
            method: "DELETE"
        }
    );

    loadTasks();
}

function editTask(id, title, description){

    document.getElementById("title").value =
        title;

    document.getElementById("description").value =
        description;

    document.getElementById("addBtn")
        .innerText = "Update Task";

    document.getElementById("addBtn")
        .onclick = function(){

        updateTask(id);
    };
}

async function updateTask(id){

    const title =
        document.getElementById("title").value;

    const description =
        document.getElementById("description").value;

    const response =
        await fetch(
        `http://localhost:3000/tasks/${id}`,
        {
            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                title,
                description
            })
        });

    const data =
        await response.text();

    alert(data);

    document.getElementById("addBtn")
        .innerText = "Add Task";

    document.getElementById("addBtn")
        .onclick = addTask;

    loadTasks();
}