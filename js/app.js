function init() {
  var mapOptions = {
    center: { lat: 52.3667, lng: 4.9000},
    zoom: 15
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
  var marker = new google.maps.Marker({
    position: { lat: 52.3667, lng: 4.9000 },
    map: map,
    title: 'testing',
    animation: google.maps.Animation.DROP
  })
}
google.maps.event.addDomListener(window, 'load', init);