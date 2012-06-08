define([], function() {
  var model = Backbone.Model.extend({
    defaults: {
      'class' : 'tournament',
      'nameOverride'  : ''
    },
    
    initialize: function(){
      console.log("tournament init: " + this.get("id") + " - " + this.get("name"));
      
    }
    
    
  });
  
  return model;

});