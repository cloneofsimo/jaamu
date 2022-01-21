const fs = require("fs");

exports.createPages = async ({actions }) => {
  const { createPage } = actions;
  // read html files from ./src/notebooks/
  const notebooks = fs.readdirSync("./src/notebooks/compiled_htmls");
  console.log(notebooks);
  notebooks.forEach((html) => {
    if (html.endsWith(".html")) {
      const htmlPath = `./src/notebooks/compiled_htmls/${html}`;
      const htmlContent = fs.readFileSync(htmlPath, "utf8");
      //console.log(htmlContent);
      const htmlName = html.replace(".html", "");
      createPage({
        path: `/notes/${htmlName}`,
        component: require.resolve("./src/templates/notebooksTemplates.js"),
        context: {
          htmlName : htmlName,
          htmlContent : htmlContent,
        },
      });
    }
  });
}

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
