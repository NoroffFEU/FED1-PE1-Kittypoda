import { apiUserurl } from "./utilitys/api.mjs";
import { doFetch } from "./utilitys/doFetch.mjs";


function generateSinglePost(onePost) {
  let main = document.querySelector("main");

  const postContainer = document.createElement ("div");
  postContainer.classList = "one-post";

 
  const mediaContainer = document.createElement('img');
  if (onePost.media && onePost.media.url) {
    mediaContainer.src = onePost.media.url;
    mediaContainer.alt = onePost.media.alt || 'Post media';
  } else {
    // default image 
    mediaContainer.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbG9yfGVufDB8fDB8fHww'; 
    mediaContainer.alt = 'Default media';
  }
  
  const heading = document.createElement('h1');
  heading.textContent = onePost.title;

  const postDate = document.createElement('h2');
  postDate.textContent = onePost.created;

  const body = document.createElement('p');
  body.textContent = onePost.body;

  main.appendChild(postContainer);
  postContainer.append(heading, postDate, mediaContainer,body,);

  return postContainer;
}

function displaySinglePost(post) {
const displaySinglePostContainer = document.getElementById('display-one-post');
console.log(displaySinglePostContainer)
displaySinglePostContainer.textContent = '';
const onePostHtml = generateSinglePost(post);
displaySinglePostContainer.appendChild(onePostHtml);


}
const parameterString = window.location.search;
    const searchParameter = new URLSearchParams(parameterString)
    const id = searchParameter.get('postId')
    console.log(id)

console.log(parameterString);


async function renderPage() {
  try{
    const parameterString = window.location.search;
    const searchParameter = new URLSearchParams(parameterString)
    const id = searchParameter.get('postId')
    console.log(id)
    const responseData = await doFetch(apiUserurl + `/${id}`);
    if (responseData && responseData.data) {
      const post = responseData.data;
      console.log(post)
      displaySinglePost(post);
    } else {
      console.error ('no data found');
    }
  } catch (error) {
    console.error('error fetching posts', error);
  }
}
  
renderPage();



