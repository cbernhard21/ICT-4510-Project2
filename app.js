/* Christopher Bernhard
ICT 4510
2/14/2021
username: cbernhard
password: ict4510@pp
The web page takes a username and password, 
if correct returns an user object and allows the user to proceed.
*/

"use strict"

const loginForm = document.querySelector('#login-form');
const spinner = document.querySelector('#spinner');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // show spinner while loading 
  spinner.classList.remove('hidden');
  spinner.classList.add('d-flex');

  // hide form to see spinner
  loginForm.classList.add('hidden');

  // get values from form
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  // url endpoint and object to send to the api
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

  // send the login in data 
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

// function to display the success message
const displayDataHtml = () => {
  const messageContainer = document.querySelector('#message-container');
  // hide spinner
  spinner.classList.remove('d-flex');
  spinner.classList.add('hidden');

  // show the div with the message in it 
  messageContainer.classList.remove('hidden');
  messageContainer.classList.add('d-flex');

  // get user object from storage and display the first name and message 
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