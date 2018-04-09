export default (services) => () => {
  return services.axios.get('https://en.wikipedia.org/wiki/List_of_Intel_codenames')
    .then(function (res) {
      return res.data;
    })
      // TODO: parse data
    .catch(function (error) {
      console.log(error);
    });
}

