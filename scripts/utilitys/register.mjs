import { apiRegisterAccount } from "./api.mjs";

async function registerUser (url, userData) {
try{
  const postData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };

  const response = await fetch (url, postData);
  const json = await response.json();
  return json;
} catch (error) {
}
}

const user = {
  name: 'oda',
  email:'oda@noroff.no',
  password: 'my-password',
}
console.log(user);

registerUser (apiRegisterAccount, user)

