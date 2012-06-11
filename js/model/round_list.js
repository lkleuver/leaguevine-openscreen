define([], function() {
  var model = Backbone.Model.extend({
    defaults: {
      'class' : 'round_list',
      'tournament_id' : 0,
      'rounds' : []
    },
    

    initialize: function() {
    }
    
    
  });
  
  return model;

});