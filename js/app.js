/* Christopher Bernhard
ICT 4510
2/14/2021
username: cbernhard
password: ict4510@pp
The web page takes a username and password, 
If correct returns an user object and allows the user to proceed.
If the password is incorrect a message is displayed to try again
*/

"use strict"

// global variables
const loginForm = document.querySelector('#login-form');
const spinner = document.querySelector('#spinner');
const errorMessage = document.querySelector('#error-message');

// event listener for the Form
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  sessionStorage.clear();
  showSpinner()
  loginForm.classList.add('hidden');
  handleData();
})

// get and send form data function
async function sendFormData() {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
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
  try {
    const response = await fetch(url, formData);
    return response;
  } catch (error) {
    console.log(error)
  }
}

// check the response status and run the display HTML function if success or display an error message
async function handleData() {
  const status = (await sendFormData()).status;
  if (status >= 200 && status <= 300) {
    const data = await sendFormData();
    const userData = await data.json();
    sessionStorage.setItem('userData', JSON.stringify(userData));
    displayDataHtml();

  } else {
    hideSpinner();
    showErrorHtml();
    console.log(`there was an issue ${status}`);
  }
}

// display the welcome HTML
const displayDataHtml = () => {
  const messageContainer = document.querySelector('#message-container');
  hideSpinner();
  messageContainer.classList.remove('hidden');
  messageContainer.classList.add('d-flex');
  const firstName = JSON.parse(sessionStorage.getItem('userData')).user.first_name;
  const messageContainerHtml = `
  <div class="border border-dark rounded-3 py-5 px-3 message">
    <p class="fs-1 fw-light text-center">Hello ${firstName}</p>
    <p class="fs-3 fw-light text-center mb-4">You May Enter The Best Website Ever!</p>
    <div class="d-grid gap-2">
      <a href="#" class="btn btn-outline-dark fs-6 fw-light" id="enter-button">Enter</a>
    </div>
  </div>
  `;
  messageContainer.innerHTML = messageContainerHtml;
}

const showSpinner = () => {
  spinner.classList.remove('hidden');
  spinner.classList.add('d-flex');
}

const hideSpinner = () => {
  spinner.classList.remove('d-flex');
  spinner.classList.add('hidden');
}

const showErrorHtml = () => {
  errorMessage.classList.remove('hidden');
  loginForm.classList.remove('hidden');
}