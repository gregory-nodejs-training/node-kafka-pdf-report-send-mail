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
        '@utils': './src/shared/utils'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
};
