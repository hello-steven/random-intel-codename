(function () {
  console.log('client changes');
  // define variables that reference elements on our page
  const displayName = document.getElementById('display_name');
  const getName = document.getElementById('get_name');
  console.log({
    displayName: displayName,
    getName: getName
  });
  displayName.innerHTML = '<p>Ax Wiki</p>';
  getName.addEventListener('click', function (event) {
    let names = axios.get('/name')
    .then(function (res) {
      return res.data;
    })
      // TODO: parse data
    .catch(function (error) {
      console.log(error);
    });
    let currentTime = new Date();
    console.log({
      event: event,
      getName: true,
      names: names
    });
    displayName.innerHTML = '<p>Ax Wiki <br>' + currentTime + '</p>';
  });
})();
