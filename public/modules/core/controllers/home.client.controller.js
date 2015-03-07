'use strict';


angular.module('core').controller('HomeController', ['$scope', '$interval', 'timer', 'Authentication', function ($scope, $interval, timer, Authentication) {
    $scope.authentication = Authentication;
    
    $scope.authenticated = (Authentication.user !== '');
    
    var initialTime = 1000;

    $scope.currentTime = initialTime;

    $scope.startTimer = function() {
      timer.start($scope);
    };

    $scope.stopTimer = function() {
      timer.stop($scope);
    };

    $scope.resetTimer = function() {
      timer.reset($scope, initialTime);
    };

    $scope.shortBreakMessage = function() {
      return (timer.pomodoroDone) && (timer.pomodoroCount % 3 !== 0);
    };

    $scope.longBreakMessage = function() {
      return (timer.pomodoroCount !== 0) && (timer.pomodoroCount % 3 === 0);
    };

    // Remove Completed Tasks on Timer Completion (Consider implementing)

    // $scope.removeCompleted = function() {
    //   for (var i in $scope.tasks) {
    //     if ($scope.tasks[i].taskComplete) {
    //       $scope.tasks.splice(i, 1);
    //     }
    //   }
    // };

  }]);