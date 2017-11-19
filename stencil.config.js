exports.config = {
  bundles: [
    { components: ['my-input-task'] }
  ],
  collections: [
    { name: '@stencil/router' },
  ],
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
