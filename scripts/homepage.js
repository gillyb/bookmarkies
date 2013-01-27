
$(function() {
	$('.openid.google').click(function() {
		var openIdLoginForm = $('form#openid-login');
		openIdLoginForm.find('#openid_identifier').val('https://www.google.com/accounts/o8/id');
		openIdLoginForm.submit();
	});

	$('#bookmark-tags').keyup(function(e) {
		if (e.keyCode == 13) { // enter
			// TODO: add the tag to the list of tags
		}
	});
});