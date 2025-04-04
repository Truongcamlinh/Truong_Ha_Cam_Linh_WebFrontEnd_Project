document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("registerForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMess = document.querySelector(".error-mess");
    const successMess = document.querySelector(".success-mess");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();
        let emailError = document.getElementById("emailError");
        let passwordError = document.getElementById("passwordError");
        let isValid = true;
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

        if (isValid) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            
            if (storedUser) {
                if (storedUser.email === email && storedUser.password === password) {
                    successMess.style.display = "flex";
                    setTimeout(() => {
                        successMess.style.display = "none";  
                        window.location.href = "http://127.0.0.1:5500/pages/Home.html"; 
                    }, 2000); 
                } else {
                    errorMess.style.display = "flex";  
                    setTimeout(() => {
                        errorMess.style.display = "none";  
                    }, 2000); 
                }
            } else {
                errorMess.style.display = "flex";
                setTimeout(() => {
                    errorMess.style.display = "none";
                }, 2000);
            }
        }
    });
});
