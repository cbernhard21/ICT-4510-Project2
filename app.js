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
  sessionStorage.clear();

  showSpinner()

  // hide form to see spinner
  loginForm.classList.add('hidden');

  // get values from form
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  // url endpoint and object to send to the api
  const url = 'https://ict4510.herokuapp.com/api/login';
  const formData = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      username: username,
      password: password
    }),
  };
  // send login data
  sendFormData(url, formData)
})

// function to display the success message
const displayDataHtml = () => {
  const messageContainer = document.querySelector('#message-container');

  hideSpinner();

  // show the div with the message in it 
  messageContainer.classList.remove('hidden');
  messageContainer.classList.add('d-flex');

  // get user object from storage and display the first name and message 
  const firstName = JSON.parse(sessionStorage.getItem('data')).user.first_name;
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

function showSpinner() {
  spinner.classList.remove('hidden');
  spinner.classList.add('d-flex');
}

function hideSpinner() {
  spinner.classList.remove('d-flex');
  spinner.classList.add('hidden');
}

function sendFormData(url, formData) {
  fetch(url, formData)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        console.log('Looks like there was a problem. Status Code ' + res.status);
      }
    })
    .then((data) => {
      sessionStorage.setItem('data', JSON.stringify(data));
      displayDataHtml();
    })
    .catch(error => {
      console.log(error, 'there was an error')
    });
}