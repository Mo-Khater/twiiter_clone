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
    console.log(res);
    if (res.data.status == "success") {
      const html = createPostHtml(res);
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

function createPostHtml(postData) {
  const user = postData.data.newpost.user;
  const timestamp = postData.data.newpost.createdAt;

  return `<div class='post'>

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
                            <span>${postData.data.newpost.content}</span>
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
                            <div class='postButtonContainer'>
                                <button>
                                    <i class='far fa-heart'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}
