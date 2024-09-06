import { createPost } from "./post";
import { login, signup } from "./auth";
import { displayPosts } from "./homePosts";
import { handleClickLikeButton } from "./likeButton";
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

document.addEventListener("click", async function (event) {
  // Check if the clicked element has the class 'likeButton'
  if (event.target.classList.contains("likedButton")) {
    const postId = getPostId(event.target);
    const post = await handleClickLikeButton(postId);
    const spanElement = event.target.querySelector("span");
    if (spanElement) {
      spanElement.textContent = post.likes.length || "";
    }
    const mainSectionContainer = document.querySelector(
      ".mainSectionContainer"
    );
    const userId = mainSectionContainer.dataset.userid;
    console.log(userId);
    if (userId) {
      if (post.likes.includes(userId)) {
        event.target.classList.add("active");
      } else {
        event.target.classList.remove("active");
      }
    }
  }
});

const getPostId = (element) => {
  // Get the nearest parent element with the class 'post'
  const rootElement = element.closest(".post");

  if (rootElement) {
    // Access the data-id attribute
    return rootElement.dataset.id;
  }

  return null; // Return null if no post element is found
};
