'use strict';

angular.module('core').filter('timecode', [
	function () {
  return function(milliSeconds) {
    var totalSeconds = milliSeconds / 1000;
    var outputSeconds = totalSeconds % 60;
    var outputMinutes = Math.floor(totalSeconds / 60);

    if (outputSeconds < 10) {
      return outputMinutes + ':' + '0' + outputSeconds;            
    }

    return outputMinutes + ':' + outputSeconds;

    };
  }
]);