import axios from "axios";
import { showAlert } from "./alert";

export const createPost = async (postContent) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/posts",
      data: {
        postContent,
      },
    });
    if (res.data.status == "success") {
      const html = createPostHtml(res.data.newpost);
      const postContainer = document.querySelector(".postsContainer");
      postContainer.insertAdjacentHTML("afterbegin", html);
      const textarea = document.getElementById("postTextarea");
      const button = document.getElementById("submitPostButton");
      textarea.val = "";
      button.disabled = false;
    }
  } catch (err) {
    console.log(err);
  }
};

export function createPostHtml(postData) {
  const user = postData.user;
  const timestamp = timeSince(postData.createdAt);
  const isLikedButton = postData.likes.includes(user._id) ? "active" : "";
  return `<div class='post' data-id='${postData._id}'>

                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${user.photo}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                            <a href='/profile/${user.name}' class='displayName'>${user.name}</a>
                            <span class='username'>@${user.name}</span>
                            <span class='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                            <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class='far fa-comment'></i>
                                </button>
                            </div>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class='fas fa-retweet'></i>
                                </button>
                            </div>
                            <div class='postButtonContainer red'>
                                <button class='likedButton ${isLikedButton}'>
                                    <i class='far fa-heart'></i>
                                    <span>${postData.likes.length || ""}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function timeSince(date) {
  // Convert to Date object if it isn't already
  const postDate = new Date(date);

  var seconds = Math.floor((new Date() - postDate) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  if (Math.floor(seconds) < 30) return "Just now";
  return Math.floor(seconds) + " seconds";
}
