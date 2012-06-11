define([
], function(){



  var showLoading = function(b) {
    if(b) {
      $("#loading").fadeIn();
    }else{
      $("#loading").fadeOut();
    }
  };

 var initialize = function(){

  };


  return {
    showLoading: showLoading
  }

});