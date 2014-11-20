//'use strict';

angular.module('core').controller('TaskListController', ['$scope', '$stateParams', '$location', 'Tasks',
	function($scope, $stateParams, $location, Tasks) {

    var taskCount = 1;
    $scope.taskLimitReached = function() {
      return taskCount > 10;
    }


    $scope.createTask = function() {
      $scope.tasks.push({});
      taskCount++;
    };

    $scope.deleteTask = function() {
      var selectedTask = $scope.taskData.tasks.indexOf($scope.task);
      $scope.taskData.tasks.splice(selectedTask, 1);
      taskCount--;
    };

	


  // Create new Task
    $scope.addTask = function() {
      // Create new Task object
      var task = new Tasks ({
        name: this.name,
        taskComplete: this.taskComplete
      });

      // Redirect after save
      var saved = task.$save(function(response) {
        // Clear form fields
        $scope.name = '';
        $scope.taskComplete = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      saved.then(function () {
        $scope.find();
      });
    };

    // Remove existing Task
    $scope.deleteTask = function(task) {
      if ( task ) { 
        task.$remove();

        for (var i in $scope.tasks) {
          if ($scope.tasks [i] === task) {
            $scope.tasks.splice(i, 1);
          }
        }
      } else {
        $scope.task.$remove();
      }
    };

    // Update existing Task
    $scope.updateTask = function() {
      task = taskBeingEdited;
      task.name = this.name;
      task.taskComplete = this.taskComplete;
      task.$update(function() {
        $scope.name = '';
        $scope.taskComplete = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Tasks
    $scope.find = function() {
      $scope.tasks = Tasks.query();
    };

    // Find existing Task
    $scope.findOne = function() {
      $scope.task = Tasks.get({ 
        taskId: $stateParams.taskId
      });
    };
    var taskBeingEdited;
    $scope.editTask = function (task) {
      $scope.editing = true;
      $scope.name = task.name;
      $scope.taskComplete = task.taskComplete;
      taskBeingEdited = task;
    }

    $scope.cancelEditing = function () {
      $scope.editing = false;
      $scope.name = '';
      $scope.taskComplete = '';
      taskBeingEdited = undefined;
    }

  }

]);