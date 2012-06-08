require.config({
  paths: {
    templates: '../templates'
  }
});

require(['openscreen'], function(App) {
  App.initialize();
});