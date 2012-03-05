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
	var _$searchZip = null;
	var _$searchCity = null;
	var _$searchState = null;
	var _$searchPgNum = null;
	var _$searchResults = null;
	var _$searchLoading = null;
	var _$resultMessage = null;
	var _$resultTotal = null;
	var _$resultPage = null;
	var _$resultPages = null;
	var _$resultList = null;
	var _$pageBack = null;
	var _$pageFwd = null;
	var _$listingInfo = null;
	var _$listingInfoDetails = null;
	var _$listingInfoClose = null
	
	// initialize jquery vars			
	var _initVars = function(){
		_$searchForm = $('#search');
		_$searchZip = $('#search_zip');
		_$searchCity = $('#search_city');
		_$searchState = $('#search_state');
		_$searchPgNum = $('#search_page_num');
		_$searchResults = $('#search_results');
		_$searchLoading = $('#search_loading');
		_$resultMessage = $('#result_message');
		_$resultTotal = $('#result_total');
		_$resultPage = $('#result_page');
		_$resultPages = $('#result_pages');
		_$resultList = $('#result_list');
		_$pageBack = $('#page_back');
		_$pageFwd = $('#page_fwd');
		_$listingInfo = $('#listing_info');
		_$listingInfoDetails = $('#listing_info_details');
		_$listingInfoClose = $('#listing_info_close');
	};
	
	// search again with page number changed by change value
	var _pg = function(change){
		var pgNum = parseInt(_$resultPage.html());
		var maxNum = parseInt(_$resultPages.html());
		pgNum += change;
		if(0 < pgNum && pgNum <= maxNum){
			_$searchPgNum.val(pgNum);
			_$searchForm.submit();
		}
	};
	
	var _closeListingInfo = function(){
		_$listingInfo.hide();
		_$listingInfoDetails.html('');
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
				beforeSend: function(){
					_closeListingInfo();
					_$searchResults.hide();
					_$resultList.html('');
					
					Main.clearMarkers();
					Main.changeViewport(_$searchCity.val() + " " + _$searchState.val() 
									+ " " + _$searchZip.val());
					
					_$searchLoading.show();
					
					params.beforeCallback();
				},
				error: params.errorCallback,
				success: params.successCallback,
				complete: function(jqXHR, textStatus){
					params.completeCallback(jqXHR, textStatus);
					
					// clear the way for next ajax
					_ajaxing = null;
					
					_$searchLoading.hide()
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
		var photoUrl = null;
		if(listing.primaryPhoto){
			photoUrl = Utils.processUrl(listing.primaryPhoto.url);
		}
		var addressLine1 = (listing.address.line1 ? listing.address.line1 + ' ' : '');
		var addressCity = (listing.address.city ? listing.address.city + ' ' : '');
		var addressState = (listing.address.state ? listing.address.state + ' ' : '');
		var addressZip = (listing.address.zip ? listing.address.zip + ' ' : '');
		var idPrefix = 'listing_' + listing.id;
		var html = '<div id="' + idPrefix +'" class="listing">'
			 		+ '<div id="' + idPrefix + '_address_lat" class="listing-lat">' + listing.address.latitude + '</div>'
			 		+ '<div id="' + idPrefix + '_address_lng" class="listing-lng">' + listing.address.longitude + '</div>'
					+ '<div id="' + idPrefix + '_short" class="listing-short">'
						+ '<div id="' + idPrefix + '_short_address" class="listing-short-address">' 
					 		+ '<span id="' + idPrefix + '_short_address_line1">' + addressLine1 + ' </span>'
					 		+ '<span id="' + idPrefix + '_short_address_city">' + addressCity + ' </span>'
					 		+ '<span id="' + idPrefix + '_short_address_state">' + addressState + ' </span>'
					 		+ '<span id="' + idPrefix + '_short_address_zip">' + addressZip + '</span>'
					 	+ '</div>'
					 	+ '<div id="' + idPrefix + '_short_price" class="listing-short-price">$' + listing.price + '</div>'
					+ '</div>'
					+ '<div id="' + idPrefix + '_long" class="listing-long">'
					 	+ '<div id="' + idPrefix + '_address" class="listing-long-address">' 
					 		+ '<span id="' + idPrefix + '_address_line1">' + addressLine1 + '</span>'
					 		+ '<span id="' + idPrefix + '_address_city">' + addressCity + ' </span>'
					 		+ '<span id="' + idPrefix + '_address_state">' + addressState + ' </span>'
					 		+ '<span id="' + idPrefix + '_address_zip">' + addressZip + '</span>'
					 	+ '</div>'
					 	+ '<div class="listing-upper">' 
						 	+ '<div id="' + idPrefix + '_img_container" class="listing-img">'
						 		+ '<img id="' + idPrefix + '_img" src="' + photoUrl + '"/>'
						 	+ '</div>'
						 	+ '<div id="' + idPrefix + '_description">' + (listing.description ? listing.description : '') + '</div>'
					 	+ '</div>'
					 	+ '<div class="listing-lower">' 
						 	+ '<div id="' + idPrefix + '_type">Type: ' + listing.type + '</div>'
						 	+ '<div id="' + idPrefix + '_bed" class="listing-long-bed">' + listing.bed + ' bedrooms</div>'
						 	+ '<div id="' + idPrefix + '_bath" class="listing-long-bath">'
						  		+ '<span id="' + idPrefix + '_bath_full">' 
						  			+ (listing.bath && listing.bath.full ? listing.bath.full : 0) 
						  		+ ' full baths, </span>'
						  		+ '<span id="' + idPrefix + '_bath_half">' 
						  			+ (listing.bath && listing.bath.half ? listing.bath.half : 0) 
						  		+ ' half baths</span>'
						  	+ '</div>'
						  	+ '<div id="' + idPrefix + '_squareFootage">' 
						  		+ (listing.squareFootage ? listing.squareFootage + ' sq ft': '') 
						  	+ '</div>'
						  	+ '<div id="' + idPrefix + '_price">$' + listing.price + '</div>'
					 	+ '</div>'
					 + '</div>'
				 + '</div>';
		var $listing = $(html);
		// add listing to list
		_$resultList.append($listing);
		
		// bulid actions
		var $shortListing = $('#' + idPrefix + '_short');
		var $longListing = $('#' + idPrefix + '_long');
		$shortListing.click(function(e){
			_$listingInfoDetails.html($longListing.html());
			_$listingInfo.show();
			Main.changeViewport(addressLine1 + addressCity + addressState + addressZip);
		});
		
		// create google maps marker
		if(Main.getMap){
			var marker = new google.maps.Marker({
				cursor: 'pointer',
				optimized: false,
				title: addressLine1 + addressCity + addressState + addressZip,
				map: Main.getMap(),
				position: new google.maps.LatLng(listing.address.latitude,
												listing.address.longitude)
			});
			
			// when marker is clicked open listing details
			google.maps.event.addListener(marker, 'click', function() {
				_$listingInfoDetails.html($longListing.html());
				_$listingInfo.show();
			});
			
			Main.addMarker(marker);
		}
		
		return $listing;
	};
	
	// set up search form
	var _initSearch = function(e){
		_$searchForm.submit(function(e){
			e.preventDefault();
			_search({
				data: _$searchForm.serialize(),
				errorCallback: _searchError,
				successCallback: _searchSuccess,
			});
		});
		
		_$searchPgNum.val(0);
		
		_$pageBack.click(function(e){
			_pg(-1);
		});
		
		_$pageFwd.click(function(e){
			_pg(1);
		});
		
		_$listingInfoClose.click(function(e){
			_closeListingInfo();
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
