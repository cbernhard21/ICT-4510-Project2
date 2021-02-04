const loginForm = document.querySelector('#login-form');
const messageContainer = document.querySelector('#message-container');


async function handleData() {
  const userName = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const url = 'https://jsonplaceholder.typicode.com/posts';

  const formPostData = {
    method: 'POST',
    body: JSON.stringify({
      userName: userName,
      password: password
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  };
  try {
    const fetchRequest = await fetch(url, formPostData);
    const response = await fetchRequest.json();
    const data = await response;
    displayDataHtml(data);

  } catch (err) {
    console.log(err)
  }
};

const displayDataHtml = ({ userName, password }) => {
  loginForm.classList.add('hidden');
  messageContainer.innerHTML = `<p>Hello ${userName}</p>`;
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  handleData();
})