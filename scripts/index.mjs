
import { apiUserurl } from "./utilitys/api.mjs";
import { doFetch } from "./utilitys/doFetch.mjs";


function generatePost(post) {
  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');

  const postContainer = document.createElement('div');
  postContainer.classList.add('post-container');

  const postPageLink = document.createElement('a');
  postPageLink.href = './html/blogpost.html';
  postPageLink.addEventListener('click',() => {
    localStorage.setItem('post', JSON.stringify(post))
  });

  const heading = document.createElement('h1');
  heading.textContent = post.title;

  const mediaContainer = document.createElement('img');
  mediaContainer.scr = post.media.url;
  mediaContainer.alt = post.media.alt;

  const postDate = document.createElement('h2');
  postDate.textContent = post.created;

  postContainer.append(postPageLink, mediaContainer, postDate)
  postPageLink.appendChild(heading)
  postWrapper.appendChild(postContainer)
  console.log(postWrapper)

  return postWrapper;
  
}

function displayPosts(posts){
  const displayPostsContainer = document.getElementById('display-posts');
  displayPostsContainer.textContent = '';
  posts

.forEach((post) => {
  const postHtml = generatePost(post);
  displayPostsContainer.appendChild(postHtml);
});
}

 async function renderHomePage () {
 const responseData = await doFetch(apiUserurl);
  console.log(responseData)
  const posts = responseData.data;
  console.log(posts)
  displayPosts(posts);
}

renderHomePage()