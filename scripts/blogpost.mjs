import { apiUserurl, notLogin } from "./utilitys/api.mjs";
import { doFetch } from "./utilitys/doFetch.mjs";

function generateSinglePost(onePost) {
  let main = document.querySelector("main");

  const postContainer = document.createElement("div");
  postContainer.classList.add("one-post");

  const mediaContainer = document.createElement("img");
  if (onePost.media && onePost.media.url) {
    mediaContainer.src = onePost.media.url;
    mediaContainer.alt = onePost.media.alt || "Post media";
  } else {
    // default image
    mediaContainer.src =
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbG9yfGVufDB8fDB8fHww";
    mediaContainer.alt = "Default media";
  }

  const heading = document.createElement("h1");
  heading.textContent = onePost.title;

  const postDate = document.createElement("h3");
  postDate.textContent = onePost.created;

  const body = document.createElement("p");
  body.textContent = onePost.body;

  postContainer.append(heading, postDate, mediaContainer, body);
  main.appendChild(postContainer);

  return postContainer;
}

function displaySinglePost(post) {
  const displaySinglePostContainer = document.getElementById("display-one-post");
  displaySinglePostContainer.textContent = "";
  const onePostHtml = generateSinglePost(post);
  displaySinglePostContainer.appendChild(onePostHtml);
}

async function renderPage() {
  try {
    const parameterString = window.location.search;
    const searchParameter = new URLSearchParams(parameterString);
    const id = searchParameter.get("postId");

    const userName = JSON.parse(localStorage.getItem("userName"));
    const apiUrl = userName ? apiUserurl : notLogin;

    const responseData = await doFetch(`${apiUrl}/${id}`);
    if (responseData && responseData.data) {
      const post = responseData.data;
      displaySinglePost(post);
    } else {
      console.error("No data found in the API response.");
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

renderPage();
