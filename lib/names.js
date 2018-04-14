export default (services) => () => {
  let R = services.R;
  // request the page from wikipedia that has these names
  return services.axios.get('https://en.wikipedia.org/wiki/List_of_Intel_codenames')
  // scrape the names from the html returned by wikipedia
    .then(res => {
      let html = res.data;
      const dom = new services.jsdom(html);
      const tds = Array.from(dom.window.document.querySelectorAll('.wikitable.sortable tr > td:first-child'));
      return tds.map(td => td.textContent);
    })
    // return functions to allow access to these names
    .then(names => {
      /**
       * Convert work to kebab case
       * @param {string} App Name
       * @returns {string} app-name
       */
      let toKebabCase = R.pipe(
        str => str.trim(),
        str => str.toLowerCase(str),
        str => str.replace(/ /g, '-')
      );

      /**
       * Get a random intel code name
       * @return {object} { name: 'App Name', kebabCase: 'app-name'
       */
      let getName = () => {
        let name =  names[Math.floor(Math.random()*names.length)];
        return {
          name: name,
          kebabCase: toKebabCase(name)
        };
      };

      return {
        getName: getName,
        toKebabCase : toKebabCase
      };
    });
};

