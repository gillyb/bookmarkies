
$(function() {
	$('.openid').click(function() {
		var provider = $(this);
		var openIdLoginForm = $('form#openid-login');
		openIdLoginForm.find('#openid_identifier').val(provider.data('openid-provider'));
		openIdLoginForm.submit();
	});
});