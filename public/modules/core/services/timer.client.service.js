'use strict';


angular.module('core').service('timer', function timer($interval) {

    //var currentTime = 1500000;

    return {

      //currentTime: 1500000,
      pomodoroCount: 0,

      pomodoroDone: false,

      interval: undefined,

      start: function(scope) {
        var self = this;
        this.interval = $interval(function() {
          if (scope.currentTime > 0) {
            scope.currentTime = scope.currentTime - 1000;
          }
          else {
            //scope.cleanCompleted();
            // Ring Bell
            if (!self.pomodoroDone) {
              self.pomodoroCount = self.pomodoroCount + 1;
            }
            self.pomodoroDone = true;
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
        this.pomodoroDone = false;
      }
      // cleanCompleted: function(scope) {
      //   console.log(scope.tasks);
      //   for (var i in scope.tasks) {
      //     if (taskComplete) {
      //       scope.tasks.splice(i, 1);
      //     }
      //   }
      // }
    };

    // AngularJS will instantiate a singleton by calling "new" on this function
  });