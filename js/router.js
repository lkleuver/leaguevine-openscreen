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

  Default:
    > home
*/

define([], function(){
  var AppRouter = Backbone.Router.extend({
    routes: {
      //Live scoring urls
      'division/:type': 'showDivision',
      'division/:type/round/:round': 'showDivision',
      'division/:type/teams': 'showTeams',
      'division/:type/teams/:team': 'showTeams',
      // Default
      '*actions': 'defaultAction'
    },
    showDivision: function(division,round){
      console.log("ROUTER showDivision " + division + " round: " + round );

    },
    showTeams: function(division,team){
      if(team == undefined) console.log("ROUTER showTeams " + division + " ALL")
      else console.log("ROUTER showTeams " + division + " - " + team )
      
    },
    showSettings: function(){
      console.log("ROUTER showSettings ");
      //settingsView.render();
    },
    defaultAction: function(actions){
      console.log("ROUTER defaultAction " + actions);
      // We have no matching route, lets display the home page
      //homeView.render();
    }
  });

  var initialize = function(){
    //console.log("ROUTER initialize");
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
