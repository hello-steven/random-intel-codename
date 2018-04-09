export default (services) => () => {
  let R = services.R;
  let getNames = services.axios.get('https://en.wikipedia.org/wiki/List_of_Intel_codenames')
    .then(function (res) {
      let html = res.data;
      // TODO: load backup html here
      const dom = new services.jsdom(html);
      const tds = Array.from(dom.window.document.querySelectorAll('.wikitable.sortable tr > td:first-child'));
      return tds.map(td => td.textContent);
    });
  let toKebabCase = R.pipe(
    str => str.trim(),
    str => str.toLowerCase(str),
    str => str.replace(/ /g, '-')
  );
  let getName = () => getNames
    .then(names => {
      let name = names[Math.floor(Math.random()*names.length)];
      return {
        name: name,
        kebabCase: toKebabCase(name)
      };
    });
  return {
    getName: getName,
    toKebabCase : toKebabCase
  };
};

