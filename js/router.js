// Filename: router.js
/*
Router:
  Games:
    #women/round/5  > swiss draw + ranking
    #mixed/round/QF > top pool brackets + swiss draw + ranking
    #open/round > division open, all round results + ranking
  Teams:
    #women/teams/yaka > team page, all roudn results + ranking
    #mixed/teams > division mixed, all teams + ranking
    #open/teams/abcdef  > fall back naar /teams

  Default:
    > home
*/

define([ ], function(){
  var AppRouter = Backbone.Router.extend({
    routes: {
      //Live scoring urls
      'division/:type': 'showDivision',
      'division/:type/round/:round': 'showDivision',
      'division/:type/teams': 'showTeams',
      'division/:type/teams/:team': 'showTeams',
      //settings
      'settings': 'showSettings',
      // Default
      '*actions': 'defaultAction'
    },
    showDivision: function(type,round){
      console.log("ROUTER showDivision " + type + " round: " + round );

    },
    showTeams: function(type,team){
      if(team == undefined) console.log("ROUTER showTeams " + type + " ALL")
      else console.log("ROUTER showTeams " + type + " - " + team )
      
    },
    showSettings: function(){
      console.log("ROUTER showSettings ");
      //settingsView.render();
    },
    defaultAction: function(actions){
      console.log("ROUTER defaultAction HOME ");
      // We have no matching route, lets display the home page
      //homeView.render();
    }
  });

  var initialize = function(){
    console.log("ROUTER initialize");
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
