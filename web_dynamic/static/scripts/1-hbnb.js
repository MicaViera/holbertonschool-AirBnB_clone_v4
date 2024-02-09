$().ready(function () {
  const AmenitiesChecked = [];

  $('.amenities input[type="checkbox"]').change(function () {
    const IdAmenity = $(this).data('id');
    const NameAmenity = $(this).data('name');

    if ($(this).is(':checked')) {
      AmenitiesChecked.push({ data_amenity_id: IdAmenity, data_amenity_name: NameAmenity });
    } else {
      AmenitiesChecked = AmenitiesChecked.filter(function (amenity) {
        return amenity.data_amenity_id !== IdAmenity;
      });
    }

    const AmenitiesList = AmenitiesChecked.map(function (amenity) {
      return amenity.data_amenity_name;
    }).join(', ');
    $('.amenities h4').text('Amenities: ' + AmenitiesList);
  });
});
