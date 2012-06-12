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
      var tournament = null;
      for(var i = 0; i < this.tournaments.length; i++) {
        if(this.tournaments[i].get("id") == tid) {
          tournament = this.tournaments[i];
          break;
        }
      }
      
      if(tournament != null) {
        $("#openscreen div.selected").css("background-color", tournament.get("color")).find('h1').html(tournament.get("nameOverride"));
      }
      
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