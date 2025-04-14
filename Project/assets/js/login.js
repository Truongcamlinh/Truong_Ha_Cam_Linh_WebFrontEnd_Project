document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("registerForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const errorMess = document.querySelector(".error-mess");
    const successMess = document.querySelector(".success-mess");
    const adminEmail = "admin@gmail.com";
    const adminPassword = "12345678";
    if (!localStorage.getItem("admin")) {
        const adminUser = {
            email: adminEmail,
            password: adminPassword,
        };
        localStorage.setItem("admin", JSON.stringify(adminUser));
    }
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;
        emailError.textContent = "";
        passwordError.textContent = "";
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailError.textContent = "Email không hợp lệ";
            isValid = false;
        }
        if (password.length < 8) {
            passwordError.textContent = "Mật khẩu phải có ít nhất 8 ký tự";
            isValid = false;
        }
        if (!isValid) return;
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedAdmin = JSON.parse(localStorage.getItem("admin"));
        localStorage.setItem("user", JSON.stringify({
            email: "user@example.com",
            password: "12345678"
          }));
        if (storedAdmin && email === storedAdmin.email && password === storedAdmin.password) {
            localStorage.setItem("isAdmin", "true");
            successMess.style.display = "flex";
            setTimeout(() => {
                successMess.style.display = "none";
                window.location.href = "http://127.0.0.1:5500/pages/admin.html#";
            }, 2000);
            return;
        }
        if (storedUser && email === storedUser.email && password === storedUser.password) {
            localStorage.setItem("isAdmin", "false");
            successMess.style.display = "flex";
            setTimeout(() => {
                successMess.style.display = "none";
                window.location.href = "/pages/Home.html";
            }, 2000);
            return;
        }
        errorMess.style.display = "flex";
        setTimeout(() => {
            errorMess.style.display = "none";
        }, 2000);
    });
});
