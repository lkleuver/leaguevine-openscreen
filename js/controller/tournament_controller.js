define([
  'controller/ui',
  'model/round_list',
  'model/swiss_round',
  'view/round_list_view',
  'view/games_view',
  'view/standings_view'
], function(UI, RoundList, SwissRound, roundListView, gamesView, standingsView){
  
  var tournament = null;
  var roundList = null;
  var round = null;
  
  
  var targetRoundId = null;
  
  var showTournament = function(t, rid) {
    tournament = t;
    targetRoundId = rid;
    
    if(roundList == null || !rid || roundList.get("tournament_id") != tournament.get("id")) {
      roundList = new RoundList({tournament_id : t.get("id")});
      roundList.on('change', onRoundListChange);
        
      UI.showLoading(true);
      roundList.fetch();
    }else{
      showRound(rid);
    }
  };
  
  var onRoundListChange = function(e) {
    UI.showLoading(false);
    roundListView.showRoundList(roundList);
    
    if(targetRoundId) {
      showRound(targetRoundId);
      targetRoundId = null;
    }
  }
  
  var showRound = function(rid) {
    console.log("showing round: " + rid);
    roundListView.showActive(rid);

    round = new SwissRound({tournament: tournament, id : rid});
    round.on('change', onRoundChange);
    UI.showLoading(true);
    round.fetch();
  };
  
  var onRoundChange = function(e) {
    UI.showLoading(false);
    gamesView.showGames(round.get("games"));
    standingsView.showStandings(round.get("standings"));
  };
  

  
  
  return {
    showTournament: showTournament
  }
  
});