import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";
import Container from "./chakra/container";

const italic = "italic";
const bold = "bold";
const BASEMARGIN = "1.0rem";
const colorset = {
  ".c": { color: "408080", fontStyle: italic } /* Comment */,
  ".err": { border: "1px solid FF0000" } /* Error */,
  ".k": { color: "008000", fontWeight: bold } /* Keyword */,
  ".o": { color: "666666" } /* Operator */,
  ".ch": { color: "408080", fontStyle: italic } /* Comment.Hashbang */,
  ".cm": { color: "408080", fontStyle: italic } /* Comment.Multiline */,
  ".cp": { color: "BC7A00" } /* Comment.Preproc */,
  ".cpf": { color: " 408080", fontStyle: italic } /* Comment.PreprocFile */,
  ".c1": { color: "408080", fontStyle: italic } /* Comment.Single */,
  ".cs": { color: "408080", fontStyle: italic } /* Comment.Special */,
  ".gd": { color: "A00000" } /* Generic.Deleted */,
  ".ge": { fontStyle: "italic" } /* Generic.Emph */,
  ".gr": { color: "FF0000" } /* Generic.Error */,
  ".gh": { color: "000080", fontWeight: bold } /* Generic.Heading */,
  ".gi": { color: "00A000" } /* Generic.Inserted */,
  ".go": { color: "888888" } /* Generic.Output */,
  ".gp": { color: "000080", fontWeight: bold } /* Generic.Prompt */,
  ".gs": { fontWeight: bold } /* Generic.Strong */,
  ".gu": { color: "800080", fontWeight: bold } /* Generic.Subheading */,
  ".gt": { color: "0044DD" } /* Generic.Traceback */,
  ".kc": { color: "008000", fontWeight: bold } /* Keyword.Constant */,
  ".kd": { color: "008000", fontWeight: bold } /* Keyword.Declaration */,
  ".kn": { color: "008000", fontWeight: bold } /* Keyword.Namespace */,
  ".kp": { color: "008000" } /* Keyword.Pseudo */,
  ".kr": { color: "008000", fontWeight: bold } /* Keyword.Reserved */,
  ".kt": { color: "B00040" } /* Keyword.Type */,
  ".m": { color: "666666 " } /* Literal.Number */,
  ".s": { color: "BA2121 " } /* Literal.String */,
  ".na": { color: "7D9029" } /* Name.Attribute */,
  ".nb": { color: "008000" } /* Name.Builtin */,
  ".nc": { color: "0000FF", fontWeight: bold } /* Name.Class */,
  ".no": { color: "880000" } /* Name.Constant */,
  ".nd": { color: "AA22FF" } /* Name.Decorator */,
  ".ni": { color: "999999", fontWeight: bold } /* Name.Entity */,
  ".ne": { color: "D2413A", fontWeight: bold } /* Name.Exception */,
  ".nf": { color: "0000FF" } /* Name.Function */,
  ".nl": { color: "A0A000" } /* Name.Label */,
  ".nn": { color: "0000FF", fontWeight: bold } /* Name.Namespace */,
  ".nt": { color: "008000", fontWeight: bold } /* Name.Tag */,
  ".nv": { color: "19177C" } /* Name.Variable */,
  ".ow": { color: "AA22FF", fontWeight: bold } /* Operator.Word */,
  ".w": { color: "bbbbbb " } /* Text.Whitespace */,
  ".mb": { color: "666666" } /* Literal.Number.Bin */,
  ".mf": { color: "666666" } /* Literal.Number.Float */,
  ".mh": { color: "666666" } /* Literal.Number.Hex */,
  ".mi": { color: "666666" } /* Literal.Number.Integer */,
  ".mo": { color: "666666" } /* Literal.Number.Oct */,
  ".sa": { color: "BA2121" } /* Literal.String.Affix */,
  ".sb": { color: "BA2121" } /* Literal.String.Backtick */,
  ".sc": { color: "BA2121" } /* Literal.String.Char */,
  ".dl": { color: "BA2121" } /* Literal.String.Delimiter */,
  ".sd": { color: "BA2121", fontStyle: italic } /* Literal.String.Doc */,
  ".s2": { color: "BA2121" } /* Literal.String.Double */,
  ".se": { color: "BB6622", fontWeight: bold } /* Literal.String.Escape */,
  ".sh": { color: "BA2121" } /* Literal.String.Heredoc */,
  ".si": { color: "BB6688", fontWeight: bold } /* Literal.String.Interpol */,
  ".sx": { color: "008000" } /* Literal.String.Other */,
  ".sr": { color: "BB6688" } /* Literal.String.Regex */,
  ".s1": { color: "BA2121" } /* Literal.String.Single */,
  ".ss": { color: "19177C" } /* Literal.String.Symbol */,
  ".bp": { color: "008000" } /* Name.Builtin.Pseudo */,
  ".fm": { color: "0000FF" } /* Name.Function.Magic */,
  ".vc": { color: "19177C" } /* Name.Variable.Class */,
  ".vg": { color: "19177C" } /* Name.Variable.Global */,
  ".vi": { color: "19177C" } /* Name.Variable.Instance */,
  ".vm": { color: "19177C" } /* Name.Variable.Magic */,
  ".il": { color: "666666" } /* Literal.Number.Integer.Long */,
  p: { color: "333333" } /* Literal.Number.Integer.Long */,
};

function invertHex(hex) {
  return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();
}
function objectMap(object, mapFn) {
  return Object.keys(object).reduce(function (result, key) {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
}

const breakpoints = createBreakpoints({
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "3xl": "1920px",
});

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const darkblue = "#0B3B8C";
const darkdarkblue = "#060922";
const lightblue = "#E6E6FF";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      root: {
        backgroundColor: props.colorMode === "dark" ? darkblue : "white",
        color: props.colorMode === "dark" ? "white" : "blue",
      },

      // div: {
      //   backgroundColor: props.colorMode === "dark" ? darkblue : "white",
      //   //color: props.colorMode === "dark" ? darkblue : "white",
      // },

      "div.navitem": {
        backgroundColor: props.colorMode === "dark" ? darkdarkblue : lightblue,
      },
      ".navbar": {
        backgroundColor: props.colorMode === "dark" ? darkblue : "white",
      },

      body: {
        fontSize: "18px",
        color: props.colorMode === "dark" ? "white" : darkblue,
        backgroundColor: props.colorMode === "dark" ? darkblue : "white",
        lineHeight: "tall",
      },
      span: {
        color: props.colorMode === "dark" ? "white" : darkblue,
      },
      ".hll": {
        backgroundColor: mode("#F0F0F0", "#A0A0A0")(props),
      },
      ".highlight": {
        background: mode("#F0F0F0", "#303030")(props),
      },
      ul: {
        listStyle: "circle",
        paddingLeft: "2em",
      },
      pre: {
        marginTop: BASEMARGIN,
        marginBottom: BASEMARGIN,
        display: "block",
        padding: "8.5px",
        wordBreak: "break-all",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        color: props.colorMode === "dark" ? "white" : darkblue,
      },
      "div.twitter-tweet": {
        margin: "0 auto",
      },
      "a.toc-a": {
        "&:hover": {
          color: props.colorMode === "dark" ? "lightblue" : darkblue,
          fontWeight: "bold",
        },
      },

      //table html
      table: {
        marginTop: BASEMARGIN,
        marginBottom: BASEMARGIN,
        //center table
        border:
          props.colorMode === "dark" ? "1px solid white" : "1px solid black",
        borderCollapse: "collapse",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
      },
      "div.output th, div.output td, div.output tr": {
        //center table
        padding: "5px",
        border:
          props.colorMode === "dark" ? "1px solid white" : "1px solid black",
      },
      ".output_html": {
        color: props.colorMode === "dark" ? "white" : darkblue,
        // center element
        margin: "auto",
      },
      iframe: {
        margin: "0 auto",
      },
      h1: {
        marginTop: BASEMARGIN,
        marginBottom: BASEMARGIN,
        fontSize: "2.5em",
        fontWeight: "bold",
        color: props.colorMode === "dark" ? "white" : darkblue,
      },
      h2: {
        marginTop: BASEMARGIN,
        marginBottom: BASEMARGIN,
        fontSize: "2em",
        fontWeight: "bold",
        color: props.colorMode === "dark" ? "white" : darkblue,
      },
      h3: {
        marginTop: BASEMARGIN,
        marginBottom: BASEMARGIN,
        fontSize: "1.5em",
        fontWeight: "bold",
        color: props.colorMode === "dark" ? "white" : darkblue,
      },
      h4: {
        marginTop: BASEMARGIN,
        marginBottom: BASEMARGIN,
        fontSize: "1.25em",
        fontWeight: "bold",
        color: props.colorMode === "dark" ? "white" : darkblue,
      },

      ...objectMap(colorset, function (val) {
        return {
          color: mode("#" + val.color, "#" + invertHex(val.color))(props),
          fontWeight: val.fontWeight || "normal",
          fontStyle: val.fontStyle || "normal",
        };
      }),
    }),
  },
  components: {
    Container,
  },
  breakpoints,
  config,
});

export default theme;
