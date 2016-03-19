'use strict';

var app = angular.module('travelApp');

app.factory('TravelFactory', function($http, $state, $localStorage) {

	var destinations = [];
	var coords = [];
	var pins = [];

	function getDestinations() {
	  $http.get('/travel/')
		.then(function(res) {
			destinations = res.data;
			console.log('res.data: ', res.data);
			destinations.forEach(function(dest) {
				getCoords(dest.location, dest.name, res.data);
			});
		}, function(err) {
			console.error('err: ', err);
		})
	}

	function getCoords(address, name, data) {
    if(!address) return;
    var geocoder = new google.maps.Geocoder();
    if (geocoder) {
      geocoder.geocode({
        'address': address
      }, function (results, status) {
      	var mark = {
      		name: name,
      		location: results[0].formatted_address,
      		lat: results[0].geometry.location.lat(),
      		lng: results[0].geometry.location.lng()
      	};
      	coords.push(mark);
      	console.log('mark: ', mark);
      	if(coords.length === data.length) placePins();
      });
    }
	}

	function placePins() {
		var earth = WE.map('earth_div');
		var bounds = [[35.98245136, -112.26379395], [36.13343831, -112.10998535]];
		var osm = WE.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
      attribution: 'Tiles Courtesy of MapQuest'
    }).addTo(earth);
    var grandcanyon = WE.tileLayer('http://tileserver.maptiler.com/grandcanyon/{z}/{x}/{y}.png', {
      bounds: bounds,
      minZoom: 10,
      maxZoom: 16
    });
    grandcanyon.addTo(earth);
    var numCoords = coords.length
		for (var i = 0; i < numCoords; i++) {
			console.log('coords[i].location: ', coords[i].location, ' coords[i].lat: ', coords[i].lat, ' coords[i].lng: ', coords[i].lng);
			pins[i] = WE.marker([coords[i].lat, coords[i].lng]).addTo(earth);
			pins[i].bindPopup(`<b>${coords[i].name}</b><button class='btn btn-xs btn-danger'><span class='glyphicon glyphicon-remove'></span></button><br>
												<span>${coords[i].location}</span><br>
												<span><small>Click for Notes</small></span>`, 
												{ maxWidth: 150, closeButton: false });
			document.getElementsByClassName('btn-danger')[i].addEventListener("click", deleteLocation);
			document.getElementsByClassName('we-pp-wrapper')[i].addEventListener("click", goToNotes);
		}
		console.log('pins: ', pins);
		earth.setView([coords[numCoords - 1].lat, coords[numCoords - 1].lng], 6);
	}

	function findLocation(trip) {
		var address = trip.location;
		if(!address) return;
    var geocoder = new google.maps.Geocoder();
    if (geocoder) {
      geocoder.geocode({
        'address': address
      }, function (results, status) {
      	var mark = {
      		location: results[0].formatted_address,
      		lat: results[0].geometry.location.lat(),
      		lng: results[0].geometry.location.lng()
      	};
      	coords.push(mark);
      	saveLocation(trip.name, mark.location);
      });
    }
	}

	function saveLocation(name, location) {
		var data = {
			name: name,
			location: location	
		};
		$http.post(`/travel/destinations`, data)
		.then(function(res) {
			getDestinations();
		}, function(err) {
			console.error(err);
		});
	};

	function deleteLocation(event) {
		event.stopPropagation();
		var pin = this.parentNode.parentNode.parentNode.parentNode;
		var location = this.parentElement.querySelectorAll('span')[1].innerHTML;
		$http.delete(`/travel/destinations/${location}`, location)
		.then(function(res) {
			pin.remove()
		});
	};

	function goToNotes() {
		var location = this.querySelectorAll('span')[1].innerHTML;
		console.log('goToNotes: ', location);
		$state.go('notes', {
			location: location
		});
		$http.get(`/travel/destinations/notes/${location}`)
		.then(function(res) {
			res.data.forEach((note) => note.editing = false);
			$localStorage.notes = res.data;
			$localStorage.location = location;
		}, function(err) {
			console.error(err);
		});
	};

	function saveNote(newNote, location) {
		var note = {
			activity: newNote,
			location: location
		};
		$http.post('/travel/destinations/notes', note)
		.then(function(res) {
		}, function(err) {
			console.error(err);
		});
	};

	function getLocaNotes(location) {
		$http.get(`/travel/destinations/notes/${location}`)
		.then(function(res) {
			$localStorage.notes = res.data;
			console.log('get notes: ', res.data);
		}, function(err) {
			console.error(err);
		})
	}

	function deleteNote(note) {
		$http.delete(`/travel/destinations/notes/${note.id}`)
		.then(function(res) {
			$localStorage.notes.splice($localStorage.notes.indexOf(note), 1);
		}, function(err) {
			console.error(err);	
		})
	}

	function saveEdit(edits) {
		var note = {
			location: edits.location,
			activity: edits.activity
		}
		$http.put(`/travel/destinations/notes/${edits.id}`, note)
		.then(function(res) {
		}, function(err) {
			console.error(err);
		}) 
	}

	return {
		getDestinations: getDestinations,
		getCoords: getCoords,
		saveLocation: saveLocation,
		deleteLocation: deleteLocation,
		findLocation: findLocation,
		saveNote: saveNote,
		getLocaNotes: getLocaNotes,
		deleteNote: deleteNote,
		saveEdit: saveEdit
	};
})