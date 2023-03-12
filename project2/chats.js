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
    let conversation = chats.find((chat) => {
        return (
            chat.participants.includes(sender) &&
            chat.participants.includes(receiver)
        );
    });

    if (!conversation) {
        conversation = { participants: [sender, receiver].sort(), messages: [] }
        chats.push(conversation);
    }

    return conversation;
}

module.exports = {
    addMessage,
    getConversation,
};
