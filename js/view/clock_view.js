define([
], function() {

  var view = Backbone.View.extend({
  
    intervalID: -1,
    
    initialize: function() {
    },
    
    updateTime: function() {
      var d = new Date();
      var h = d.getHours();
      var hs = h < 10 ? "0" + h : "" + h;
      
      var m = d.getMinutes();
      var ms = m < 10 ? "0" + m : "" + m;
      
      $("#time h1").html(hs + ":" + ms);
      
    },
    
    
    render: function(){
      this.intervalID = setInterval(this.updateTime, 2000);
    }
  });
  
  return new view;
});