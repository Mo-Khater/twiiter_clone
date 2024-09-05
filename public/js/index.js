import { createPost } from "./post";
import { login, signup } from "./auth";
import { displayPosts } from "./homePosts";
const loginform = document.querySelector(".loginform");
const registerform = document.querySelector(".registerform");
const textarea = document.getElementById("postTextarea");
const button = document.getElementById("submitPostButton");
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

if (textarea && button) {
  textarea.addEventListener("input", () => {
    if (textarea.value.trim() !== "") {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
}

if (button) {
  button.addEventListener("click", () => {
    const postContent = textarea.value;
    createPost(postContent);
  });
}

const postsContainer = document.querySelector(".postsContainer");
if (postsContainer) {
  displayPosts();
}
