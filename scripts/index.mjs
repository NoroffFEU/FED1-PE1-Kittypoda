import { apiUserurl } from "./utilitys/api.mjs";
import { doFetch } from "./utilitys/doFetch.mjs";

function generatePost(post) {
  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');

  const postContainer = document.createElement('div');
  postContainer.classList.add('post-container');

  const postPageLink = document.createElement('a');
  postPageLink.addEventListener('click', (event) => {
    event.preventDefault()
    const postId = post.id;
    const newLink = `./html/blogpost.html?postId=${postId}`
    window.location.assign(newLink)
  });

  const heading = document.createElement('h1');
  heading.textContent = post.title;

  /*const mediaContainer = document.createElement('img');
  if (post.media && post.media.url) {
    mediaContainer.src = post.media.url;
    mediaContainer.alt = post.media.alt || 'Post media';
  } else {
    // default image 
    mediaContainer.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbG9yfGVufDB8fDB8fHww'; 
    mediaContainer.alt = 'Default media';
  }
*/

const bannerContainer = document.createElement('img');
if (post.banner && post.banner.url) {
  bannerContainer.src = post.banner.url;
} else {
  bannerContainer.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbG9yfGVufDB8fDB8fHww'; 
}
  const postDate = document.createElement('h2');
  postDate.textContent = post.created;

  postContainer.append(postPageLink, bannerContainer, postDate);
  postPageLink.appendChild(heading);
  postWrapper.appendChild(postContainer);
  console.log(postWrapper);
  
  return postWrapper;
}

function displayPosts(posts) {
  const displayPostsContainer = document.getElementById('display-posts');
  console.log(displayPostsContainer);
  displayPostsContainer.textContent = '';
  posts.forEach((post) => {
    const postHtml = generatePost(post);
    displayPostsContainer.appendChild(postHtml);
  });
}

async function renderHomePage() {
  try {
    const responseData = await doFetch(apiUserurl);
    console.log(responseData);
    if (responseData && responseData.data) {
      const posts = responseData.data;
      console.log(posts);
      displayPosts(posts);
    } else {
      console.error('No data found in the API response.');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

renderHomePage();
