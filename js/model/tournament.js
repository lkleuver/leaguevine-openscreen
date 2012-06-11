define([], function() {
  var model = Backbone.Model.extend({
    defaults: {
      'class' : 'tournament',
      'nameOverride'  : '',
    },
    
    //var round = [], //array voor verschillende rondes. 
                    //round[0] = teams/seed 
                    //round[1] t/m round[5] = swissdraw rondes
                    //round[6] = QF, top 8 bracket quarters + rest swissdraw
                    //round[7] = SF, top 8 bracket semis + rest swissdraw
                    //round[8] = F, top 8 bracket finals + rest swissdraw

    initialize: function(){
      console.log("tournament initialize: " + this.get("id") + " - " + this.get("nameOverride"));
      
    }
    
    
  });
  
  return model;

});