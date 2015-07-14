var markers = [
  {
    title: 'testing',
    position: { lat: 52.3667, lng: 4.9000 }
  },
  {
    title: 'testing',
    position: { lat: 52.3667, lng: 4.9000 }
  }
]
var Map = function (data) {
  
  this.lat = ko.observalble(data.position.lat);
  this.lng = ko.observalble(data.position.lng);
  this.title = ko.observabable(data.title);
  
}
function init() {
  var mapOptions = {
    center: { lat: 52.3667, lng: 4.9000},
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
  var styles = [
    {
      "featureType": "administrative",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "landscape",
      "stylers": [
        { "color": "#ffffff" }
      ]
    },{
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road",
      "stylers": [
        { "color": "#000000" },
        { "visibility": "simplified" },
        { "weight": 0.4 }
      ]
    },{
      "featureType": "transit",
      "stylers": [
        { "visibility": "simplified" }
      ]
    },{
      "featureType": "water",
      "stylers": [
        { "visibility": "simplified" },
        { "color": "#eeeeee" }
      ]
    },{
      "elementType": "labels.icon",
      "stylers": [
        { "visibility": "on" }
      ]
    },{
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        { "visibility": "on" },
        { "weight": 0.1 },
        { "color": "#000000" }
      ]
    },{
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#808080" },
        { "weight": 0.1 }
      ]
    },{
    },{
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
    }
  ]


  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
    map.setOptions({styles: styles});
  var marker = new google.maps.Marker({
    position: { lat: 52.3667, lng: 4.9000 },
    map: map,
    title: 'testing',
    animation: google.maps.Animation.DROP
  })
}

google.maps.event.addDomListener(window, 'load', init);

var ViewModel = function () {
  var self = this;
  
}

ko.applyBindings(new ViewModel());