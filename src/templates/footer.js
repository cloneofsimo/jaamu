import React from "react";


const katex_foot = String.raw`
<script>renderMathInElement(document.body, {
  delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
    ],
  strict : "ignore",
  });
</script>
`;

const Footer = () => {
  return (
      <div dangerouslySetInnerHTML={{ __html: katex_foot }} />
  );
};

export default Footer;
