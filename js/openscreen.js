define([
  'config',
  'controller/ui',
  'model/sync',
  'model/tournament'
], function(Config, UI, Sync, Tournament){
  
  var app_router;
  var tournaments = [];
  var loadCount = 0;
  
  var initialize = function(){
    Sync.initialize();
    
    UI.showLoading(true);
    for(var i = 0, c = Config.tournaments.length; i < c; i++) {
      var t = new Tournament(Config.tournaments[i]);
      t.on('change', onTournamentLoadEvent);
      t.fetch();
      tournaments.push(t);
    }


    app_router = new AppRouter();
    Backbone.history.start();
  };
  
  
  var onTournamentLoadEvent = function(e) {
    loadCount++;
    if(loadCount >= tournaments.length) {
      start();
    }
  };
  
  var start = function() {
    UI.showLoading(false);
    console.log("hooray");
    
    console.log(tournaments[0].get("name"));
  };
  
  

  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions': 'defaultAction'
    },

    defaultAction: function(actions){
      
    }
  });


  return {
    initialize: initialize
  };
});