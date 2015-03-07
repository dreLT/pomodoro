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