$(document).ready(function(e){
	HF.ready(e);
});

var HF = (function($){
	// server side search url
	var _PHP_URL = '/homefinder/search.php';
	var _A_LOT_OF_LISTINGS = 500;
	
	// variable to prevent multiple search ajax requests at the same time
	var _ajaxing = null;
	
	var _$searchForm = null;
	var _$searchResults = null;
	var _$searchLoading = null;
	var _$resultMessage = null;
	var _$resultTotal = null;
	var _$resultPage = null;
	var _$resultPages = null;
	var _$resultList = null;
	
	// initialize jquery vars			
	var _initVars = function(){
		_$searchForm = $('#search');
		_$searchResults = $('#search_results');
		_$searchLoading = $('#search_loading');
		_$resultMessage = $('#result_message');
		_$resultTotal = $('#result_total');
		_$resultPage = $('#result_page');
		_$resultPages = $('#result_pages');
		_$resultList = $('#result_list');
	};
	
	// make an ajax call to homefinder to search data
	var _search = function(params){
		// default arguments
		if(!params.beforeCallback) params.beforeCallback = function(){};
		if(!params.errorCallback) params.errorCallback = function(){};
		if(!params.successCallback) params.successCallback = function(){};
		if(!params.completeCallback) params.completeCallback = function(){};
		if(!params.data) params.data = '';
		
		if(!_ajaxing){
			// no search ajax going on, call search ajax
			_ajaxing = $.ajax({
				url: _PHP_URL,
				type: 'POST',
				data: params.data,
				dataType: 'json',
				beforeSend: params.beforeCallback,
				error: params.errorCallback,
				success: params.successCallback,
				complete: function(jqXHR, textStatus){
					params.completeCallback(jqXHR, textStatus);
					
					// clear the way for next ajax
					_ajaxing = null;
				}
			});
		}
	};
	
	// deal with an error during search
	var _searchError = function(data){
		_$resultMessage.html('An error occured while searching, please try again!');
		_$resultMessage.show();
	};
	
	// deal with a successful search
	var _searchSuccess = function(data){
		if(data.status !== 200){
			// an error occured, display first one to user
			_$resultMessage.html(data.errors[0].message);
			_$resultMessage.show();
		} else {
			// success! display data
			_$resultMessage.hide();
			
			var listingMsg = "I found " + data.total + " listings!";
			if(data.total > _A_LOT_OF_LISTINGS){
				listingMsg += " Perhaps you should refine your search criteria?";
			}
			
			_$resultTotal.html(listingMsg);
			_$resultPage.html(data.page);
			_$resultPages.html(data.pages);
			
			var len = data.listings.length;
			for(var i = 0; i < len; i++){
				_$buildListing(data.listings[i]);
			}
			
			// show results section
			_$searchResults.show();
		}
	};
	
	// build a single listing and add it to results, then place a marker on gmap
	var _$buildListing = function(listing){
		
		// create listing for result list
		var photoUrl = Utils.processUrl(listing.primaryPhoto.url);
		var idPrefix = 'listing_' + listing.id;
		var html = '<div id="' + idPrefix +'" class="listing">'
			 		+ '<div id="' + idPrefix + '_address_lat" class="listing-lat">' + listing.address.latitude + '</div>'
			 		+ '<div id="' + idPrefix + '_address_lng" class="listing-lng">' + listing.address.longitude + '</div>'
					+ '<div id="' + idPrefix + '_short" class="listing-short">'
						+ '<div id="' + idPrefix + '_address">' 
					 		+ '<span id="' + idPrefix + '_address_line1">' + listing.address.line1 + ', </span>'
					 		+ '<span id="' + idPrefix + '_address_city">' + listing.address.city + ', </span>'
					 		+ '<span id="' + idPrefix + '_address_state">' + listing.address.state + ' </span>'
					 		+ '<span id="' + idPrefix + '_address_zip">' + listing.address.zip + '</span>'
					 	+ '</div>'
					 	+ '<div id="' + idPrefix + '_price">' + listing.price + '</div>'
					+ '</div>'
					+ '<div id="' + idPrefix + '_long" class="listing-long">'
					 	+ '<div id="' + idPrefix + '_img_container">'
					 		+ '<img id="' + idPrefix + '_img" src="' + photoUrl + '"/>'
					 	+ '</div>'
					 	+ '<div id="' + idPrefix + '_address">' 
					 		+ '<span id="' + idPrefix + '_address_line1">' + listing.address.line1 + ', </span>'
					 		+ '<span id="' + idPrefix + '_address_city">' + listing.address.city + ', </span>'
					 		+ '<span id="' + idPrefix + '_address_state">' + listing.address.state + ' </span>'
					 		+ '<span id="' + idPrefix + '_address_zip">' + listing.address.zip + '</span>'
					 	+ '</div>'
					 	+ '<div id="' + idPrefix + '_type">' + listing.type + '</div>'
					 	+ '<div id="' + idPrefix + '_bed">' + listing.bed + '</div>'
					 	+ '<div id="' + idPrefix + '_bath">'
					  		+ '<div id="' + idPrefix + '_bath_full">f: ' + listing.bath.full + '</div>'
					  		+ '<div id="' + idPrefix + '_bath_half">h: ' + listing.bath.half + '</div>'
					  	+ '</div>'
					  	+ '<div id="' + idPrefix + '_squareFootage">' + listing.squareFootage + '</div>'
					  	+ '<div id="' + idPrefix + '_description">' + listing.description + '</div>'
					  	+ '<div id="' + idPrefix + '_price">$' + listing.price + '</div>'
					 	+ '<div id="' + idPrefix + '_bed">' + listing.bed + '</div>'
					 	+ '<div id="' + idPrefix + '_bed">' + listing.bed + '</div>'
					 + '</div>'
				 + '</div>';
		var $listing = $(html);
		// add listing to list
		_$resultList.append($listing);
		
		// create google maps marker
		
		return $listing;
	};
	
	// set up search form
	var _initSearch = function(e){
		_$searchForm.submit(function(e){
			e.preventDefault();
			_search({
				data: _$searchForm.serialize(),
				beforeCallback: function(){
					_$searchResults.hide();
					_$resultList.html('');
					_$searchLoading.show();
				},
				errorCallback: _searchError,
				successCallback: _searchSuccess,
				completeCallback: function(){
					_$searchLoading.hide();
				}
			});
		});
	}
	
	return {
		ready: function(e){
			_initVars();
			_initSearch();
		},
		search: _search
	};
})($);
