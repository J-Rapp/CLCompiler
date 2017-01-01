if (typeof MegsList === 'undefined') {
  MegsList = {};
}

$(document).ready(function() {
  MegsList.dynamicAreaCheckboxes();
})

MegsList.dynamicAreaCheckboxes = function() {
  var onLoadDistrictAreas = $('div[data-district-id="1"]')

  onLoadDistrictAreas.removeClass('hidden')

  $('#districts_name').change(function(event) {
    var selectedDistrictID = $('#districts_name').val()
    var allAreaDivs = $('div[data-district-id]')

    allAreaDivs.addClass('hidden')
    unhideDistrictAreas(selectedDistrictID)
  });

  function unhideDistrictAreas(selectedDistrictID) {
    var districtAreasSelector = 'div[data-district-id="' + selectedDistrictID + '"]'
    var districtAreaDivs = $(districtAreasSelector)
    districtAreaDivs.removeClass('hidden')
  }

}
