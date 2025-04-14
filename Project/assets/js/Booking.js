document.addEventListener("DOMContentLoaded", function () {
    const scheduleList = document.getElementById("scheduleList");
    const btnOpenModal = document.getElementById("btnAddSchedule");
    const modalForm = document.getElementById("modal");
    const modalConfirm = document.getElementById("modalConfirm");
    const closeModal = document.querySelector(".close");
    const scheduleForm = document.getElementById("scheduleForm");
    const pagination = document.getElementById("pagination");
    const btnDeleteCancel = document.getElementById("btnDeleteCancel");
    const btnDeleteConfirm = document.getElementById("btnDeleteConfirm");

    let editIndex = null;
    let currentPage = 1;
    const itemsPerPage = 5;
    function saveSchedulesToLocalStorage(schedules) {
        localStorage.setItem("schedules", JSON.stringify(schedules));
    }
    function getSchedulesFromLocalStorage() {
        return JSON.parse(localStorage.getItem("schedules")) || [];
    }
    function showErrorMessage(message) {
        const errorMess = document.querySelector(".error-mess");
        const errorContent = document.querySelector(".error-mess .content");
        errorContent.textContent = message;
        errorMess.style.display = "flex";
        setTimeout(() => {
            errorMess.style.display = "none";
        }, 3000);
    }
    function showSuccessMessage(message) {
        const successMess = document.querySelector(".success-mess");
        const successContent = document.querySelector(".success-mess .content-succes");
        successContent.textContent = message;
        successMess.style.display = "flex";
        setTimeout(() => {
            successMess.style.display = "none";
        }, 3000);
    }
    function loadSchedules() {
        const schedules = getSchedulesFromLocalStorage();
        const totalPages = Math.ceil(schedules.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedSchedules = schedules.slice(startIndex, endIndex);
        scheduleList.innerHTML = "";
        paginatedSchedules.forEach((schedule, index) => {
            const row = `
          <tr>
            <td>${schedule.className}</td>
            <td>${schedule.date}</td>
            <td>${schedule.time}</td>
            <td>${schedule.name}</td>
            <td>${schedule.email}</td>
            <td class="tdt">
              <button onclick="editSchedule(${index + startIndex})" class="btn-edit">Sửa</button>
              <button onclick="confirmDelete(${index + startIndex})" class="btn-danger">Xóa</button>
            </td>
          </tr>
        `;
            scheduleList.innerHTML += row;
        });
        pagination.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.textContent = i;
            pageBtn.classList.add("pagination-btn");
            if (i === currentPage) pageBtn.style.opacity = "0.6";
            pageBtn.onclick = function () {
                currentPage = i;
                loadSchedules();
            };
            pagination.appendChild(pageBtn);
        }
    }
    window.editSchedule = function (index) {
        const schedules = getSchedulesFromLocalStorage();
        const schedule = schedules[index];
        document.getElementById("class").value = schedule.class;
        document.getElementById("date").value = schedule.date;
        document.getElementById("time").value = schedule.time;
        document.getElementById("name").value = schedule.name;
        document.getElementById("email").value = schedule.email;
        modalForm.style.display = "flex";
        editIndex = index;
    };
    window.confirmDelete = function (index) {
        modalConfirm.style.display = "flex";
        btnDeleteConfirm.onclick = function () {
            const schedules = getSchedulesFromLocalStorage();
            schedules.splice(index, 1);
            saveSchedulesToLocalStorage(schedules);
            modalConfirm.style.display = "none";
            showSuccessMessage("Xóa lịch thành công.");
            loadSchedules();
        };
    };
    btnDeleteCancel.addEventListener("click", function () {
        modalConfirm.style.display = "none";
    });
    btnOpenModal.addEventListener("click", function () {
        modalForm.style.display = "flex";
        editIndex = null;
        scheduleForm.reset();
    });
    closeModal.addEventListener("click", function () {
        modalForm.style.display = "none";
    });
    scheduleForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const classValue = document.getElementById("class").value;
        const dateValue = document.getElementById("date").value;
        const timeValue = document.getElementById("time").value;
        const nameValue = document.getElementById("name").value.trim();
        const emailValue = document.getElementById("email").value.trim();
        const schedules = getSchedulesFromLocalStorage();
        const isDuplicate = schedules.some((schedule, idx) =>
            schedule.className === classValue &&
            schedule.date === dateValue &&
            schedule.time === timeValue &&
            schedule.name === nameValue &&
            schedule.email === emailValue &&
            idx !== editIndex
        );

        if (isDuplicate) {
            showErrorMessage("Lịch tập này đã tồn tại.");
            return;
        }
        const newSchedule = {
            className: classValue,
            date: dateValue,
            time: timeValue,
            name: nameValue,
            email: emailValue
        };

        if (editIndex !== null) {
            schedules[editIndex] = newSchedule;
        } else {
            schedules.push(newSchedule);
        }
        saveSchedulesToLocalStorage(schedules);
        modalForm.style.display = "none";
        showSuccessMessage(editIndex !== null ? "Sửa lịch thành công." : "Thêm lịch thành công.");
        loadSchedules();
    });
    loadSchedules();
});