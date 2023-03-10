const chats = [
    // conversation1, conversation2, ...
];

// const conversation = {
//     participants: [username1, username2], length === 2
//     messages: [message1, message2],
// }

// const message = {
//     text: 'Hello',
//     sender: 'nihao',
// }

function addMessage(sender, receiver, text) {
    const conversation = getConversation(sender, receiver);
    if (conversation) {
        conversation.messages.push({ text, sender });
    } else {
        chats.push({
            participants: [sender, receiver].sort(),
            messages: [{ text, sender }],
        });
    }
}

function getConversation(sender, receiver) {
    return chats.find((conversation) => {
        return conversation.participants.includes(sender) &&
            conversation.participants.includes(receiver);
    });
}

function getChats(username) {
    return chats.filter((conversation) => {
        return conversation.participants.includes(username);
    });
}

module.exports = {
    addMessage,
    getChats,
}
