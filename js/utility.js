
var Utils = (function($){
	return {
		/**
		 * Process a given url so it displays properly on website.
		 * 
		 * @param string url	the url to process
		 * @returns processed URL ready for use
		 */
		processUrl: function(url){
			url = url.replace('\\',url);
			return url;
		},
		
		/**
		 * Set up a form for ajax submission.
		 * 
		 * @param string formId			Id of form to set up ajax submission for
		 * @param object params	Parameters to use in setup:
		 * 					beforeAjax = function to call before submit
		 * 					ajaxComplete = function called once ajax completes, gets
		 * 						pointer to ajax response as first argument
		 *					action = [optional] action to call, will default to action
		 *						specified on form
		 *					enctype = [optional] enctype to use, will default to enctype
		 *						specified on form
		 */
		ajaxify: function(formId, params){
			// set up defaults for params
			if(!params.beforeAjax) params.beforeAjax = null;
			if(!params.afterAjax) params.afterAjax = null;
			if(!params.action) params.action = null;
			if(!params.enctype) params.enctype = 'multipart/form-data';
			
			// get form from document
			var ajaxForm = document.getElementById(formId);
			
			// set up form properties
			ajaxForm.method = 'post';
			if(params.enctype) ajaxForm.enctype = params.enctype;
			if(params.action) ajaxForm.action = params.action;
			
			// set up submit function
			ajaxForm.onsubmit = (function(e){
				// call beforeAjax function
				if(params.beforeAjax && !params.beforeAjax(e)) return false;
				// prevent submission if already submitting
				if(ajaxForm.submitting) return false;
				
				// remove any previous frames
				if(ajaxForm.ajaxFrame){
					document.body.removeChild(ajaxForm.ajaxFrame);
				}
				
				// keep track of form activity
				ajaxForm.submitting = true;
				
				// build iframe
				var uploadFrame = document.createElement('IFRAME');
				uploadFrame.id = 'up-' + Math.floor(Math.random() * 100);
				uploadFrame.name = uploadFrame.id;
				uploadFrame.style.display = 'none';
				document.body.appendChild(uploadFrame);
				
				// set form target
				ajaxForm.target = uploadFrame.id;
				
				// set up iframe response function
				uploadFrame.onload = (function(e){
					// throw response inside form variable
					ajaxForm.ajaxResp = uploadFrame.contentWindow.document.body.innerHTML;
				
					// keep pointer to upload frame to delete later
					ajaxForm.ajaxFrame = uploadFrame;
			
					// clean up
					ajaxForm.target = null;
					delete ajaxForm.submitting;
					
					if(params.ajaxComplete) params.ajaxComplete(ajaxForm.ajaxResp);
				});
			});
		}
	};
})($);