$().ready(function () {
  const AmenitiesChecked = [];
  function place_article(place) {
    return `
    <article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">${place.price_by_night}</div>
      </div>
      <div class="information">
        <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? "s" : ""}</div>
        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? "s" : ""}</div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? "s" : ""}</div>
      </div>
      <div class="description">
        ${place.description}
      </div>
    </article>`
  }

  function truncate(str, n){
    return (str.length > n) ? str.slice(0, n-1) + '\u2026' : str;
  };

  $('.amenities input[type="checkbox"]').change(function () {
    const IdAmenity = $(this).data('id');
    const NameAmenity = $(this).data('name');

    if ($(this).is(':checked')) {
      AmenitiesChecked.push({ id: IdAmenity, name: NameAmenity });
    } else {
      for(var i = 0; i < AmenitiesChecked.length; i++) {
        if(AmenitiesChecked[i].id == IdAmenity) {
          AmenitiesChecked.splice(i, 1);
          break;
        }
      }
    }

    console.log(AmenitiesChecked);
    const AmenitiesList = AmenitiesChecked.map(function (amenity) {
      return amenity.name;
    }).join(', ');
    $('.amenities h4').text(truncate(AmenitiesList, 40));
  });

  $.get("http://0.0.0.0:5001/api/v1/status/",  function(data, status){
    if(status == 'success')
      $("#api_status").addClass("available")
    else
      $("#api_status").removeClass("available")
  });

  $.ajax("http://0.0.0.0:5001/api/v1/places_search/", {
    data : JSON.stringify({}),
    contentType : 'application/json',
    type : 'POST'
  }).done(function(data){
    places_html = ``
    console.log(data);
    // places = JSON.parse(data);
    for(var i = 0; i < data.length ; i++) {
      places_html += place_article(data[i]);
    }
    $('.places').html(places_html);
    console.log(places_html)
  });

});
