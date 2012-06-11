define([], function() {
  var model = Backbone.Model.extend({
    defaults: {
      'class' : 'tournament',
      'nameOverride'  : '',
    },
    

    initialize: function(){
      console.log("tournament initialize: " + this.get("id") + " - " + this.get("nameOverride"));
    }
    
    
  });
  
  return model;

});