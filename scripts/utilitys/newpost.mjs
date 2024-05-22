import { apiUserurl } from "./api.mjs";

const newPostForm = document.getElementById('newpost');

newPostForm.addEventListener('submit', async (event) => { event.preventDefault();

  const title = document.getElementById('title').value;
  const body = document.getElementById('text').value;
  const media = document.getElementById('media').value;

  const token = localStorage.getItem('accessToken');

  const postData = {
    method: 'POST',
    body: JSON.stringify({
    title,body,
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

