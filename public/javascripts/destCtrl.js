'use strict';

var app = angular.module('travelApp');

app.controller('destCtrl', function($scope, TravelFactory) {

	$scope.findLocation = function() {
		TravelFactory.findLocation($scope.trip);
	}

})