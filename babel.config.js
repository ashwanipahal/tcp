module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/env',
        {
          targets: {
            browsers: 'Last 2 Chrome versions, Firefox ESR',
            node: '8.9',
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          development: process.env.BABEL_ENV !== 'build',
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/transform-flow-strip-types',
      '@babel/plugin-syntax-dynamic-import',
    ],
    env: {
      build: {
        ignore: ['**/*.story.tsx', '__snapshots__', '__tests__', '__stories__'],
        plugins: ['transform-remove-console'],
      },
    },
    ignore: ['node_modules'],
  };
};
