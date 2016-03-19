'use strict';

var app = angular.module('travelApp');

app.controller('destCtrl', function($scope, $state, TravelFactory) {

	TravelFactory.getDestinations();

	$scope.findLocation = function() {
		TravelFactory.findLocation($scope.trip);
	}
});