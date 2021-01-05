const prodPlugins = []
if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    'transform-vue-jsx',
    ...prodPlugins
    // '@babel/plugin-syntax-dynamic-import'
  ]
}
