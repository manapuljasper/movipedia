module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['.'],       // root for absolute imports
            alias: {
              '@services': './src/services',
              '@components': './src/components',
              '@hooks': './src/hooks',
              '@api': './src/api',
            },
          },
        ],
      ],
    };
  };
  