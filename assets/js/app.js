'use strict';
/**
 *    @TITLE: OLD SKOOL AMSTERDAM MAP
 *    @AUTHOR: JAMES VAN ARKEL FOR UDACITY PROJECT 5
 *    @DATE: JULY 2015
 */
var Place = function (data) {
  var self = this;
  self.name = data.name;
  self.ll = data.ll;
  self.city = data.city;
  self.country = data.country;
  self.title = data.title;
  self.position = data.latLng;
  self.marker = '';
  self.infowindow = '';
  self.selected = ko.observable(false);

  //Init on place object
  self.init = function () {
    self.createMarker();
    self.createInfowindow();
  };
  //Put the marker on its place
  self.createMarker = function () {

    self.marker = new google.maps.Marker({
      map: googleMap,
      position: self.position,
      animation: google.maps.Animation.DROP,
      icon: 'public/img/pin.png'
    });
    google.maps.event.addListener(self.marker, 'click', self.select);
    
  };

  // funtion to open the info window once a location is clicked
  self.createInfowindow = function () {
    //ko template in html ?
    var foursquareTitle = '<h4>Foursquare Explore</h4>';
    var foursquareVenuesList = '<ul>' +
      '<li class="foursquare-venues-list" id="1">: )</li>' +
      '<li class="foursquare-venues-list" id="2">: )</li>' +
      '<li class="foursquare-venues-list" id="3">: )</li>' +
      '<li class="foursquare-venues-list" id="4">: )</li>' +
      '<li class="foursquare-venues-list" id="5">: )</li>' +
      '</ul>';

    var foursquareDiv = foursquareTitle + foursquareVenuesList;

    self.infowindow = new google.maps.InfoWindow();
    self.infowindow.setContent('<h3>' + self.title + '</h3>' + foursquareDiv);

  };

  self.addInfowindow = function () {
    self.infowindow.open(googleMap, self.marker);
    self.foursquare();
    
  };

  self.closeInfowindow = function () {
    self.infowindow.close();
  };

  //Add the marker to the map
  self.addMarker = function () {
    self.marker.setMap(googleMap);
  };

  //Delete the marker 
  self.removeMarker = function () {
    self.marker.setMap(null);
  };

  //Select the marker
  self.select = function () {
    if (appView.currentPlace() !== undefined) {
      appView.currentPlace().closeInfowindow();
      appView.currentPlace().selected(false);
    }
    
    appView.cordinates = self.position;
    appView.city = self.title;
    appView.country = self.country;
    appView.currentPlace(self);

    self.selected(true);
    appView.currentPlace().addInfowindow();
  };
  
  self.foursquare = function () {
    var FSClientId = 'EVZX4ZX3OZVYDY1FIRF3Y3TNYID0OQDPLZ50AFCFILCMRJCF';
    var FSClientSecret = 'NAOIZSQHDOAF0ARADE04ENNQ2YW1UXDHDG5CS2LC1RAJNOL2';
    var requestURL = 'https://api.foursquare.com/v2/venues/search?client_id=' +
                      FSClientId + '&client_secret=' + FSClientSecret +
                      '&v=20130815&limit=6&ll=' + self.ll;

    $.getJSON(requestURL, function (data) {
      for (var i = 0; i < data.response.venues.length; i++) {
        var listID = '.foursquare-venues-list' + '#' + i;
        if (data.response.venues[i].name) {
          $(listID).html(data.response.venues[i].name);
        }
      }
    }).fail(function () {
      alert('Cannot get Foursquare explores!');
    });
  };

  self.init();
};


var ViewModel = function () {
  var self = this;
  self.filterList = ko.observableArray();
  self.filterText = ko.observable();
  console.log(places());
  self.currentPlace = ko.observable();
  self.cordinates = ko.observable("52.3667/4.9000");
  self.country = ko.observable("The Netherlands");
  self.city = ko.observable("Amsterdam");
  
  // Get the places out of the observable array in places.js and shoot them on the map
  self.search = function (data) {
    var filter = data();
    self.filterList.removeAll();
    self.removeMarkerAll();

    if (!filter) { filter = ""; }
    for (var i = 0, len = places().length; i < len; i++) {
      if (places()[i].name.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
        places()[i].addMarker();
        self.filterList.push(places()[i]);
      };
    };
  };

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
  }
  
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
