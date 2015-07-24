var places = ko.observableArray([
  new Place(
    {
      title: "School",
      name: "HvA Theo Thijssenhuis",
      latLng: new google.maps.LatLng(52.3604849, 4.9078866),
      ll: "52.3604849,4.9078866",
      city: "Amsterdam",
      country: "Netherlands"
    }
    ),
  new Place(
    {
      title: "Work",
      name: "Yellowbrick",
      latLng: new google.maps.LatLng(52.36041849, 4.9000),
      ll: "52.36041849,4.9000",
      city: "Amsterdam",
      country: "Netherlands"
    }
    ),
  new Place(
    {
      title: "Central Station, Amsterdam",
      name: "Central Station",
      latLng: new google.maps.LatLng(52.379189, 4.899431),
      ll: "52.379189,4.899431",
      city: "Amsterdam",
      country: "Netherlands"
    }
    )
]);
