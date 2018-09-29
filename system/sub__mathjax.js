MathJax.Ajax.config.path["mhchem"] = "https://cdnjs.cloudflare.com/ajax/libs/mathjax-mhchem/3.3.0";
MathJax.Hub.Config({
  HTML: ["input/TeX", "output/SVG"],
  TeX: {
    extensions: ["AMSmath.js", "AMSsymbols.js"],
    equationNumbers: {
      autoNumber: "AMS"
    }
  },
  extensions: ["tex2jax.js", "[mhchem]/mhchem.js"],
  jax: ["input/TeX", "output/SVG"],
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
    availableFonts: ["TeX"],
    linebreaks: {
      automatic: true
    }
  }
});
