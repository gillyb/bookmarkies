
$(function() {
	$('.openid.google').click(function() {
		var openIdLoginForm = $('form#openid-login');
		openIdLoginForm.find('#openid_identifier').val('https://www.google.com/accounts/o8/id');
		openIdLoginForm.submit();
	});
});