document.addEventListener("DOMContentLoaded", function () {
    const scheduleList = document.getElementById("scheduleList");
    const btnOpenModal = document.getElementById("btnOpenModal");
    const modalForm = document.getElementById("modalForm");
    const closeModal = document.querySelector(".close");
    const scheduleForm = document.getElementById("scheduleForm");
    let editIndex = null;

    // Hiển thị modal khi ấn "Đặt lịch"
    btnOpenModal.addEventListener("click", function () {
        modalForm.style.display = "flex";
        editIndex = null;
        scheduleForm.reset();  // Đặt lại form khi mở modal
    });

    // Đóng modal khi ấn nút "x"
    closeModal.addEventListener("click", function () {
        modalForm.style.display = "none";
    });

    // Khi submit form
    scheduleForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
        const newSchedule = {
            class: document.getElementById("class").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
        };

        if (editIndex !== null) {
            schedules[editIndex] = newSchedule;
        } else {
            schedules.push(newSchedule);
        }

        // Lưu vào localStorage
        localStorage.setItem("schedules", JSON.stringify(schedules));

        // Thêm lịch vào bảng ngoài
        const row = `
            <tr>
                <td>${newSchedule.class}</td>
                <td>${newSchedule.date}</td>
                <td>${newSchedule.time}</td>
                <td>${newSchedule.name}</td>
                <td>${newSchedule.email}</td>
                <td>
                    <button onclick="editSchedule(${schedules.length - 1})" class="btn-primary">Sửa</button>
                    <button onclick="deleteSchedule(${schedules.length - 1})" class="btn-danger">Xóa</button>
                </td>
            </tr>
        `;
        scheduleList.innerHTML += row;

        // Ẩn modal
        modalForm.style.display = "none";
    });

    // Hàm hiển thị danh sách lịch từ localStorage
    function loadSchedules() {
        const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
        scheduleList.innerHTML = "";
        schedules.forEach((schedule, index) => {
            const row = `
                <tr>
                    <td>${schedule.class}</td>
                    <td>${schedule.date}</td>
                    <td>${schedule.time}</td>
                    <td>${schedule.name}</td>
                    <td>${schedule.email}</td>
                    <td>
                        <button onclick="editSchedule(${index})" class="btn-primary">Sửa</button>
                        <button onclick="deleteSchedule(${index})" class="btn-danger">Xóa</button>
                    </td>
                </tr>
            `;
            scheduleList.innerHTML += row;
        });
    }

    // Chỉnh sửa lịch
    function editSchedule(index) {
        const schedules = JSON.parse(localStorage.getItem("schedules"));
        const schedule = schedules[index];
        document.getElementById("class").value = schedule.class;
        document.getElementById("date").value = schedule.date;
        document.getElementById("time").value = schedule.time;
        document.getElementById("name").value = schedule.name;
        document.getElementById("email").value = schedule.email;
        modalForm.style.display = "flex";  // Hiển thị modal khi sửa
        editIndex = index;
    }

    // Xóa lịch
    function deleteSchedule(index) {
        const schedules = JSON.parse(localStorage.getItem("schedules"));
        schedules.splice(index, 1);
        localStorage.setItem("schedules", JSON.stringify(schedules));
        loadSchedules();
    }

    loadSchedules();  // Load danh sách khi trang được tải
});
