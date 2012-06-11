define([
  'router',
  'config',
  'controller/ui',
  'model/sync',
  'model/tournament'
], function(Router, Config, UI, Sync, Tournament){
  
  //var app_router;
  var tournaments = [];
  var womenTournament = [];
  var mixedTournament = [];
  var openTournament = [];
  var loadCount = 0;
  
  var initialize = function(){
    Sync.initialize(); 
  
    /*for(var i = 0, c = Config.tournaments.length; i < c; i++) {
      var t = new Tournament(Config.tournaments[0]);
      t.on('change', onTournamentLoadEvent);
      t.fetch();
      tournaments.push(t);
    } //end for */

    //create womenTournament object for json data in rounds
    womenTournament = new Tournament(Config.tournaments[0]);
    womenTournament.on('change', onTournamentLoadEvent);
    mixedTournament = new Tournament(Config.tournaments[1]);
    mixedTournament.on('change', onTournamentLoadEvent);
    openTournament = new Tournament(Config.tournaments[2]);
    openTournament.on('change', onTournamentLoadEvent);

    //set Router aan om # op te vangen
    Router.initialize(this);
    //Router.on('change',onRouterChangeEvent);
  };

  var fetchRound = function(division,round){
    //fetch
    //Hoe kun je iets mee sturen met fetch?
    //zodat je uit de router een round nr en/of team-name kan meesturen
    //UI.showLoading(true);
    //womenTournament.fetch();
    console.log("OPENSCREEN.fetchRound: " + division + " round: " + round);

  }
  var fetchTeam = function(division,team){


  }

  
  var onTournamentLoadEvent = function(e) {
    console.log("onTournamentLoadEvent: " + JSON.stringify(e, null, 1));
    //loadCount++;
    //if(loadCount >= tournaments.length) {
      start();
    //} //end if
  };
  
  var start = function() {
    console.log("OPENSCREEN.START");
    UI.showLoading(false);
    
    //womenTournament.set("round",womenTournament.get("objects"));
    console.log("GET ROUND 3: " + JSON.stringify(womenTournament.get("round"), null, 1));

  };




  return {
    initialize: initialize
  };
});