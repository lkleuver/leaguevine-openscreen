define([], function() {
  var model = Backbone.Model.extend({
    defaults: {
      'class' : 'bracket',
      'tournament_id' : 0,
      'rounds' : []
    },

    initialize: function() {
    }

    
  });
  
  return model;

});