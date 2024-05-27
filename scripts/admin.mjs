import { apiUserurl } from "./utilitys/api.mjs";
import { doFetch } from "./utilitys/doFetch.mjs";
import { doDelete } from "./utilitys/doDelete.mjs";


export function generatePost(post) {
  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');

  const postContainer = document.createElement('div');
  postContainer.classList.add('post-container');

  const postPageLink = document.createElement('a');
  postPageLink.addEventListener('click', (event) => {
    event.preventDefault();
    const postId = post.id;
    const newLink = `./html/blogpost.html?postId=${postId}`;
    window.location.assign(newLink);
  });

  const mediaContainer = document.createElement('div');
  mediaContainer.classList.add('media-container');

  const heading = document.createElement('h2');
  const headingSpan = document.createElement('span');
  headingSpan.textContent = post.title;
  heading.appendChild(headingSpan);

  mediaContainer.append(heading);
  postPageLink.appendChild(mediaContainer);
  postContainer.appendChild(postPageLink);

  // Create and append delete button
  const deleteButton = document.createElement('a');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const postId = post.id;
    const success = await doDelete(`${apiUserurl}/${postId}`);
    if (success) {
      postWrapper.remove();
    }
  });

  // Create and append edit button
  const editButton = document.createElement('a');
  editButton.textContent = 'Edit';
  editButton.href = `./editpost.html?postId=${post.id}`; // Redirect to edit page with postId

  postContainer.appendChild(deleteButton);
  postContainer.appendChild(editButton);
  postWrapper.appendChild(postContainer);

  return postWrapper;
}

function displayPosts(posts) {
  const displayPostsContainer = document.getElementById('display-posts');
  displayPostsContainer.textContent = '';
  posts.forEach((post) => {
    const postHtml = generatePost(post);
    displayPostsContainer.appendChild(postHtml);
  });
}

async function renderHomePage() {
  try {
    const responseData = await doFetch(apiUserurl);
    if (responseData && responseData.data) {
      const posts = responseData.data;
      displayPosts(posts);
    } else {
      console.error('No data found in the API response.');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

renderHomePage();

document.getElementById('logout-button').addEventListener('click', () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userName');
  window.location.href = './login.html';
});
