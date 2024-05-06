fetch('https://v2.api.noroff.dev/blog/posts/<name>', {
  method: 'GET',
})
  .then((response) => response.json())
  .then((json) => console.log(json));