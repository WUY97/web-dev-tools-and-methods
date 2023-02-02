const chatWeb = {
    chatPage: function (chat) {
        // Fill in/modify anything below!
        return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/chat.css">
        </head>
        <body>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
    },

    getMessageList: function (chat) {
        return (
            `<ol class="messages">` +
            // Fill in
            // Generate the HTML for the list of messages
            Object.values(chat.messages)
                .map(
                    (message) => `
                <li>
                  <div class="message">
                    <div class="sender-info">
                      <img class="avatar" alt="avatar of amit" src='${
                          message.sender === 'Amit'
                              ? '/images/avatar-amit.jpg'
                              : '/images/avatar-bao.jpg'
                      }'/>
                      <span class="username">${message.sender}</span>
                    </div>
                    <p class="message-text">${message.text}</p>
                  </div>
                </li>
              `
                )
                .join('') +
            `</ol>`
        );
    },
    getUserList: function (chat) {
        return (
            `<ul class="users">` +
            Object.values(chat.users)
                .map(
                    (user) => `
              <li>
                <div class="user">
                  <span class="username">${user}</span>
                </div>
              </li>
            `
                )
                .join('') +
            `</ul>`
        );
    },
    getOutgoing: function ({ text }) {
        // Fill in
        // Generate the HTML for a form to send a message
        return `      <div class="outgoing">
        <form name="name" action="/chat" method="post">
          <input class="to-send" name="text" placeholder="Enter message to send"/>
          <input type="hidden" name="username" value="Amit" />
          <button type="submit">Send</button>
        </form>
      </div>`;
    },
};
module.exports = chatWeb;
