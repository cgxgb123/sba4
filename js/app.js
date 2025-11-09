const taskName = document.getElementById("taskName");
const catergory = document.getElementById("category");
const deadline = document.getElementById("deadline");
const status = document.getElementById("status");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

//  load tasks from local storage on refresh
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks(filteredTasks = tasks) {
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const row = document.createElement("tr");

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
          <option value="Overdue" ${
            task.status === "Overdue" ? "selected" : ""
          }>Overdue</option>
        </select>
      </td>
    `;

    taskList.appendChild(row);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
/* Testing tasks, browser storage, and pushing to array
tasks.push({
  name: "nameTest",
  category: "categoryTest",
  status: "statusTest",
  deadline: "2025",
});
console.log(displayTasks()); */
