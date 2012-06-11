define([], function() {
  var model = Backbone.Model.extend({
    defaults: {
      'class' : 'swiss_round',
      'games' : [],
      'round_number' : 0,
      'standings' : [],
      'start_time' : ""
    },
    
    initialize: function(){

    }
    
    
  });
  
  return model;

});