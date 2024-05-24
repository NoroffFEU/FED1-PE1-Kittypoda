import { apiUserurl } from "./api.mjs";

const newPostForm = document.getElementById('newpost');

newPostForm.addEventListener('submit', async (event) => { event.preventDefault();

  const title = document.getElementById('title').value;
  const body = document.getElementById('text').value;
  const mediaimg = document.getElementById('media').value;
  const mediaalt = document.getElementById('media-alt').value;
  
  

  const token = localStorage.getItem('accessToken');

  const postData = {
    method: 'POST',
    body: JSON.stringify({
    title: title,
    body: body,
    media: {
      url: mediaimg,
      alt: mediaalt,
    },

    }),
    headers: {
      'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`,
    },
    
    };

    fetch(apiUserurl,postData)
    .then((response) => response.json())
    .then((json) => console.log(json));


})

