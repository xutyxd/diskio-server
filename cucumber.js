module.exports = {
    default: [
      "--require-module ts-node/register",
    //   "--require features/**/*.ts",
      "--require tests/functionals/**/**/*.ts",
    //   "--publish-quiet",
    ].join(" "),
  };
  