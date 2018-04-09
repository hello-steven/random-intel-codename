(function () {
  console.log('client changes');
  // define variables that reference elements on our page
  function getNewName () {
    let name = axios.get('/name')
    .then(function (res) {
      displayName.innerHTML = '<p>' + res.data + '</p>';
      console.log({
        event: event,
        getName: true,
        name: res.data
      });
    })
      // TODO: parse data
    .catch(function (error) {
      console.log(error);
    });
  }
  const displayName = document.getElementById('display_name');
  const getName = document.getElementById('get_name');
  console.log({
    displayName: displayName,
    getName: getName
  });
  getNewName();
  getName.addEventListener('click', function (event) {
    getNewName();
  });
})();
