$().ready(function () {
  const AmenitiesChecked = [];

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
    $('.amenities h4').text('Amenities: ' + truncate(AmenitiesList, 50));
  });
});
