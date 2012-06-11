//TODO: refactor and name this tournament_list_view
define([
  'text!templates/openscreen.html'
], function(tpl){

  var view = Backbone.View.extend({
  
    tournaments: [],
    
    
    initialize: function(options) {
      this.tournaments = options.tournaments;
    },
    
    
    showActive: function(tid) {
      $("#openscreen li").removeClass("active");
      $("#openscreen .tournament-"+tid).addClass("active");
    },
    
    render: function(){
      var data = {
        tournaments: this.tournaments,
        _: _ 
      };

      var compiledTemplate = _.template( tpl, data );
      
      
      $("#openscreen").html(compiledTemplate);
      

    }
  });
  
  return view;
});