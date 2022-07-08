const moment = require('moment');
const mdIt = require('markdown-it')('commonmark');
const renderScss = require("./config/sass")

module.exports = function(eleventyConfig) {
  // Process SCSS
  eleventyConfig.addWatchTarget("./src/scss");
  eleventyConfig.on("beforeBuild", () => {
    renderScss("main");
  });

  // Files and folders to direct copy to dist/
  eleventyConfig.addPassthroughCopy("src/imgs");
  eleventyConfig.addPassthroughCopy("src/blog/imgs");
  eleventyConfig.addPassthroughCopy("src/resources");
  eleventyConfig.addPassthroughCopy("src/scripts");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  

  // Shortcodes

  eleventyConfig.addShortcode("bodyClass", function(slug) {
    const suffix = slug.length ? slug : "home";
    return `page-${suffix}`;
  });

  // Filters
  eleventyConfig.addFilter("formatDate", function(value, format) {
    format = format || 'MMMM Do, YYYY';
    return moment(value).format(format);
  });

  eleventyConfig.addFilter("parseMarkdown", function(value) {
    return mdIt.render(value);
  });

  eleventyConfig.addFilter("trimWordLengthTo", function(value, len) {
    var length = len || 100;
    return value.split(' ', length).join(' ') + '...';
  });

  eleventyConfig.addFilter("urlencode", function(value) {
    return encodeURIComponent(value);
  });

  // Front-matter options
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->"
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts"
    }
  };
};
