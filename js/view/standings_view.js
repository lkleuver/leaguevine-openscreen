define([
  'text!templates/standings.html'
], function(tpl){

  var view = Backbone.View.extend({
  
    standings: [],
    
    
    initialize: function() {
    },
    
    showStandings: function(g) {
      this.standings = g;
      this.render();
    },
    
    render: function(){
      var data = {
        standings: this.standings,
        _: _ 
      };

      var compiledTemplate = _.template( tpl, data );
      $("#standings").html(compiledTemplate);
    }
  });
  
  return new view;
});