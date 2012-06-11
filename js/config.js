define([], function() {
  return {

    //location of the leaguevine API
    //api : "https://api.leaguevine.com/v1/",
    api : "https://api.playwithlv.com/v1/",
    
    //list of tournament ID's you wish to include
    tournaments : [{nameOverride: "women", id: 18093, accestoken : "d59f4d28b2"}, 
                   {nameOverride: "mixed", id: 18094, accestoken : "d59f4d28b2"},
                   {nameOverride: "open", id: 18091, accestoken : "d59f4d28b2"}],

	url : [{swissround : "swiss_rounds/?tournament_id=18094&round_number=0&access_token="},
			{bracket : "bracket/?tournament_id=18094&access_token="},
			{team : "tournament_teams/18094/19085/?access_token="}],

  }
});