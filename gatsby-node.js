const fs = require("fs");

const parseFirstP = (htmlContent) => {
  const firstP = htmlContent.split("<p>")[1].split("</p>")[0];
  // firstP is form of !key:value\n!key:value... parse it
  const firstPObj = {};
  const firstPArr = firstP.split("\n");
  firstPArr.forEach((line) => {
    const key = line.split(":")[0];
    // rest of line is value
    const value = line.split(":").slice(1).join(":");
    firstPObj[key] = value;
  });
  return firstPObj;
};

const afterdivs = (htmlContent) => {
  const divs = htmlContent.split("</div>");
  const afdiv = divs.slice(3);
  const afdivStr = afdiv.join("</div>");
  return afdivStr;
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  // read html files from ./src/notebooks/
  const notebooks = fs.readdirSync("./src/notebooks/compiled_htmls");
  console.log(notebooks);
  const all_notebooks = [];
  notebooks.forEach((html) => {
    if (html.endsWith(".html")) {
      const htmlPath = `./src/notebooks/compiled_htmls/${html}`;
      
      const htmlContent = fs.readFileSync(htmlPath, "utf8");
      
      //console.log(htmlContent);
      const htmlName = html.replace(".html", "");

      const tocPath = `./src/notebooks/meta/${htmlName}.json`;
      const tocContent = fs.readFileSync(tocPath, "utf8");
      const tocJson = JSON.parse(tocContent);

      const args = parseFirstP(htmlContent);
      args["htmlName"] = `/notes/${htmlName}`;
      all_notebooks.push(args);
      createPage({
        path: `/notes/${htmlName}`,
        component: require.resolve("./src/templates/notebooksTemplates.js"),
        context: {
          htmlArgs: args,
          htmlContent: afterdivs(htmlContent),
          tocList: tocJson['TOC'],
        },
      });
    }
  });

  createPage({
    path: `/`,
    component: require.resolve("./src/templates/index.js"),
    context: {
      allNotebooks: all_notebooks,
    },
  });
};

// const getNotebooks = () =>{

// }

// exports.createPages = async ({ actions: { createPage } }) => {
//   // `getPokemonData` is a function that fetches our data
//   const allPokemon = await getNotebooks();

//   // Create a page that lists all Pokémon.
//   createPage({
//     path: `/`,
//     component: require.resolve("./src/templates/all-pokemon.js"),
//     context: { allPokemon },
//   })

//   // Create a page for each Pokémon.
//   allPokemon.forEach(pokemon => {
//     createPage({
//       path: `/pokemon/${pokemon.name}/`,
//       component: require.resolve("./src/templates/pokemon.js"),
//       context: { pokemon },
//     })
//   })
// }
