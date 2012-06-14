define([], function() {
  return {

    //location of the leaguevine API
    //api : "https://api.leaguevine.com/v1/",
    api : "http://api.leaguevine.com/v1/",
    
    //list of tournament ID's you wish to include
    tournaments : [{nameOverride: "Women", id: 18094, color: "#d73300"}, 
                   {nameOverride: "Mixed", id: 18093, color: "#a50078"},
                   {nameOverride: "Open", id: 18091, color: "#e58700"}],

    //duration in miliseconds (seconds * 1000)
    pagingDuration: 10000, 
                   
  }
});