import { apiUserurl } from "./api.mjs";
import { doFetch } from "./doFetch.mjs";


async function fetchLatestPosts() {
  try {
    const responseData = await doFetch(apiUserurl);
    if (responseData && responseData.data) {
      const posts = responseData.data.slice(0, 3); // Get the latest three posts
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

  overlay.appendChild(heading);
  mediaContainer.appendChild(image);
  mediaContainer.appendChild(overlay);
  postPageLink.appendChild(mediaContainer);
  item.appendChild(postPageLink);

  return item;
}

async function renderCarousel() {
  const carouselInner = document.getElementById('carousel-inner');
  const posts = await fetchLatestPosts();

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