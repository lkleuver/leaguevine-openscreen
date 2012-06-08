define([
], function(){

  var showLoading = function(b) {
    if(b) {
      $("#loading").fadeIn();
    }else{
      $("#loading").fadeOut();
    }
  };


  return {
    showLoading: showLoading
  }

});