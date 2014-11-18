'use strict';


angular.module('core').service('timer', function timer($interval) {

    //var currentTime = 1500000;

    return {

      //currentTime: 1500000,
      pomodoroCount: 0,

      interval: undefined,

      start: function(scope) {
        self = this;
        this.interval = $interval(function() {
          if (scope.currentTime > 0) {
            scope.currentTime = scope.currentTime - 1000;
            console.log(scope.currentTime);
          }
          else {
            // Ring Bell
            self.pomodoroCount = self.pomodoroCount + 1;
            $interval.cancel(self.interval);
            
          }
        }, 1000);
      },
      stop: function(scope) {
        $interval.cancel(this.interval);
      },
      reset: function(scope, initialTime) {
        this.stop();
        scope.currentTime = initialTime;
      }
    }

    // AngularJS will instantiate a singleton by calling "new" on this function
  });