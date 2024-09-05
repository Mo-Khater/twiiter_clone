import axios from "axios";
import { createPostHtml } from "./post";

export const displayPosts = async function () {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/posts",
    });
    if (res.data.status == "success") {
      renderPosts(res.data.data.posts, ".postsContainer");
    }
  } catch (err) {
    console.log(err);
  }
};

const renderPosts = (posts, container) => {
  console.log(posts);
  const postContainer = document.querySelector(container);
  posts.forEach((post) => {
    const html = createPostHtml(post);
    postContainer.insertAdjacentHTML("afterbegin", html);
  });

  if (posts.length == 0) {
    postContainer.insertAdjacentHTML(
      "afterbegin",
      "<div>no posts to show</div>"
    );
  }
};
