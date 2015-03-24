'use strict';

angular.module('core').controller('ShortBreakController', ['$scope', '$interval', 'timer', function ($scope, $interval, timer) {
		var initialTime = 300000;
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

    $scope.returnToWorkMessage = function() {
      return 1 === 1;
    };

	}
]);