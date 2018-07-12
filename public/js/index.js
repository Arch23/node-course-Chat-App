const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime,
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime,
    });

    jQuery('#messages').append(html);
    // const li = jQuery('<li></li>');
    // const a = jQuery('<a target="_blank">My Current location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);

    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (event)=>{
    event.preventDefault();

    const messageTexbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTexbox.val(),
    }, ()=>{
        messageTexbox.val('');
    });
});

const locationButton = jQuery('#send-location');

locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition((position)=>{
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, ()=>{
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    }, {
        enableHighAccuracy: true,
    });
});
