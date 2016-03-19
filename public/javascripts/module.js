'use strict';

var app = angular.module('travelApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('destinations', {
		url: '/destinations',
		templateUrl: '/html/destinations.html',
		controller: 'destCtrl'
	})
	.state('notes', {
		url: '/destinations/notes',
		templateUrl: '/html/notes.html',
		controller: 'notesCtrl'
	});
	$urlRouterProvider.otherwise('/destinations');
});

app.run(function(TravelFactory) {
	TravelFactory.getDestinations();
})