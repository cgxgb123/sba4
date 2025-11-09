const taskName = document.getElementById("taskName");
const category = document.getElementById("category");
const deadline = document.getElementById("deadline");
const tStatus = document.getElementById("status");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filterCategory = document.getElementById("filter-category");
const filterStatus = document.getElementById("filter-status");
const clearFiltersBtn = document.getElementById("clear-filters");
const gif = document.getElementById("celebration");

const statusStyles = {
  Overdue: { color: "red", fontWeight: "bold" },
  Completed: { color: "green" },
  "In Progress": { color: "orange" },
};

// load tasks from local storage on refresh
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function showGif() {
  gif.style.display = "block";
  // launch confetti for 5 seconds
  const end = Date.now() + 5 * 1000;
  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  // hide gif after 5 seconds
  setTimeout(() => {
    gif.style.display = "none";
  }, 5000);
}

// clear filters
function clearFilters() {
  filterCategory.value = "all";
  filterStatus.value = "all";
  displayTasks();
}

// filter tasks
function filterTasks() {
  const selectedCategory = filterCategory.value;
  const selectedStatus = filterStatus.value;
  const filtered = tasks.filter((task) => {
    const matchCategory =
      selectedCategory === "all" || task.category === selectedCategory;
    const matchStatus =
      selectedStatus === "all" || task.status === selectedStatus;
    return matchCategory && matchStatus;
  });

  displayTasks(filtered);
}

// display tasks
function displayTasks(filteredTasks = tasks) {
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const row = document.createElement("tr");

    // apply style dynamically using the status map
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
}

// add new task
function addTask() {
  const nameVal = taskName.value.trim();
  const categoryVal = category.value.trim();
  const tStatusVal = tStatus.value.trim();
  const deadlineVal = deadline.value.trim();

  if (nameVal === "" || deadlineVal === "") {
    alert("umm. it seems you forgot to enter a task name and deadline");
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

// mark overdue tasks
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

// update status via dropdown
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("status-dropdown")) {
    const index = e.target.dataset.index;
    const newStatus = e.target.value;

    tasks[index].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();

    if (newStatus === "Completed") {
      showGif();
    }
  }
});

// event listeners for filters and add button
filterCategory.addEventListener("change", filterTasks);
filterStatus.addEventListener("change", filterTasks);
clearFiltersBtn.addEventListener("click", clearFilters);
addTaskBtn.addEventListener("click", addTask);

// run overdue check and display tasks on load
overdueTasks();
