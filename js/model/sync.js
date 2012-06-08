define(['config'], function(Config) {
  
  var initialize = function() {
    Backbone.sync = onSync;
  };
  
  
  var onSync = function(method, model, options) {
    switch(model.get("class")) {
      case "tournament":
        loadTournament(model);
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
  

  
  return {
    initialize: initialize
  }
  
});