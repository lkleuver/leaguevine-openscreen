define([
  'config',
  'text!templates/games.html'
], function(Config, tpl){

  var view = Backbone.View.extend({
  
    games: [],
    intervalID: -1,
    
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
      var d = new Date(s);
      var h = d.getHours();
      var hs = h < 9 ? "0" + h : "" + h;
      var m = d.getMinutes();
      var ms = m < 9 ? "0" + m : "" + m;
      return hs + ":" + ms;
    },
    
    
    render: function(){
     clearInterval(this.intervalID);
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