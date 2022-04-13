floodWarnings_Get()

function floodWarnings_Get(county) {
	url = 'http://environment.data.gov.uk/flood-monitoring/id/floods'
	// if county is passed a value when function is called, append county string to URL to filter results
	if (county != null){
		url += '?county=' + county
	}
	// jQuery get api request
    $.ajax({
		type: 'GET',
		url: url,
		success: function success(response) {
			// Convert response json to string and store success response in localstorage of browser
			var successResponse = JSON.stringify(response);
			localStorage.setItem('floodLogSuccess', successResponse);
			if (county != null){
				if (response.items.length == 0) {
					// if api response returns nothing, append no results template
					$("#tmplNoFloodLineResults").tmpl({}).appendTo("#pnlFloodsResults")
				} else {
					// append api reponse items array to tbody if county isn't null
					$("#tmplFloodLine").tmpl(response.items).appendTo("#pnlFloodsResults")

				}
			} else {
				// append api response items array to tbody if county is null
				$("#tmplFloodLine").tmpl(response.items).appendTo("#pnlFloods")
			}
        },
		error: function error(response) {
			// log error in console of browser
			console.log(response.status);
			// Convert json to string and store error response in localstorage of browser
			var errorResponse = JSON.stringify(response);
			localStorage.setItem('floodLogError', errorResponse);
		}

	});
}

$("#frmSearch").submit(function(e){
	// empty tbody of previous data
	$("#pnlFloodsResults").empty();
	// stop search box from refreshing list & page on submit
	e.preventDefault()
	floodWarnings_Get($("#txtSearch").val())
})