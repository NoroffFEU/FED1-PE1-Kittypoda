import { apiUserurl } from "./api.mjs";
import { doFetch } from "./doFetch.mjs";

const editPostForm = document.getElementById('edit-post-form');

const parameterString = window.location.search;
const searchParams = new URLSearchParams(parameterString);
const postId = searchParams.get('postId');

async function fetchPostData(postId) {
  const responseData = await doFetch(`${apiUserurl}/${postId}`);
  if (responseData && responseData.data) {
    return responseData.data;
  }
  return null;
}

export async function populateForm() {
  const postData = await fetchPostData(postId);
  if (postData) {
    document.getElementById('title').value = postData.title;
    document.getElementById('body').value = postData.body;
    if (postData.media) {
      document.getElementById('media').value = postData.media.url;
      document.getElementById('media-alt').value = postData.media.alt;
    }
  }
}

editPostForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const media = document.getElementById('media').value;
  const mediaAlt = document.getElementById('media-alt').value;

  const token = localStorage.getItem('accessToken');

  const postData = {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
      media: {
        url: media,
        alt: mediaAlt,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${apiUserurl}/${postId}`, postData);
  const json = await response.json();

  if (response.ok) {
    alert('Post updated successfully!');
    window.location.href = './admin.html';
  } else {
    console.error('Failed to update post:', json);
    alert('Failed to update post. Please try again.');
  }
});

 populateForm();