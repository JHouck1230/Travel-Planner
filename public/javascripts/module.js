'use strict';

var app = angular.module('travelApp', ['ui.router', 'ngStorage']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('destinations', {
		url: '/destinations',
		templateUrl: '/html/destinations.html',
		controller: 'destCtrl'
	})
	.state('notes', {
		url: '/destinations/notes/:location',
		templateUrl: '/html/notes.html',
		controller: 'notesCtrl'
	});
	$urlRouterProvider.otherwise('/destinations');
});