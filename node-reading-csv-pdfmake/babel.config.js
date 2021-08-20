module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@exceptions': './src/exceptions',
        '@database': './src/database',
        '@sharedEntities': './src/shared/entities',
        '@middlewares': './src/shared/middlewares',
        '@utils': './src/shared/utils'
      }
    }],
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
};
