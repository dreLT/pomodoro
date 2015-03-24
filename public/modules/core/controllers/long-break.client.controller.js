'use strict';

angular.module('core').controller('LongBreakController', ['$scope', '$interval', 'timer', function ($scope, $interval, timer) {
		var initialTime = 1800000;
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
	}
]);