import { renderHomePage } from "./index.mjs";

renderHomePage(false,true);

document.getElementById('logout-button').addEventListener('click', () => {
  // Clear local storage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userName');
  // Redirect to the login page
  window.location.href = './login.html';
});