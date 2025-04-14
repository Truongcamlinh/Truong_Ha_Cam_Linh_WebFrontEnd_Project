document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const successMess = document.querySelector(".success-mess");
    const errorMess = document.querySelector(".error-mess");
    const errorContent = document.querySelector(".error-mess .content");
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let fullname = fullnameInput.value.trim();
        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();
        let confirmPassword = confirmPasswordInput.value.trim();
        let fullnameError = document.getElementById("fullnameError");
        let emailError = document.getElementById("emailError");
        let passwordError = document.getElementById("passwordError");
        let confirmPasswordError = document.getElementById("confirmPasswordError");
        let isValid = true;
        if (fullname === "") {
            fullnameError.textContent = "Họ và tên không được để trống";
            isValid = false;
        } else {
            fullnameError.textContent = "";
        }
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailError.textContent = "Email không hợp lệ";
            isValid = false;
        } else {
            emailError.textContent = "";
        }
        if (password.length < 8) {
            passwordError.textContent = "Mật khẩu phải có ít nhất 8 ký tự";
            isValid = false;
        } else {
            passwordError.textContent = "";
        }
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = "Mật khẩu xác nhận không khớp";
            isValid = false;
        } else {
            confirmPasswordError.textContent = "";
        }
        if (isValid) {
            const user = {
                fullname: fullname,
                email: email,
                password: password,
            };
            localStorage.setItem("user", JSON.stringify(user));
            successMess.style.display = "flex";
            setTimeout(() => {
                successMess.style.display = "none";
                window.location.href = "./login.html"; 
            }, 2000);
        } else {
            errorContent.textContent = "Vui lòng điền đầy đủ và đúng thông tin!";
            errorMess.style.display = "flex";
            setTimeout(() => {
                errorMess.style.display = "none";
            }, 2000);
        }
    });
});
