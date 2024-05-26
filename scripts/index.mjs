import { apiUserurl } from "./utilitys/api.mjs";
import { doFetch } from "./utilitys/doFetch.mjs";
import { doDelete } from "./utilitys/doDelete.mjs";


function createPostElements(post, includeMedia) {
  const postContainer = document.createElement('div');
  postContainer.classList.add('post-container');

  const postPageLink = document.createElement('a');
  postPageLink.href = `./html/blogpost.html?postId=${post.id}`;
  postPageLink.addEventListener('click', (event) => {
    event.preventDefault();
    const postId = post.id;
    const newLink = `./html/blogpost.html?postId=${postId}`;
    window.location.assign(newLink);
  });

  const heading = document.createElement('h2');
  const headingSpan = document.createElement('span');
  headingSpan.textContent = post.title;
  heading.appendChild(headingSpan);

  if (includeMedia) {
    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('media-container');

    const image = document.createElement('img');
    if (post.media && post.media.url) {
      image.src = post.media.url;
      image.alt = post.media.alt || 'Post media';
    } else {
      // default image 
      image.src = 'https://www.colorhexa.com/a0fbd6.png';
      image.alt = 'Default media';
    }

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    overlay.appendChild(heading);
    mediaContainer.appendChild(image);
    mediaContainer.appendChild(overlay);
    postPageLink.appendChild(mediaContainer);
  } else {
    postPageLink.appendChild(heading);
  }

  postContainer.appendChild(postPageLink);

  return postContainer;
}

// Function to generate post without delete button
export function generatePost(post, includeMedia = true) {
  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');

  const postContainer = createPostElements(post, includeMedia);

  postWrapper.appendChild(postContainer);

  return postWrapper;
}

// Function to generate post with delete button
export function generatePostWithDelete(post, includeMedia = true) {
  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');

  const postContainer = createPostElements(post, includeMedia);

  const deleteButton = document.createElement('a');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const postId = post.id;
    const success = await deletePost(postId);
    if (success) {
      postWrapper.remove();
    }
  });

  postContainer.appendChild(deleteButton);
  postWrapper.appendChild(postContainer);

  return postWrapper;
}

async function deletePost(postId) {
  const url = `${apiUserurl}/${postId}`;
  const success = await doDelete(url);
  return success;
}

function displayPosts(posts, includeMedia = true, withDelete = false) {
  const displayPostsContainer = document.getElementById('display-posts');
  displayPostsContainer.textContent = '';
  posts.forEach((post) => {
    let postHtml;
    if (withDelete) {
      postHtml = generatePostWithDelete(post, includeMedia);
    } else {
      postHtml = generatePost(post, includeMedia);
    }
    displayPostsContainer.appendChild(postHtml);
  });
}

export async function renderHomePage(includeMedia = true, withDelete = false) {
  try {
    const responseData = await doFetch(apiUserurl);
    if (responseData && responseData.data) {
      const posts = responseData.data;
      displayPosts(posts, includeMedia, withDelete);
    } else {
      console.error('No data found in the API response.');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

renderHomePage(true, false);
