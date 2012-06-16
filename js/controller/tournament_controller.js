define([
  'controller/ui',
  'model/round_list',
  'model/swiss_round',
  'model/bracket',
  'view/bracket_view',
  'view/round_list_view',
  'view/games_view',
  'view/standings_view',
  'view/results_view',
], function(UI, RoundList, SwissRound, Bracket, bracketView, roundListView, gamesView, standingsView, resultsView){
  
  var tournament = null;
  var roundList = null;
  var round = null;
  var pollRoundList = null;
  var pollRoundIntervalID = -1;
  var prevRound = null;
  var bracket = null;
  var targetRoundId = null;
  var bracketIntervalID = -1;
  var bracketFadeIntervalID = -1;
  var router = null;
  
  var bracketLoaded = false;
  
  var initialize = function(r) {
    router = r;
  };
  
  var showTournament = function(t, rid) {
    tournament = t;
    $("#theme-color").html(tournament.get("color"));
      
    targetRoundId = rid;
      
    if(roundList == null || !rid || roundList.get("tournament_id") != tournament.get("id")) {
      roundList = new RoundList({tournament_id : t.get("id")});
      roundList.on('change', onRoundListChange);
      
      UI.showLoading(true);
      roundList.fetch();
    }else{
      showRound(rid);
    }
      
    showBracketting();
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
    
    //current round
    round = new SwissRound({tournament: tournament, id : rid});
    round.on('change', onRoundChange);
    UI.showLoading(true);
    round.fetch();
  };
  
  var onRoundChange = function(e) {

    gamesView.showGames(round.get("games"));
    standingsView.showStandings(round.get("standings"));
    
    //check for new available rounds
    clearInterval(pollRoundIntervalID);
    pollRoundList = new RoundList({tournament_id : tournament.get("id")});
    pollRoundList.on('change', onPollRoundChange);
    pollRoundIntervalID = setInterval(checkForNewRounds, 60000);
    
    //previous round
    var pr = roundList.roundBefore(round.get("id"));
    if(pr != null) {
      prevRound = new SwissRound({tournament: tournament, id : pr.id});
      prevRound.on('change', onPrevRoundChange);
      prevRound.fetch();
    }else{
      resultsView.showNoResults();
      UI.showLoading(false);
    } 
  };

  var checkForNewRounds = function() {
    pollRoundList.fetch();
  };

  var onPollRoundChange = function(e) {
    if(pollRoundList.get("rounds").length > roundList.get("rounds").length) {
      loadNextRound();
    }
  };

  var loadNextRound = function() {
    console.log("LOADING NEXT ROUND");
    clearInterval(pollRoundIntervalID);
    roundList = null;
    router.navigate("tournament/" + tournament.get("id") + "/round/" + pollRoundList.getLastRoundID(), true);
  };

  var onPrevRoundChange = function(e) {
    UI.showLoading(false);
    resultsView.showResults(prevRound.get("games"), prevRound.get("round_number"));
  };

  
  var showBracketting = function() {
    clearInterval(bracketFadeIntervalID);
    bracketLoaded = false;
    $("#bracket").hide();
    bracket = null;
    bracket = new Bracket({tournament_id : tournament.get("id")});
    bracket.on('change', onBracketLoad);
    bracket.fetch();
    bracketIntervalID = setInterval(onBracketPolling, 300000);
    
  
    var toggle = true;
    var inout = function() {
      if(toggle) {
        toggle = false;
        $("#bracket").fadeOut();
      }else{
        toggle = true;
        $("#bracket").fadeIn();
      }
    }    
    bracketFadeIntervalID = setInterval(inout, 30000);
  };
  
  var onBracketPolling = function() {
    bracket.fetch();    
  };
  
  var onBracketLoad = function(e) {
    if(!bracketLoaded) {
      $("#bracket").fadeIn();
    }
    bracketLoaded = true;
    bracketView.showBracket(bracket.get("objects"));
  };
  
  
  
  return {
    initialize : initialize,
    showTournament: showTournament
  }
  
});