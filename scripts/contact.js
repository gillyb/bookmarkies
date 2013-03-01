
$(function() {
	
	$('#send-contact-form').click(function() {
		$.ajax({
			url: '/-/contact/send',
			type: 'post',
			data: {
				contactName: $('#contact-name').val(),
				contactEmail: $('#contact-email').val(),
				contactMessage: $('#contact-message').val()
			},
			success: function() {
				alert('Your message was sent.\nThank You! :)');
			},
			error: function(ex) {
				alert('There was an error...\n' + ex.Message);
			}
		});
	});

});