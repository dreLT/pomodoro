'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider
		
		.state('home', {
			url: '/',
			views: {
				'': {
					templateUrl: 'modules/core/views/home.client.view.html',
					controller: 'HomeController'				
				},
				'taskList@home': {
					templateUrl: 'modules/core/views/tasklist.client.view.html',
					controller: 'TaskListController'					
				}
			}
		})

		.state('shortbreak', {
			url: '/shortbreak',
			controller: 'ShortBreakController',
			templateUrl: 'modules/core/views/home.client.view.html'
		})

		.state('longbreak', {
			url: '/longbreak',
			controller: 'LongBreakController',
			templateUrl: 'modules/core/views/home.client.view.html'
		})

	}
]);