define(['config'], function(Config) {
  
  var initialize = function() {
    Backbone.sync = onSync;
  };
  
  
  var onSync = function(method, model, options) {
    switch(model.get("class")) {
      case "tournament":
        loadTournament(model);
        break;
      case "round_list":
        loadRoundList(model);
        break;
      case "swiss_round":
        loadSwissRound(model);
        break;
      case "bracket":
        loadBracket(model);
        break;
    }
  };
  
  
  var loadTournament = function(model) {
    var onLoadTournament = function(o) {
      model.set(o);
    };
    
    $.ajax({
      url: Config.api + "tournaments/"+model.get("id")+"/?callback=?",
      success: onLoadTournament,
      dataType: 'json'
    });
  };
  

  var loadRoundList = function(model) {
    var onLoadRoundList = function(o) {
      model.set("rounds", o.objects)
    }
    
    $.ajax({
      url: Config.api + "swiss_rounds/?tournament_id="+model.get("tournament_id")+"&fields=[id,round_number]&callback=?",
      success: onLoadRoundList,
      dataType: 'json'
    });
  }

  var loadSwissRound = function(model) {
    var onLoadSwissRound = function(o) {
      if(o.objects && o.objects.length > 0) {
        model.set(o.objects[0]);
      }else{
        alert("no result for swiss round");
      }
    }
    
    $.ajax({
      url: Config.api + "swiss_rounds/?tournament_id="+model.get("tournament").get("id")+"&swiss_round_ids=["+model.get("id")+"]&callback=?",
      success: onLoadSwissRound,
      dataType: 'json'
    });
  }
  
  var loadBracket = function(model) {
    var onLoadBracket = function(o) {
        model.set(o);
    }
    
    $.ajax({
      url: Config.api + "brackets/?tournament_id="+model.get("tournament_id") + "&callback=?",
      success: onLoadBracket,
      dataType: 'json'
    });
  }


  
  return {
    initialize: initialize
  }
  
});