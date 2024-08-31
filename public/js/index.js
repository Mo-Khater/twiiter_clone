import { login, signup } from "./auth";
const loginform = document.querySelector(".loginform");
const registerform = document.querySelector(".registerform");

if (loginform) {
  loginform.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}
if (registerform) {
  registerform.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    signup(name, email, password, confirmPassword);
  });
}
