
var HF = (function($){
	// server side search url
	var _PHP_URL = '/php/search.php';
	
	// variable to prevent multiple search ajax requests at the same time
	var _ajaxing = null;
	
	// make an ajax call to homefinder to search data
	var _search = function(params){
		// default arguments
		if(!params.errorCallback) params.errorCallback = function(){};
		if(!params.successCallback) params.successCallback = function(){};
		if(!params.data) params.data = '';
		
		if(!_ajaxing){
			// no search ajax going on, call search ajax
			_ajaxing = $.ajax({
				url: _PHP_URL,
				type: 'POST',
				data: params.data,
				dataType: 'json',
				error: function(data){
					params.errorCallback(data);
					
					// clear the way for next ajax
					_ajaxing = null;
				},
				success: function(data){
					params.successCallback(data);
					
					// clear the way for next ajax
					_ajaxing = null;
				}
			});
		}
	};
	
	return {
		search: _search
	};
})($);
