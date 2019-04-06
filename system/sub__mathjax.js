MathJax.Ajax.config.path["mhchem"] = "https://cdnjs.cloudflare.com/ajax/libs/mathjax-mhchem/3.3.0";
MathJax.Hub.Config({
  HTML: ["input/TeX", "output/HTML-CSS"],
  TeX: {
    extensions: ["AMSmath.js", "AMSsymbols.js"],
    equationNumbers: {
      autoNumber: "AMS"
    }
  },
  extensions: ["tex2jax.js", "[mhchem]/mhchem.js"],
  jax: ["input/TeX", "output/HTML-CSS"],
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ['$$', '$$'],
      ["\\[", "\\]"]
    ],
    processEscapes: true
  },
  "HTML-CSS": {
    fonts: ["TeX"],
    mtextFontInherit: true, // use inherit font
    showMathMenu: false, // turn off context
    linebreaks: {
      automatic: true
    }
  }
});
