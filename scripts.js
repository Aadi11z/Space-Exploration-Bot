window.botpressWebChat.init({
    "botId": "YOUR_BOT_ID",
    "clientId": "YOUR_CLIENT_ID",
    "hostUrl": "https://cdn.botpress.cloud/webchat/v2",
    "messagingUrl": "https://messaging.botpress.cloud",
    "botName": "Cosmic Chat",
    "botConversationDescription": "Your AI companion in the vastness of space",
    "useSessionStorage": true,
    "containerWidth": "100%",
    "layoutWidth": "100%",
    "hideWidget": true,
    "disableAnimations": true,
    "showPoweredBy": false,
    "className": "messages-area",
});

document.addEventListener('DOMContentLoaded', (event) => {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            window.botpressWebChat.sendEvent({ type: 'message', text: message });
            userInput.value = '';
        }
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    window.botpressWebChat.onEvent(function(event) {
        if (event.type === 'LIFECYCLE.LOADED') {
            window.botpressWebChat.sendEvent({ type: 'show' });
        }
    }, ['LIFECYCLE.LOADED']);
});
