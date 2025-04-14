const scheduleTableBody = document.getElementById("scheduleTableBody");
const pagination = document.getElementById("pagination");
const filterClass = document.getElementById("filterClass");
const filterEmail = document.getElementById("filterEmail");
const filterDate = document.getElementById("filterDate");
const btnFilter = document.getElementById("btnFilter");
const modal = document.getElementById("modal");
const classNameInput = document.getElementById("className");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const modalContent = document.querySelector("#modal .modal-content"); 

let editIndex = null;
let currentPage = 1;
const itemsPerPage = 5;
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.style.backgroundColor = type === "error" ? "#e74c3c" : "#4caf50";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
function getSchedulesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("schedules")) || [];
}
function saveSchedulesToLocalStorage(schedules) {
  localStorage.setItem("schedules", JSON.stringify(schedules));
}
function renderSchedules() {
  const schedules = getSchedulesFromLocalStorage();
  const filteredSchedules = schedules.filter(schedule => {
    const matchClass = !filterClass.value || schedule.className === filterClass.value;
    const matchEmail = !filterEmail.value || schedule.email.toLowerCase().includes(filterEmail.value.toLowerCase());
    const matchDate = !filterDate.value || schedule.date === filterDate.value;
    return matchClass && matchEmail && matchDate;
  });

  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSchedules = filteredSchedules.slice(startIndex, startIndex + itemsPerPage);

  scheduleTableBody.innerHTML = "";
  paginatedSchedules.forEach((schedule, index) => {
    scheduleTableBody.innerHTML += `
      <tr>
        <td>${schedule.className}</td>
        <td>${schedule.date}</td>
        <td>${schedule.time}</td>
        <td>${schedule.name}</td>
        <td>${schedule.email}</td>
        <td>
          <button onclick="editSchedule(${index + startIndex})">Sửa</button>
          <button onclick="deleteSchedule(${index + startIndex})">Xoá</button>
        </td>
      </tr>
    `;
  });
  function logout() {
    localStorage.removeItem("isAdminLoggedIn"); 
    window.location.href = "../pages/login.html";
    }
    if (username === "admin" && password === "admin123") {
        localStorage.setItem("isAdminLoggedIn", "true"); 
    }
    if (localStorage.getItem("isAdminLoggedIn") !== "true") {n
        window.location.href = "../pages/login.html";
      }

  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.className = "pagination-btn";
    if (i === currentPage) pageBtn.style.opacity = "0.6";
    pageBtn.onclick = () => {
      currentPage = i;
      renderSchedules();
    };
    pagination.appendChild(pageBtn);
  }

  renderStatsChart(schedules);
}
function saveSchedule() {
  const classValue = classNameInput.value;
  const dateValue = dateInput.value;
  const timeValue = timeInput.value;
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();

  if (!classValue || !dateValue || !timeValue || !nameValue || !emailValue) {
    showToast("Vui lòng điền đầy đủ thông tin!", "error");
    return;
  }

  const schedules = getSchedulesFromLocalStorage();
  const newSchedule = { className: classValue, date: dateValue, time: timeValue, name: nameValue, email: emailValue };

  if (editIndex !== null) {
    schedules[editIndex] = newSchedule;
    showToast("Cập nhật lịch thành công!");
  } else {
    schedules.push(newSchedule);
    showToast("Thêm lịch thành công!");
  }

  saveSchedulesToLocalStorage(schedules);
  closeModal();
  renderSchedules();
  editIndex = null;
}
function editSchedule(index) {
  const schedules = getSchedulesFromLocalStorage();
  const schedule = schedules[index];
  classNameInput.value = schedule.className;
  dateInput.value = schedule.date;
  timeInput.value = schedule.time;
  nameInput.value = schedule.name;
  emailInput.value = schedule.email;
  openModal();
  editIndex = index;
}
function deleteSchedule(index) {
  if (!confirm("Bạn có chắc chắn muốn xoá lịch này không?")) return;

  const schedules = getSchedulesFromLocalStorage();
  schedules.splice(index, 1);
  saveSchedulesToLocalStorage(schedules);
  showToast("Xoá lịch thành công!");
  renderSchedules();
}
function openModal() {
  modal.classList.add("show");
}
function closeModal() {
  modal.classList.remove("show");
}
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

btnFilter.addEventListener("click", () => {
  currentPage = 1;
  renderSchedules();
});
function renderStatsChart(schedules) {
  const gymCount = schedules.filter(s => s.className === "Gym").length;
  const yogaCount = schedules.filter(s => s.className === "Yoga").length;
  const zumbaCount = schedules.filter(s => s.className === "Zumba").length;

  document.getElementById("gymCount").textContent = gymCount;
  document.getElementById("yogaCount").textContent = yogaCount;
  document.getElementById("zumbaCount").textContent = zumbaCount;

  const ctx = document.getElementById("scheduleChart").getContext("2d");
  if (window.scheduleChart instanceof Chart) window.scheduleChart.destroy();

  window.scheduleChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Gym", "Yoga", "Zumba"],
      datasets: [{
        label: "Số lượng lịch đặt",
        data: [gymCount, yogaCount, zumbaCount],
        backgroundColor: ["#9cbcff", "#a8ddb5", "#d6b3f7"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          precision: 0
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", renderSchedules);
function showToast(message, type = "success") {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
}
function renderSchedules() {
    const schedules = getSchedulesFromLocalStorage();
    const filteredSchedules = schedules.filter(schedule => {
      const matchClass = !filterClass.value || schedule.className === filterClass.value;
      const matchEmail = !filterEmail.value || schedule.email.toLowerCase().includes(filterEmail.value.toLowerCase());
      const matchDate = !filterDate.value || schedule.date === filterDate.value;
      return matchClass && matchEmail && matchDate;
    });
    filteredSchedules.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSchedules = filteredSchedules.slice(startIndex, startIndex + itemsPerPage);
  
    scheduleTableBody.innerHTML = "";
    paginatedSchedules.forEach((schedule, index) => {
      scheduleTableBody.innerHTML += `
        <tr>
          <td>${schedule.className}</td>
          <td>${schedule.date}</td>
          <td>${schedule.time}</td>
          <td>${schedule.name}</td>
          <td>${schedule.email}</td>
          <td>
            <button onclick="editSchedule(${index + startIndex})">Sửa</button>
            <button onclick="deleteSchedule(${index + startIndex})">Xoá</button>
          </td>
        </tr>
      `;
    });
    document.addEventListener("DOMContentLoaded", function () {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "12345678";
        if (!localStorage.getItem("admin")) {
          const adminUser = {
            email: "admin@gmail.com",
            password: "12345678",
          };
          localStorage.setItem("admin", JSON.stringify(adminUser));
          console.log("Đã tạo tài khoản admin mặc định");
        }
      });
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      pageBtn.className = "pagination-btn";
      if (i === currentPage) pageBtn.style.opacity = "0.6";
      pageBtn.onclick = () => {
        currentPage = i;
        renderSchedules();
      };
      pagination.appendChild(pageBtn);
    }
  
    renderStatsChart(schedules);
  }
  document.getElementById("btnLogin").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
      if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.href = "../admin/admin.html"; 
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Sai tài khoản hoặc mật khẩu!',
        text: 'Vui lòng thử lại',
      });
    }
  });
  
