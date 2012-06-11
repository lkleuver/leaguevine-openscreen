define([
  'text!templates/games.html'
], function(tpl){

  var view = Backbone.View.extend({
  
    games: [],
    
    
    initialize: function() {
    },
    
    showGames: function(g) {
      this.games = g;
      this.render();
    },
    
    render: function(){
      var data = {
        games: this.games,
        _: _ 
      };

      var compiledTemplate = _.template( tpl, data );
      $("#games").html(compiledTemplate);
    }
  });
  
  return new view;
});