var socket = io();

socket.on('connect', function ()  {
	console.log('Connected to server');
}); 

socket.on('disconnect', function ()  {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	console.log('newMessage', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

// adding the event listener
socket.on('newLocationMessage', function (message) {
	//generating the doc element
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');
	//setting some properties on the attributes
	li.text(`${message.from}: `);
	//updating the anchor tag
	a.attr('href', message.url);
	//appending
	li.append(a);
	jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	socket.emit('createMessage', { 
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function () {

	});
});

var locationButton = jQuery('#send-location');
//adding a click event
locationButton.on('click', function () {
	if (navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	navigator.geolocation.getCurrentPosition(function (position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		alert('Unable to fetch location.');
	});
});
