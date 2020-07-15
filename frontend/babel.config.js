module.exports = function (api) {
  api.cache(false);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: ">= 1%, dead",
        useBuiltIns: "usage",
        corejs: { version: 3, proposals: true },
        modules: false,
      },
    ],
    "@babel/preset-typescript",
  ];
  const plugins = [];
  return {
    presets,
    plugins,
  };
};
