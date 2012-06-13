define([
  'config',
  'text!templates/standings.html'
], function(Config, tpl){

  var view = Backbone.View.extend({
  
    standings: [],
    intervalID: -1,
    
    initialize: function() {
    },
    
    showStandings: function(g) {
      this.standings = g;
      this.render();
    },


    autoScroll: function() {
      this.intervalID = setInterval(this.onAutoScroll, Config.pagingDuration);
    },
    
    onAutoScroll: function() {
      var o = $("#standings div.content");
      if(o.scrollTop() == 0) {
        o.animate({scrollTop : 460},'slow');
      }else{
        o.animate({scrollTop : 0},'slow');
      }
    },
    
    
    shorten: function(s) {
      if(s.length < 20) {
        return s;
      }
      
      return s.substr(0, 20) + "...";
    },
    
    render: function(){
      clearInterval(this.intervalID);
      
      var left = [];
      var right = [];
      var split = Math.ceil(this.standings.length / 2);
      for(var i = 0; i < this.standings.length; i++) {
        if(i < split) {
          left.push(this.standings[i]);
        }else{
          right.push(this.standings[i]);
        }
      }
      
      var data = {
        left: left,
        right: right,
        shorten: this.shorten,
        _: _ 
      };

      var compiledTemplate = _.template( tpl, data );
      $("#standings").html(compiledTemplate);
      
      if($("#standings div.content").height() < $("#standings div.scrollarea").height()) {
        this.autoScroll();
      }
      
    }
  });
  
  return new view;
});