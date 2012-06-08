define([

], function(Router){
  
  var app_router;
  
  var initialize = function(){
    console.log("TEST");
    app_router = new AppRouter();
    Backbone.history.start();
  }



  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions': 'defaultAction'
    },

    defaultAction: function(actions){
      console.log('No route:', actions);
    }
  });


  return {
    initialize: initialize
  };
});