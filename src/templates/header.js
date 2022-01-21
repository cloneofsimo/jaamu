import React from "react";

const htmlx = String.raw`
<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.6/katex.min.css"
></link>
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.6/katex.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.6/contrib/auto-render.min.js"></script>
<script src="https://requirejs.org/docs/release/2.3.5/minified/require.js"></script>
<style type="text/css">
pre { line-height: 125%;}
td.linenos .normal { color: inherit; background-color: transparent; padding-left: 5px; padding-right: 5px; }
span.linenos { color: inherit; background-color: transparent; padding-left: 5px; padding-right: 5px; }
td.linenos .special { color: #000000; background-color: #ffffc0; padding-left: 5px; padding-right: 5px; }
span.linenos.special { color: #000000; background-color: #ffffc0; padding-left: 5px; padding-right: 5px; }
</style>`;

const Header = () => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlx }} />
    </div>
  );
};

export default Header;
