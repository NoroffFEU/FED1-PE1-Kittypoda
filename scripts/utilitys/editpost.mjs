import { apiUserurl } from "./api.mjs";
import { doFetch } from "./doFetch.mjs";

document.addEventListener('DOMContentLoaded', () => {
  const editPostForm = document.getElementById('edit-post-form');

  if (!editPostForm) {
    console.error('Form element with id "edit-post-form" not found.');
  }

  const parameterString = window.location.search;
  const searchParams = new URLSearchParams(parameterString);
  const postId = searchParams.get('postId');

  if (!postId) {
    console.error('Post ID not found in URL parameters.');
  }

  async function fetchPostData(postId) {
    try {
      const responseData = await doFetch(`${apiUserurl}/${postId}`);
      if (responseData && responseData.data) {
        return responseData.data;
      }
      console.error('No data found in the API response.');
      return null;
    } catch (error) {
      console.error('Error fetching post data:', error);
      return null;
    }
  }

  async function populateForm() {
    try {
      const postData = await fetchPostData(postId);
      if (postData) {
        document.getElementById('title').value = postData.title;
        document.getElementById('body').value = postData.body;
        if (postData.media) {
          document.getElementById('media').value = postData.media.url;
          document.getElementById('media-alt').value = postData.media.alt;
        }
      } else {
        console.error('Failed to populate form: postData is null.');
      }
    } catch (error) {
      console.error('Error populating form:', error);
    }
  }

  editPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const media = document.getElementById('media').value;
    const mediaAlt = document.getElementById('media-alt').value;

    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('User is not authenticated.');
      console.error('No access token found in localStorage.');
      return;
    }

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

    try {
      const response = await fetch(`${apiUserurl}/${postId}`, postData);
      const json = await response.json();

      if (response.ok) {
        alert('Post updated successfully!');
        window.location.href = '../admin.html';
      } else {
        console.error('Failed to update post:', json);
        alert('Failed to update post. Please try again.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post. Please try again.');
    }
  });

  populateForm();
});
