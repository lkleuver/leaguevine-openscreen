define([
  'config',
  'text!templates/games.html'
], function(Config, tpl){

  var view = Backbone.View.extend({
  
    games: [],
    
    
    initialize: function() {
    },
    
    showGames: function(g) {
      this.games = g;
      this.render();
    },
    
    autoScroll: function() {
      this.intervalID = setInterval(this.onAutoScroll, Config.pagingDuration);
    },
    
    onAutoScroll: function() {
      var o = $("#games div.content");
      var pageSize = o.height();
      var ds = o.scrollTop() + pageSize;
      console.log(o.scrollTop() + " - " + $("#games div.scrollarea").height() + " - " + pageSize);

      if(o.scrollTop() + pageSize >= $("#games div.scrollarea").height()) {
        o.animate({scrollTop : 0},'slow');
      }else{
        o.animate({scrollTop : ds},'slow');       
      }
    },
    
    getTime: function(s) {
      return "12:00";
    },
    
    
    render: function(){
      var data = {
        games: this.games,
        _: _,
        getTime: this.getTime
      };

      var compiledTemplate = _.template( tpl, data );
      $("#games").html(compiledTemplate);
      
      $("#games h2").css("color", $("#theme-color").html());
      
      if($("#games div.content").height() < $("#games div.scrollarea").height()) {
        this.autoScroll();
      }
    }
  });
  
  return new view;
});