export default (services) => () => {
  let R = services.R;
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

  let createFoswigChain = (wordArr) => {
    var chain = new services.Foswig(2);
    wordArr = wordArr.reduce((arr, str) => {
      let parts = str.split(" ");
      return arr.concat(parts);
    }, []);
    wordArr = wordArr.filter(word => word.length > 2);
    chain.addWordsToChain(wordArr);
    return {
      randomWord: () => chain.generateWord(5,15,true, 1000)
    }
  }

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
      let foswigAPI = createFoswigChain(names);
      /**
       * Get a random intel code name
       * @return {object} { name: 'App Name', kebabCase: 'app-name'
       */
      let getName = () => names[Math.floor(Math.random()*names.length)];
      let getKebabCase = () => {
        let name = getName();
        return toKebabCase(name);
      };
      let getShuffledName = () => {
        let name = foswigAPI.randomWord();
        return toKebabCase(name);
      };

      return {
        getName: getName,
        getKebabCaseName : getKebabCase,
        getShuffledName: getShuffledName
      };
    });
};

