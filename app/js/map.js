//
//  Google Maps Script
//
var map;

google.maps.event.addDomListener(window, 'load', init);

function init() {
    var mapOptions = {
      center: new google.maps.LatLng(40.376225,-80.624137),
        //center: new google.maps.LatLng(37.509726,-81.016847),
        zoom: 5,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        scrollwheel: false,
        panControl: false,
        streetViewControl: false,
        draggable : true,
        overviewMapControl: false,
        overviewMapControlOptions: {
            opened: false,
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        styles: [
{
"featureType": "administrative",
"elementType": "labels.text",
"stylers": [
{
    "color": "#1f2a44"
}
]
},
{
"featureType": "administrative",
"elementType": "labels.text.fill",
"stylers": [
{
    "color": "#1f2a44"
}
]
},
{
"featureType": "administrative",
"elementType": "labels.text.stroke",
"stylers": [
{
    "hue": "#ff8300"
},
{
    "visibility": "off"
}
]
},
{
"featureType": "landscape",
"elementType": "all",
"stylers": [
{
    "color": "#f2f2f2"
}
]
},
{
"featureType": "poi",
"elementType": "all",
"stylers": [
{
    "visibility": "off"
}
]
},
{
"featureType": "road",
"elementType": "all",
"stylers": [
{
    "saturation": -100
},
{
    "lightness": 45
}
]
},
{
"featureType": "road.highway",
"elementType": "all",
"stylers": [
{
    "visibility": "simplified"
}
]
},
{
"featureType": "road.highway",
"elementType": "geometry.fill",
"stylers": [
{
    "visibility": "on"
},
{
    "color": "#1f2a44"
}
]
},
{
"featureType": "road.highway",
"elementType": "geometry.stroke",
"stylers": [
{
    "visibility": "on"
},
{
    "color": "#1f2a44"
}
]
},
{
"featureType": "road.arterial",
"elementType": "labels.icon",
"stylers": [
{
    "visibility": "off"
}
]
},
{
"featureType": "transit",
"elementType": "all",
"stylers": [
{
    "visibility": "off"
}
]
},
{
"featureType": "water",
"elementType": "all",
"stylers": [
{
    "color": "#46bcec"
},
{
    "visibility": "on"
}
]
},
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
          "color": "#1f2a44"
      }
    ]
  },
  {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#fafafa"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
],
    };
    var mapElement = document.getElementById('custom-map');
    map = new google.maps.Map(mapElement, mapOptions);
    var infowindow, thisMarker, infoWindowTemplate;
    var locations = [
      ['Franciscan Square', 'University Blvd', 'Steubenville, OH', 'P: ', 'example@franciscansquare.com', 'F: ', 40.373540, -80.621864, 'img/map-marker.svg'],
    ];

    for (var i = 0; i < locations.length; i++) {
      if (locations[i][1] =='undefined'){ addressLine1 ='';} else { addressLine1 = locations[i][1];}
      if (locations[i][2] =='undefined'){ addressLine2 ='';} else { addressLine2 = locations[i][2];}
      if (locations[i][3] =='undefined'){ telephone ='';} else { telephone = locations[i][3];}
      if (locations[i][4] =='undefined'){ email ='';} else { email = locations[i][4];}
      if (locations[i][5] =='undefined'){ fax ='';} else { fax = locations[i][5];}
      if (locations[i][8] =='undefined'){ markericon ='';} else { markericon = locations[i][8];}
        marker = new google.maps.Marker({
            icon: markericon,
            position: new google.maps.LatLng(locations[i][6], locations[i][7]),
            map: map,
            title: locations[i][0],
            add1: addressLine1,
            add2: addressLine2,
            tel: telephone,
            email: email,
            fax: fax
        });

        infoWidowTemplate = `
          <div class="info-container">
            <span class="marker-name">${marker.title}</div>
            <span class="marker-address">${marker.add1}</div>
            <span class="marker-address">${marker.add2}</div>
            <span class="marker-tel">${marker.tel}</div>
            <span class="marker-fax">${marker.fax}</div>
            <span class="marker-email">${marker.email}</div>
          </div>
        `;

        infowindow = new google.maps.InfoWindow({
          content: infoWidowTemplate
        });
// TODO max the corresponding card with location info pop out on hover match up a field with the card class
        // google.maps.event.addListener(marker, 'mouseover', function() {
        //   //Code in here runs on mouseover of a marker
        //   infowindow.open(map, this);
        // });
        //
        // google.maps.event.addListener(marker, 'mouseout', function() {
        //   //Code in here runs on mouseover of a marker
        //   infowindow.close(map, this);
        // });

        google.maps.event.addListener(marker,'click', (function(marker,infoWidowTemplate,infowindow){
    return function() {
        infowindow.setContent(infoWidowTemplate);
        infowindow.open(map,marker);
    };
    })(marker,infoWidowTemplate,infowindow));

//     google.maps.event.addListener(marker,'mouseout', (function(marker,infoWidowTemplate,infowindow){
// return function() {
//     infowindow.close(map,marker);
//   };

//})(marker,infoWidowTemplate,infowindow));


link = '';     }

}

// function waitMaps() {
//   if (map !== undefined) {
//     resizeMap();
//   } else {
//     setTimeout(waitMaps, 200);
//   }
// }
//
// waitMaps();

var center;
function resizeMap() {
  center = map.getCenter();
	google.maps.event.trigger(map, "resize"); //this fix the problem with not completely map
	map.setCenter(center);
}

//
// End Maps Script
//

//Enable touch and drag zoom on tap
$(function(){
  $('.map-col').click(function(){
    $('#custom-map').css('pointer-events', 'inherit');
  });
});
