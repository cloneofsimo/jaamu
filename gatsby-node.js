const fs = require("fs");

const parseMetadata = (content) => {
  const metadata = {};
  content.split("\n").forEach((line) => {
    const key = line.split(":")[0];
    const value = line.split(":").slice(1).join(":").trim();
    metadata[key] = value;
  });
  return metadata;
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
  const all_notebooks = [];
  notebooks.forEach((notebook) => {
    const filepath = `./src/notebooks/compiled_htmls/${notebook}`;
    const name = notebook.split(".")[0];
    const tocContent = fs.readFileSync(
      `./src/notebooks/meta/${name}.json`,
      "utf8"
    );
    const tocJson = JSON.parse(tocContent);
    const fileCreatedDate = fs.statSync(filepath).birthtime;
    const createdDate = fileCreatedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const metadata = {
      type: notebook.split(".")[1],
    };

    let content = fs.readFileSync(filepath, "utf8");
    if (metadata.type === "html") {
      Object.assign(
        metadata,
        parseMetadata(content.split("<p>")[1].split("</p>")[0])
      );
      content = afterdivs(content);
    } else if (metadata.type === "md") {
      Object.assign(metadata, parseMetadata(content.split("\n\n")[0]));
      content = content.split("\n\n").slice(1).join("\n\n");
    } else {
      console.log("Unknown file type");
    }

    const args = {
      createdDate,
      name: `/notes/${name}`,
      ...metadata,
    };

    all_notebooks.push(args);
    createPage({
      path: `/notes/${name}`,
      component: require.resolve("./src/templates/notebooksTemplates.tsx"),
      context: {
        route: `/notes/${name}`,
        args,
        content,
        tocList: tocJson["TOC"],
      },
    });
  });

  createPage({
    path: `/`,
    component: require.resolve("./src/templates/index.tsx"),
    context: {
      allNotebooks: all_notebooks,
    },
  });
};
