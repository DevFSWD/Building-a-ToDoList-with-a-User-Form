const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const removedList = document.getElementById("removedList");
const toggleRemovedBtn = document.getElementById("toggleRemovedBtn");
const removedSection = document.getElementById("removedSection");

toggleRemovedBtn.addEventListener("click", () => {
  if (removedSection.style.display === "none") {
    removedSection.style.display = "block";
    toggleRemovedBtn.textContent = "Hide Deleted / Canceled Tasks";
  } else {
    removedSection.style.display = "none";
    toggleRemovedBtn.textContent = "Show Deleted / Canceled Tasks";
  }
});

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskDueDate = taskDate.value;

  if (taskText && taskDueDate) {
    const formattedDate = new Date(taskDueDate).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    });

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start flex-wrap";

    const content = document.createElement("div");
    content.innerHTML = `<strong>${taskText}</strong><br><small class="text-muted">Due: ${formattedDate}</small>`;
    content.classList.add("task-text");

    const controls = document.createElement("div");
    controls.className = "d-flex flex-column align-items-end";

    const statusSelect = document.createElement("select");
    statusSelect.className = "form-select form-select-sm mb-2";
    ["Pending", "Completed", "Hold", "Canceled"].forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      statusSelect.appendChild(option);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-sm btn-outline-danger";

    controls.appendChild(statusSelect);
    controls.appendChild(deleteBtn);

    statusSelect.addEventListener("change", () => {
  const selectedStatus = statusSelect.value;

  li.className = "list-group-item d-flex justify-content-between align-items-start flex-wrap";
content.classList.remove("completed");

switch (selectedStatus) {
  case "Completed":
    li.classList.add("custom-light-green");
    content.classList.add("completed");
    break;
  case "Pending":
    li.classList.add("bg-secondary", "text-white");
    break;
  case "Hold":
    li.classList.add("bg-warning", "text-dark");
    break;
  case "Canceled":
    taskList.removeChild(li);
    moveToRemoved(taskText, formattedDate, selectedStatus);
    return;
 }
});

    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(li);
      moveToRemoved(taskText, formattedDate, "Deleted");
    });

    li.appendChild(content);
    li.appendChild(controls);
    taskList.appendChild(li);

    taskInput.value = "";
    taskDate.value = "";
  } else {
    alert("Please enter both task and date!");
  }
});

function moveToRemoved(text, date, status) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-start flex-wrap";

  li.innerHTML = `<div>
                    <strong>${text}</strong><br>
                    <small class="text-muted">Due: ${date}</small><br>
                    <span class="badge ${getStatusBadgeClass(status)}">${status}</span>
                  </div>`;

  removedList.appendChild(li);
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "Completed": return "bg-success";
    case "Hold": return "bg-warning text-dark";
    case "Canceled": return "bg-danger";
    case "Deleted": return "bg-secondary";
    default: return "bg-info";
  }
}