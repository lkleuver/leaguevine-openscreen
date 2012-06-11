define([
  'config',
  'controller/ui',
  'model/sync',
  'model/tournament',
  'view/openscreen_view',
  'controller/tournament_controller'
], function(Config, UI, Sync, Tournament, OpensScreenView, tournamentController){
  
  var app_router;
  var tournaments = [];
  var loadCount = 0;
  
  var view;
  
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
  };
  
  
  var onTournamentLoadEvent = function(e) {
    loadCount++;
    if(loadCount >= tournaments.length) {
      start();
    }
  };
  
  var start = function() {
    UI.showLoading(false);
    view = new OpensScreenView({tournaments: tournaments});
    view.render();
    
    Backbone.history.start();    
  };
  

  var openTournament = function(tid, rid) {
    var tournament = null;
    for(var i = 0; i < tournaments.length; i++) {
      if(tournaments[i].get("id") == tid) {
        tournament = tournaments[i];
        break;
      }
    }
    
    if(tournament == null) {
      alert("tournament not found");
      return;
    }
    
    view.showActive(tid);
    
    tournamentController.showTournament(tournament, rid);
    
  };





  var AppRouter = Backbone.Router.extend({
    routes: {
      "tournament/:tid" : "tournamentAction",
      'tournament/:tid/round/:rid' : "tournamentAction",
      '*actions': 'defaultAction'
    },

    tournamentAction: function(tid, rid) {
      console.log("route: " + tid + " - " + rid);
      openTournament(tid, rid);
    },
    
    defaultAction: function(actions){
      
    }
  });


  return {
    initialize: initialize
  };
});