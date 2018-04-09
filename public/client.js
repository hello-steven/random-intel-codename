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
    console.log({
      event: event,
      getName: true
    })
    let currentTime = new Date();
    displayName.innerHTML = '<p>Ax Wiki <br>' + currentTime + '</p>';
  });
})();
