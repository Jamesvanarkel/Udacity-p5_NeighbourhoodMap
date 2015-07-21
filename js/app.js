'use strict';
/**
 *    @TITLE: OLD SKOOL AMSTERDAM MAP
 *    @AUTHOR: JAMES VAN ARKEL FOR UDACITY PROJECT 5
 *    @DATE: JULY 2015
 */
var Place = function (data) {
  var self = this;
  self.name = data.name;
  self.position = data.latLng;
  self.marker = '';
  self.selected = ko.observable(false);

  self.init = function () {
    self.createMarker();
  };

  self.createMarker = function () {
    self.marker = new google.maps.Marker({
      map: googleMap,
      position: self.position,
      animation: google.maps.Animation.DROP,
      icon: 'img/pin.png'
    });
  };

  self.addMarker = function () {
    self.marker.setMap(googleMap);
  };

  self.removeMarker = function () {
    self.marker.setMap(null);
  };
  self.select = function () {
    if (appView !== undefined) {
      appView.closeInfowindow();
      appView.selected(false);
    }
  };
  self.init();
};


var ViewModel = function () {
  var self = this;
  self.filterList = ko.observableArray();
  self.filterText = ko.observable();
  console.log(places());

  // Get the places out of the observable array in places.js and shoot them on the map
  self.search = function (data) {
    var filter = data();
    self.filterList.removeAll();
    self.removeMarkerAll();
    
    if (!filter) { filter = "";}
    for (var i = 0, len = places().length; i < len; i++) {
      if(places()[i].name.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
        places()[i].addMarker();  
        self.filterList.push(places()[i]);
      }
    }
  }
  self.removeMarkerAll = function () {
      
    for (var i = 0; i < places().length; i++) {
      places()[i].removeMarker();
    }
  
	};
  self.init = function () {
    MapInit();
    self.search(self.filterText);
  };
};
  
// Initialize Google Map
var googleMap;
function MapInit() {
  var mapOptions = {
    center: { lat: 52.3667, lng: 4.9000 },
    zoom: 13,
    panControl: false,
    scaleControl: true,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DEFAULT,
      mapTypeIds: [
        google.maps.MapTypeId.ROADMAP,
      ]
    },
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    }
  };
  googleMap = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
  // grab the styles out of the style.js to make the map awesome.
  googleMap.setOptions({ styles: styles });
};

// 1...2..3..GO!
var appView;
document.addEventListener("DOMContentLoaded", function (event) { 

  appView = new ViewModel();
  ko.applyBindings(appView);
  appView.init();

});
