import axios from "axios";

export const handleClickLikeButton = async (postId) => {
  try {
    await axios({
      method: "PUT",
      url: `/api/v1/users/me`,
      data: { id: postId },
    });

    const res = await axios({
      method: "PUT",
      url: `/api/v1/posts/${postId}/like`,
    });

    return res.data.data.post;
  } catch (err) {
    console.log(err);
  }
};
