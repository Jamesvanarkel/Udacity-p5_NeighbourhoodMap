'use strict';

/**
 * 
 * 
 * 
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
      position: self.position
    });
  };
  
  self.addMarker = function () {
    self.marker.setMap(googleMap);
  }
  
  self.select = function() {
		if (appView.currentPlace() !== undefined) {
			appView.currentPlace().closeInfowindow();
			appView.currentPlace().selected(false);
		}
  };
  self.init();
}


var ViewModel = function () {
  var self = this;
  self.filterList = ko.observableArray();
  console.log(places())
  
  self.search = function () {
    for (var i = 0, len = places().length; i < len; i++) {
      console.log(places())
        places()[i].addMarker();
        self.filterList.push(places()[i]);
    }
  }
  self.init = function () {
    MapInit();
    self.search();
  };
};
  
// Initialize Google Map
var googleMap;
function MapInit() {
  var mapOptions = {
    center: { lat: 52.3667, lng: 4.9000 },
    zoom: 14,
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