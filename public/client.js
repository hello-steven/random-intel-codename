(function () {
  // define variables that reference elements on our page
  function getNewName () {
    let name = axios.get('/kebab')
    .then(function (res) {
      let newColor = randomColor();
      displayName.style.background = 'hsla(' + newColor + ', 100%, 76%, 1)';
      copyName.value = res.data;
      clipboardValue.value = res.data;
    })
    // TODO: parse data
    .catch(function (error) {
      console.log(error);
    });
  }

  function randomColor () {
    return Math.floor(Math.random() * (360 - 1 + 1) + 1);
  }

  let copyText = function () {
    const copyText = document.getElementById('copy_name');
    copyText.select();
    try {
      let successful = document.execCommand('copy');
      console.log('copied');
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  };

  const displayName = document.getElementById('display_name');
  const copyName = document.getElementById('copy_name');
  const getName = document.getElementById('get_name');
  const clipboardValue = document.getElementById('copy_kebab');

  getNewName();
  getName.addEventListener('click', function () {
    getNewName();
  });
  clipboardValue.addEventListener('click', function () {
    copyText();
  });
})();
