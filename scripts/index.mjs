import { apiUserurl, notLogin } from "./utilitys/api.mjs";
import { doFetch } from "./utilitys/doFetch.mjs";


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

  const image = document.createElement('img');
  if (post.media && post.media.url) {
    image.src = post.media.url;
    image.alt = post.media.alt || 'Post media';
  } else {
    // default image 
    image.src = 'https://www.colorhexa.com/a0fbd6.png'; 
    image.alt = 'Default media';
  }

  const heading = document.createElement('h2');
  const headingSpan = document.createElement('span');
  headingSpan.textContent = post.title;
  heading.appendChild(headingSpan);

  mediaContainer.append(image, heading);
  postPageLink.appendChild(mediaContainer);
  postContainer.appendChild(postPageLink);
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

    const userName = JSON.parse(localStorage.getItem('userName'));
    if (userName) {
      const responseData = await doFetch(apiUserurl);
      const posts = responseData.data;
      displayPosts(posts);
    } else {
      const responseData = await doFetch(notLogin);
      const posts = responseData.data;
      displayPosts(posts);
}
}
renderHomePage();