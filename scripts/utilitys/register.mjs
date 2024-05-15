import { apiRegisterAccount } from "./api.mjs";

 async function registerUser(url, userData) {
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
      localStorage.setItem('userName',JSON.stringify(json.data.name))
      console.log (json.data.name)
      return json;
  } catch (error) {
      console.error('Registration failed:', error);
  }
}

const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
  }

  const userData = {
      name,
      email,
      password,
  };
console.log(userData)

  const result = await registerUser(apiRegisterAccount, userData);
  console.log('Registration result:', result);
});