/* Christopher Bernhard
ICT 4510
2/14/2021
username: cbernhard
password: ict4510@pp
The web page takes a username and password, if correct returns an user object and allows the user to 
proceed.
*/

"use strict"

const loginForm = document.querySelector('#login-form');
const messageContainer = document.querySelector('#message-container');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const url = 'https://ict4510.herokuapp.com/api/login';

  const formPostData = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      username: username,
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
      displayDataHtml();
    })
    .catch(error => {
      console.log(error, 'there was an error')
    });
})

const displayDataHtml = () => {
  loginForm.classList.add('invisible');
  const firstName = JSON.parse(sessionStorage.getItem('user')).user.first_name;
  const messageContainerHtml = `
  <div class="border border-dark rounded-3 py-5 px-3 message">
    <p class="fs-1 fw-light text-center">Hello ${firstName}</p>
    <p class="fs-3 fw-light text-center mb-4">You May Enter The Best Website Ever!</p>
    <div class="d-grid gap-2">
      <a href="#" class="btn btn-outline-dark fs-6 fw-light">Enter</a>
    </div>
  </div>
  `;
  messageContainer.innerHTML = messageContainerHtml;
}