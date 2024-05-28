import { apiLogin } from "./api.mjs";

async function loginUser(url, userData) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    const accessToken = json.data.accessToken;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userName',JSON.stringify (json.data.name))
    
    return json;
  } catch (error) {
    throw error;
  }
}

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = {
    email,
    password,
  };

  try {
    const result = await loginUser(apiLogin, userData);
    window.location.href = './admin.html';
  } catch (error) {
    alert('Login failed. Please check your credentials.');
  }
});

