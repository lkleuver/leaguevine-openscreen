define([], function() {
  var model = Backbone.Model.extend({
    defaults: {
      'class' : 'round_list',
      'tournament_id' : 0,
      'rounds' : []
    },

    initialize: function() {
    },
    
    roundBefore: function(rid) {
      var r = this.get("rounds");
      for(var i = 0; i < r.length; i++) {
        if(r[i].id == rid) {
          if(i < r.length -1) {
            return r[i+1];
          }
          return null;
        }
      }
      return null;
    },

    
  });
  
  return model;

});