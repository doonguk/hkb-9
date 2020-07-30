module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: '> 1%, not dead',
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false,
      },
    ],
  ];

  const plugins = [
    [
      'module-resolver',
      {
        root: ['./client/src'],
        alias: {
          imgs: './client/public/images',
          utils: './client/utils',
          styles: './client/src/styles',
        },
      },
    ],
  ];
  return {
    presets,
    plugins,
  };
};
