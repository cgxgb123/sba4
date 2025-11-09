const taskName = document.getElementById("taskName");
const category = document.getElementById("category");
const deadline = document.getElementById("deadline");
const tStatus = document.getElementById("status");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const rmvTaskBtn = document.getElementById("rmvTask");

const statusStyles = {
  Overdue: { color: "red", fontWeight: "bold" },
  Completed: { color: "Green" },
  "In Progress": { color: "Orange" },
};
//  load tasks from local storage on refresh
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks(filteredTasks = tasks) {
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const row = document.createElement("tr");

    for (const status in statusStyles) {
      if (task.status === status) {
        const styleObj = statusStyles[status];
        for (const prop in styleObj) {
          row.style[prop] = styleObj[prop];
        }
      }
    }
    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.category}</td>
      <td>${task.deadline}</td>
      <td>
        <select data-index="${index}" class="status-dropdown">
          <option value="In Progress" ${
            task.status === "In Progress" ? "selected" : ""
          }>In Progress</option>
          <option value="Completed" ${
            task.status === "Completed" ? "selected" : ""
          }>Completed</option>
        </select>
      </td>
    `;

    taskList.appendChild(row);
  });
  // saves new state of list
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* 
Testing tasks, browser storage, and pushing to array
tasks.push({
  name: "nameTest",
  category: "categoryTest",
  status: "statusTest",
  deadline: "2025",
});
console.log(displayTasks());
 */
function addTask() {
  const nameVal = taskName.value.trim();
  const categoryVal = category.value.trim();
  const tStatusVal = tStatus.value.trim();
  const deadlineVal = deadline.value.trim();
  if (nameVal === "" || deadlineVal === "") {
    alert("Umm. It seems you forgot to enter a task name and deadline");
    return;
  }

  const newTask = {
    name: nameVal,
    category: categoryVal,
    deadline: deadlineVal,
    status: tStatusVal,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // clear inputs after adding
  taskName.value = "";
  deadline.value = "";
  tStatus.value = "In Progress";
  displayTasks();
}

addTaskBtn.addEventListener("click", addTask);

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("status-dropdown")) {
    const index = e.target.dataset.index;
    const newStatus = e.target.value;

    tasks[index].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  }
});

function overdueTasks() {
  const today = new Date();

  tasks.forEach((task) => {
    const taskDate = new Date(task.deadline);
    if (task.status !== "Completed" && taskDate < today) {
      task.status = "Overdue";
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}
overdueTasks();
