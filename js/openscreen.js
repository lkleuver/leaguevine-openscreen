define([
  'router',
  'config',
  'controller/ui',
  'model/sync',
  'model/tournament'
], function(Router, Config, UI, Sync, Tournament){
  
  //var app_router;
  var tournaments = [];
  var loadCount = 0;
  
  var initialize = function(){
    Router.initialize();
    Sync.initialize();
    
    UI.showLoading(true);
    for(var i = 0, c = Config.tournaments.length; i < c; i++) {
      var t = new Tournament(Config.tournaments[i]);
      t.on('change', onTournamentLoadEvent);
      t.fetch();
      //console.log(" fetch: "+t);
      tournaments.push(t);
      //console.log(i+" tournament: "+tournaments[i].id);
    }

  };
  
  
  var onTournamentLoadEvent = function(e) {
    loadCount++;
    if(loadCount >= tournaments.length) {
      start();
    }
  };
  
  var start = function() {
    UI.showLoading(false);
    console.log("openscreen.start");
    
    //console.log(tournaments[0].get("name"));
    for(var i = 0, c = tournaments.length; i < c; i++) {
      console.log(i + " tournament: "+ tournaments[i].get("id") +" get(name): " + tournaments[i].get("name"));
      //console.log(i + " tournament scheduling_format: " + tournaments[i].get("scheduling_format"));

    }
  };



  return {
    initialize: initialize
  };
});