import axios from 'axios';

const randomColor = () => {
  let randomHue = Math.floor(Math.random() * (360 - 1 + 1) + 1);
  return `hsla(${randomHue}, 100%, 76%, 1)`;
}

const wrapperEl = document.getElementById('display_name');
const inputEl = document.getElementById('copy_name');
const getNameBtnEl = document.getElementById('get_name');
const copyBtnEl = document.getElementById('copy_kebab');

const getNewName = () => {
  axios.get('/kebab')
    .then(res => {
      wrapperEl.style.background = randomColor();
      inputEl.value = res.data;
      copyBtnEl.value = res.data;
    })
}

const copyText = () => {
  inputEl.select();
  try {
    let successful = document.execCommand('copy');
    console.log('copied');
  } catch (err) {
    console.log('Oops, unable to copy');
  }
};

// attach event handlers
getNameBtnEl.addEventListener('click', () => {
  getNewName();
});
copyBtnEl.addEventListener('click', () => {
  copyText();
});

// init get name
getNewName();

