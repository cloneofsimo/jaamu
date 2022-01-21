const fs = require("fs");


const parseFirstP = (htmlContent) =>{
  const firstP = htmlContent.split("<p>")[1].split("</p>")[0];
  // firstP is form of !key:value\n!key:value... parse it
  const firstPObj = {};
  const firstPArr = firstP.split("\n");
  firstPArr.forEach((line) => {
    const key = line.split(":")[0];
    const value = line.split(":")[1];
    firstPObj[key] = value;
  }
  );
  return firstPObj;
}

const after4divs = (htmlContent) => {
  const divs = htmlContent.split("</div>");
  const after5divs = divs.slice(4);
  const after5divsStr = after5divs.join("</div>");
  return after5divsStr;
}




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
          htmlArgs : parseFirstP(htmlContent),
          htmlContent : after4divs(htmlContent),
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
