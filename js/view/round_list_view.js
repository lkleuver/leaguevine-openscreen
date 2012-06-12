define([
  'text!templates/roundlist.html'
], function(tpl){

  var view = Backbone.View.extend({
  
    roundList: null,
    
    
    initialize: function() {
    },
    
    showRoundList: function(rl) {
      this.roundList = rl;
      this.render();
    },
    
    showActive: function(rid) {
      var round = null;
      var rounds = this.roundList.get("rounds");
      
      for(var i = 0; i < rounds.length; i++) {
        if(rounds[i].id == rid) {
          round = rounds[i];
          break;
        }
      }
      
      if(round != null) {
        $("#roundlist div.selected h1").html("Round " + round.round_number);
      }
      
    },
    
    
    render: function(){
      var data = {
        roundList: this.roundList,
        _: _ 
      };

      var compiledTemplate = _.template( tpl, data );
      $("#roundlist").html(compiledTemplate);
    }
  });
  
  return new view;
});