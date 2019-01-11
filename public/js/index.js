 var socket = io();

socket.on('connect', function ()  {
	console.log('Connected to server');
}); 

socket.on('disconnect', function ()  {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = jQuery('<li></li>');
	li.text(`${message.from} ${formattedTime}: ${message.text}`);

	jQuery('#messages').append(li);
});

// adding the event listener
socket.on('newLocationMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');
	//setting some properties on the attributes
	li.text(`${message.from} ${formattedTime}: `);
	//updating the anchor tag
	a.attr('href', message.url);
	//appending
	li.append(a);
	jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	var messageTextbox = jQuery('[name=message]');

	socket.emit('createMessage', { 
		from: 'User',
		text: messageTextbox.val()
	}, function () {
		//clearing the form ones the text has been sent
		messageTextbox.val('')
	});
});

var locationButton = jQuery('#send-location');
//adding a click event
locationButton.on('click', function () {
	if (navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
});
