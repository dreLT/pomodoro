'use strict';


angular.module('core').controller('HomeController', ['$scope', '$interval', 'timer', 'Authentication', function ($scope, $interval, timer, Authentication) {
    $scope.authentication = Authentication;
    
    var initialTime = 1500000;
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

    $scope.longBreakMessage = function() {
      return (timer.pomodoroCount !== 0) && (timer.pomodoroCount % 3 === 0);
    };

  }]);