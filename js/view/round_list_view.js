define([
  'text!templates/roundlist.html'
], function(tpl){

  var view = Backbone.View.extend({
  
    roundList: null,
    
    
    initialize: function() {
    },
    
    showRoundList: function(rl) {
      this.roundList = rl;
      this.render();
    },
    
    showActive: function(rid) {
      $("#roundlist li").removeClass("active");
      $("#roundlist .round-"+rid).addClass("active");
    },
    
    
    render: function(){
      var data = {
        roundList: this.roundList,
        _: _ 
      };

      var compiledTemplate = _.template( tpl, data );
      $("#roundlist").html(compiledTemplate);
    }
  });
  
  return new view;
});