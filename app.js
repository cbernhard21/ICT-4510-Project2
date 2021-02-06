/* Christopher Bernhard
ICT 4510
2/14/2021 */


"use strict"

const loginForm = document.querySelector('#login-form');
const messageContainer = document.querySelector('#message-container');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const userName = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const url = 'https://jsonplaceholder.typicode.com/posts';

  const formPostData = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      userName: userName,
      password: password
    }),
  };

  fetch(url, formPostData)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return res.json();
      }
    })
    .then((user) => {
      sessionStorage.setItem('user', JSON.stringify(user));
      console.log(user);
      displayDataHtml();
    })
    .catch(error => {
      console.log(error, 'there was an error')
    });

})


const displayDataHtml = () => {
  loginForm.classList.add('invisible');
  const userName = JSON.parse(sessionStorage.getItem('user')).userName;
  messageContainer.innerHTML = `<p class="fs-2 text-center">Hello ${userName}</p>
  <p class="fs-2 text-center mb-4">You May Enter The Record Exchange</p>
  <a href="#" class="text-center btn btn-outline-primary fs-4" id="my-button">Enter</a>
  `;
}