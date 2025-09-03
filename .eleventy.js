const process = require("process");

module.exports = function (eleventyConfig) {
  const design = process.env.DESIGN || "retro";
  const designDir = `designs/${design}`;

  eleventyConfig.addPassthroughCopy({ [`${designDir}/styles`]: "styles" });
  eleventyConfig.addPassthroughCopy({ [`${designDir}/images`]: "images" });
  eleventyConfig.addPassthroughCopy({ ["static"]: "/" });

  return {
    dir: {
      input: "src",
      includes: `../${designDir}/templates`,
      output: "_site",
    },
  };
};
