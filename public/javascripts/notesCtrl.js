'use strict';

var app = angular.module('travelApp');

app.controller('notesCtrl', function($state, $scope, $localStorage, TravelFactory) {

	$scope.saveNote = function() {
		var location = $localStorage.location;
		TravelFactory.saveNote($scope.newNote, location);
		$scope.notes = $localStorage.notes;
		$scope.newNote = '';
	}

	$scope.deleteNote = function() {
		TravelFactory.deleteNote(this.note);
	}

	$scope.editNote = function() {
		this.note.editing = true;
	}

	$scope.saveEdit = function() {
		var location = $localStorage.location;
		this.note.editing = false;
		TravelFactory.saveEdit(this.note);
		TravelFactory.getLocaNotes(location);
		$scope.notes = $localStorage.notes;
	}

	$scope.goToDest = function() {
		$state.go('destinations');
	}

	$scope.notes = $localStorage.notes;
})