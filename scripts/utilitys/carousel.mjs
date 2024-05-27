import { apiUserurl, notLogin } from "./api.mjs";
import { doFetch } from "./doFetch.mjs";

async function fetchLatestPosts(url) {
  try {
    const responseData = await doFetch(url);
    if (responseData && responseData.data) {
      const posts = responseData.data.slice(0, 3); 
      return posts;
    } else {
      console.error('No data found in the API response.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

function createCarouselItem(post) {
  const item = document.createElement('div');
  item.classList.add('carousel-item');

  const postPageLink = document.createElement('a');
  postPageLink.href = `./html/blogpost.html?postId=${post.id}`;

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

  const heading = document.createElement('h1');
  const headingSpan = document.createElement('span');
  headingSpan.textContent = post.title;
  heading.appendChild(headingSpan);

  const author = document.createElement('h3');
  const authorSpan = document.createElement('span');
  const userName = localStorage.getItem('userName');
  authorSpan.textContent = userName ? `By: ${userName}` : 'By: Kittypoda';
  author.appendChild(authorSpan);

  overlay.append(heading, author);

  mediaContainer.appendChild(image);
  mediaContainer.appendChild(overlay);
  postPageLink.appendChild(mediaContainer);
  item.appendChild(postPageLink);

  return item;
}

async function renderCarousel() {
  const carouselInner = document.getElementById('carousel-inner');
  const userName = JSON.parse(localStorage.getItem('userName'));
  const apiUrl = userName ? apiUserurl : notLogin;

  const posts = await fetchLatestPosts(apiUrl);

  posts.forEach(post => {
    const carouselItem = createCarouselItem(post);
    carouselInner.appendChild(carouselItem);
  });

  startCarousel();
}

function startCarousel() {
  const carouselInner = document.getElementById('carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  let index = 0;

  setInterval(() => {
    index = (index + 1) % items.length;
    const offset = -index * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
  }, 4000);
}

renderCarousel();
