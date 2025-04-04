document.addEventListener("DOMContentLoaded", function () {
    // Xử lý nút "Bắt đầu ngay"
    document.getElementById("startBtn").addEventListener("click", function () {
        alert("Bạn đã bắt đầu hành trình tập luyện!");
    });

    // Xử lý nút "Đặt lịch"
    let bookButtons = document.querySelectorAll(".book-btn");
    bookButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            alert("Bạn đã đặt lịch thành công!");
        });
    });
});