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
      //hier data opslaan in model:
      model.set("round",o);
      //model.set(o);
    };

    $.ajax({
      url: Config.api + "swiss_rounds/?tournament_id="+model.get("id")+"&round_number=3&access_token=d59f4d28b2",
      success: onLoadTournament,
      dataType: 'json'
    });
  };
    
  return {
    initialize: initialize
  }
  
});