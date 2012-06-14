define([
  'config',
  'text!templates/results.html'
], function(Config, tpl){

  var view = Backbone.View.extend({
  
    games: [],
    intervalID: -1, 
    roundNumber: 0,
    
    initialize: function() {
    },
    
    showResults: function(g, rn) {
      this.games = g;
      this.roundNumber = rn;
      this.render();
    },
    
    showNoResults: function() {
      $("#results").html("<em>No results yet</em>");
    },
    
    autoScroll: function() {
      this.intervalID = setInterval(this.onAutoScroll, Config.pagingDuration);
    },
    
    onAutoScroll: function() {
      var o = $("#results div.content");
      var pageSize = o.height();
      var ds = o.scrollTop() + pageSize;
      console.log(o.scrollTop() + " - " + $("#results div.scrollarea").height() + " - " + pageSize);

      if(o.scrollTop() + pageSize >= $("#results div.scrollarea").height()) {
        o.animate({scrollTop : 0},'slow');
      }else{
        o.animate({scrollTop : ds},'slow');       
      }
    },
    
    getTime: function(s) {
      return "12:00";
    },
    
    render: function(){
      clearInterval(this.intervalID);
      
      var data = {
        games: this.games,
        roundNumber: this.roundNumber,
        _: _ 
      };

      var compiledTemplate = _.template( tpl, data );
      $("#results").html(compiledTemplate);
      
      $("#results h2").css("color", $("#theme-color").html());
      
      if($("#results div.content").height() < $("#results div.scrollarea").height()) {
        this.autoScroll();
      }
    }
  });
  
  return new view;
});