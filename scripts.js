function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;
    
    addMessage(messageText, 'sender');
    messageInput.value = '';
    
    showTypingIndicator();
    
    sendToBotpress(messageText);
}
async function sendToBotpress(message) {
    try {
    
    const response = await fetch('https://your-botpress-instance.com/api/v1/bots/your-bot-id/converse/user-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'text',
                text: message
            })
        });
        
        const data = await response.json();
        
    
    removeTypingIndicator();
        
    
    if (data.responses && data.responses.length > 0) {
        
        data.responses.forEach(botResponse => {
                if (botResponse.type === 'text') {
                    addMessage(botResponse.text, 'receiver');
                }
            
        });
        }
    } catch (error) {
        console.error('Error communicating with Botpress:', error);
        removeTypingIndicator();
        addMessage("I'm having trouble connecting. Please try again later.", 'receiver');
    }
    
    messagesArea.scrollTop = messagesArea.scrollHeight;
}