define([
], function() {

  var view = Backbone.View.extend({
  
    intervalID: -1,
    brackets : null,
    
    initialize: function() {
    },
    
    showBracket : function(b) {
      if(b) {
        this.brackets = b;
        this.render();
      }
    },
    
    getTime : function(s) {
      var days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
      
      var d = new Date(s);
      var h = d.getHours();
      var hs = h < 9 ? "0" + h : "" + h;
      var m = d.getMinutes();
      var ms = m < 9 ? "0" + m : "" + m;
      
      var ds = days[d.getDay()];
      
      return ds + " " + hs + ":" + ms;
    },
    
    render: function(){
      for(var i = 0; i < this.brackets.length; i++) {
        var b = this.brackets[i];
        switch(b.name) {
          case "playoff":
            this.renderPlayoffs(b.rounds);
            break;
          case "bronze game":
            this.renderBronzeGame(b.rounds);
            break;
          case "playoff losers":
            this.renderPlayoffLosers(b.rounds);
            break;
          case "game for 7-8":
            this.renderGameFor78(b.rounds);
            break;
        }        
      }
    },
    
    renderPlayoffs : function(r) {
      console.log("render playoffs");
      for(var i = 0;i < r.length; i++) {
        var round = r[i];
        var rn = 3 - round.round_number;
        for(var j = 0; j < round.games.length; j++) {
          var game = round.games[j];
          var pos = j < round.games.length / 2 ? "left" : "right";
          var gn = j + 1;
          var sn = (j % Math.ceil(round.games.length / 2)) + 1;
          sn = sn == 2 ? 3 : 1;
          
          $("#bracket div.round"+rn+".game"+gn+"."+pos).html(this.getTime(game.start_time) + " - " + game.game_site.name);
          

          var div1 = $("#bracket div.round"+rn+".spot"+sn+"."+pos);
          var div2 = $("#bracket div.round"+rn+".spot"+(sn + 1) +"."+pos);
          if(round.games.length == 1) {
            div1 = $("#bracket div.round"+rn+".spot1.left");
            div2 = $("#bracket div.round"+rn+".spot1.right");
          }
          
          if(game.team_1_score == 0 && game.team_2_score == 0) {
            game.team_1_score = "-";
            game.team_2_score = "-";
          }
          
          var name1 = game.team_1 != null ? game.team_1.short_name : "";
          var name2 = game.team_2 != null ? game.team_2.short_name : "";

          
          div1.find('b').html(name1);
          div1.find('em').html(game.team_1_score);
          div2.find('b').html(name2)
          div2.find('em').html(game.team_2_score);
        }
      }
    },
    
    
    renderBronzeGame : function(r) {
      console.log("render bronze game");
      var game = r[0].games[0];
      
      $("#bracket div.round3.game2").html(this.getTime(game.start_time) + " - " + game.game_site.name);
      
      
      var div1 = $("#bracket div.round3.spot2.left");
      var div2 = $("#bracket div.round3.spot2.right");
      
      if(game.team_1_score == 0 && game.team_2_score == 0) {
        game.team_1_score = "-";
        game.team_2_score = "-";
      }
      
      var name1 = game.team_1 != null ? game.team_1.short_name : "";
      var name2 = game.team_2 != null ? game.team_2.short_name : "";
      
      div1.find('b').html(name1);
      div1.find('em').html(game.team_1_score);
      div2.find('b').html(name2)
      div2.find('em').html(game.team_2_score);
    },
    
    renderPlayoffLosers : function(r) {
      console.log("render playoff losers");
      var game = r[0].games[0];
      if(game.team_1_score == 0 && game.team_2_score == 0) {
        game.team_1_score = "-";
        game.team_2_score = "-";
      }
      $("#bracket div.round2.game3").html(this.getTime(game.start_time) + " - " + game.game_site.name);
      this.place(game, 2, "left", 3, game.team_1, game.team_1_score);
      this.place(game, 2, "left", 4, game.team_2, game.team_2_score);
      
      game = r[0].games[1];
      if(game.team_1_score == 0 && game.team_2_score == 0) {
        game.team_1_score = "-";
        game.team_2_score = "-";
      }
      $("#bracket div.round2.game4").html(this.getTime(game.start_time) + " - " + game.game_site.name);
      this.place(game, 2, "right", 3, game.team_1, game.team_1_score);
      this.place(game, 2, "right", 4, game.team_2, game.team_2_score);
      
      game = r[1].games[0];
      if(game.team_1_score == 0 && game.team_2_score == 0) {
        game.team_1_score = "-";
        game.team_2_score = "-";
      }
      $("#bracket div.round3.game3").html(this.getTime(game.start_time) + " - " + game.game_site.name);
      this.place(game, 3, "left", 3, game.team_1, game.team_1_score);
      this.place(game, 3, "right", 3, game.team_2, game.team_2_score);
      
    },
    
    renderGameFor78: function(r) {
      console.log("render games for 7-8");
      var game = r[0].games[0];
      if(game.team_1_score == 0 && game.team_2_score == 0) {
        game.team_1_score = "-";
        game.team_2_score = "-";
      }
      $("#bracket div.round3.game4").html(this.getTime(game.start_time) + " - " + game.game_site.name);
      this.place(game, 3, "left", 4, game.team_1, game.team_1_score);
      this.place(game, 3, "right", 4, game.team_2, game.team_2_score);
    },
    
    place: function(game, rn, pos, sn, gn, team, score) {
      var div = $("#bracket div.round"+rn+".spot"+sn+"."+pos);
      
      var name = team != null ? team.short_name : "";
      
      div.find('b').html(name);
      div.find('em').html(score);
    }
    
    
  });
  
  return new view;
});