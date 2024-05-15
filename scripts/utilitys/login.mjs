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
    const accessToken = json.accessToken;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userName',JSON.stringify (json.data.name))
    console.log(json.data.name)
    
    

    return json;
  } catch (error) {
    throw error;
  }
}

// Handle form submission
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
    // Call loginUser function with API URL and user data
    const result = await loginUser(apiLogin, userData);
    // Redirect or perform actions upon successful login
    console.log('Registration result:', result);
  } catch (error) {
    // Handle login error
    alert('Login failed. Please check your credentials.');
  }
});

