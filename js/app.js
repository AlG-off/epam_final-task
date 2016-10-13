'use strict';

var app = angular.module('app', ['ui.router', 'ui.mask'])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$urlRouterProvider.otherwise('/items');

			$stateProvider
				.state('site', {
				abstract: true
				}).state('items', {
					parent: 'site',
					url: '/items',
					views: {
						'content@': {
							templateUrl: 'pages/home.html',
							controller: 'HomeCtrl'
						}
					}
				}).state('login', {
					parent: 'site',
					url: '/login',
					data: {
						noLogin: true
					},
					views: {
						'content@': {
							templateUrl: 'pages/login.html',
							controller: 'LoginCtrl as login'
						}
					}
				}).state('add', {
					parent: 'items',
					url: '/add',
					views: {
						'content@': {
							templateUrl: 'pages/edit.html',
							controller: 'EditCtrl'
						}
					}
				}).state('edit', {
				parent: 'items',
				url: '/edit/:id',
				views: {
					'content@': {
						templateUrl: 'pages/edit.html',
						controller: 'EditCtrl'
					}
				}
				});
		}
	])
	.run(['$rootScope', '$state', '$stateParams', 'AuthService',
		function($rootScope, $state, $stateParams, AuthService) {
			$rootScope.$on('$stateChangeStart',
				function(event, toState, toStateParams) {
					$rootScope.toState = toState;
					$rootScope.toStateParams = toStateParams;
					AuthService.checkAccess(event, toState);
			});
		}
	]);