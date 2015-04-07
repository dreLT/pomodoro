'use strict';

angular.module('core').controller('TaskListController', ['$scope', '$stateParams', '$location', 'Tasks', 'timer',
	function($scope, $stateParams, $location, Tasks, timer) {

    var taskCount = 1;
    $scope.taskLimitReached = function() {
      return taskCount > 10;
    };

    $scope.taskHover = false;

  // Create new Task
    $scope.addTask = function() {
      // Create new Task object
      var task = new Tasks ({
        name: this.name,
        taskComplete: this.taskComplete
      });
      console.log($scope.tasks);

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
      $scope.adding = false;
    };

    // Remove existing Task
    $scope.deleteTask = function(task) {
      if ( task ) { 
        task.$remove();
        $scope.editing = false;

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
      var task = taskBeingEdited;
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
    };

    $scope.cancelEditing = function () {
      $scope.editing = false;
      $scope.adding = false;
      $scope.name = '';
      $scope.taskComplete = '';
      taskBeingEdited = undefined;
    };

    // Add Brand New Task
    $scope.addingNewTask = function() {
      $scope.adding = true;
    };

    // Mark Task Complete
    $scope.completeTask = function(task) {
      task.taskComplete = true;
      task.$update(function() {
        $scope.taskComplete = true;
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Undo Mark Task Complete
    $scope.undoCompleteTask = function(task) {
      task.taskComplete = false;
      task.$update(function() {
        $scope.taskComplete = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Auto-remove Completed Tasks on Timer Completion
    //$scope.cleanCompleted = function() {
      //if ($scope.currentTime === 0) {
        // for (var i in $scope.tasks) {
        //   if ($scope.tasks[i].taskComplete) {
        //     $scope.tasks.splice($scope.tasks[i], 1);
        //     var toDeleteTask = $scope.tasks[i];
        //     toDeleteTask.$remove();
        //   }
        // }

        // console.log($scope.tasks);
        // var completedTasks = [];
        // for (var i = 0; i < $scope.tasks.length; i++) {
        //   var task = $scope.tasks[i];
        //   if (task.taskComplete) {
        //     completedTasks.push(task);
        //   }
        // }
        // console.log(completedTasks);
        // for (var i = 0; i < completedTasks.length; i++) {
        //   var toDeleteIndex = $scope.tasks.indexOf(completedTasks[i]);
        //   var toDeleteTask = $scope.tasks[toDeleteIndex];
        //   $scope.tasks.splice(toDeleteIndex, 1);
        //   toDeleteTask.$remove();
        // }
      //};
  }

]);