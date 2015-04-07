'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'pomodoro';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('tasks');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');
		//$locationProvider.html5Mode(true);

		// Home state routing
		$stateProvider
		
		.state('home', {
			url: '/',
			views: {
				'': {
					templateUrl: 'modules/core/views/home.client.view.html',
					controller: 'HomeController',
				},
				'taskList@home': {
					templateUrl: 'modules/core/views/tasklist.client.view.html',
					controller: 'TaskListController'
					//authenticate: true				
				}
			}
		})

		.state('shortbreak', {
			url: '/shortbreak',
			controller: 'ShortBreakController',
			templateUrl: 'modules/core/views/shortbreak.client.view.html',
		})

		.state('longbreak', {
			url: '/longbreak',
			controller: 'LongBreakController',
			templateUrl: 'modules/core/views/longbreak.client.view.html',
		});

	}
]);

// app.run(function($rootScope, $state, AuthenticationService) {

//     $rootScope.$on("$stateChangeStart",
//         function(event, toState, toParams, fromState, fromParams) {
//             if (toState.authenticate && !AuthenticationService.isLoggedIn()) {
//                 $state.go("login");
//                 event.preventDefault();
//             }
//         });
// });
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', '$interval', 'timer', 'Authentication', function ($scope, $interval, timer, Authentication) {
    $scope.authentication = Authentication;
    
    $scope.authenticated = (Authentication.user !== '');
    
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
      console.log($scope.tasks);
    };

    // Undo Mark Task Complete
    $scope.undoCompleteTask = function(task) {
      task.taskComplete = false;
    };

    // Auto-remove Completed Tasks on Timer Completion
    $scope.cleanCompleted = function() {
      //if ($scope.currentTime === 0) {
        for (var i in $scope.tasks) {
          if ($scope.tasks[i].taskComplete === true) {
            $scope.tasks.splice($scope.tasks[i], 1);
            $scope.tasks[i].$remove();
          }
        }
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
      };
  }

]);
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
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';


angular.module('core').service('timer', ["$interval", function timer($interval) {

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
  }]);
'use strict';

//Setting up route
angular.module('tasks').config(['$stateProvider',
	function($stateProvider) {
		// Tasks state routing
		$stateProvider.
		state('listTasks', {
			url: '/tasks',
			templateUrl: 'modules/tasks/views/list-tasks.client.view.html'
		}).
		state('createTask', {
			url: '/tasks/create',
			templateUrl: 'modules/tasks/views/create-task.client.view.html'
		}).
		state('viewTask', {
			url: '/tasks/:taskId',
			templateUrl: 'modules/tasks/views/view-task.client.view.html'
		}).
		state('editTask', {
			url: '/tasks/:taskId/edit',
			templateUrl: 'modules/tasks/views/edit-task.client.view.html'
		});
	}
]);
'use strict';

// Tasks controller
angular.module('tasks').controller('TasksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tasks',
	function($scope, $stateParams, $location, Authentication, Tasks) {
		$scope.authentication = Authentication;

		// Create new Task
		$scope.create = function() {
			// Create new Task object
			var task = new Tasks ({
				name: this.name
			});

			// Redirect after save
			task.$save(function(response) {
				$location.path('tasks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Task
		$scope.remove = function(task) {
			if ( task ) { 
				task.$remove();

				for (var i in $scope.tasks) {
					if ($scope.tasks [i] === task) {
						$scope.tasks.splice(i, 1);
					}
				}
			} else {
				$scope.task.$remove(function() {
					$location.path('tasks');
				});
			}
		};

		// Update existing Task
		$scope.update = function() {
			var task = $scope.task;

			task.$update(function() {
				$location.path('tasks/' + task._id);
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
	}
]);
'use strict';

//Tasks service used to communicate Tasks REST endpoints
angular.module('tasks').factory('Tasks', ['$resource',
	function($resource) {
		return $resource('tasks/:taskId', { taskId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);