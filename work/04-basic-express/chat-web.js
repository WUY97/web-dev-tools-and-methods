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
            `<ol class="messages"><div class="sub">` +
            // Fill in
            // Generate the HTML for the list of messages
            Object.values(chat.messages)
                .map(
                    (message) => `
                <li>
                  <div class="message">
                    <div class="sender-info">
                      <img class="avatar" '${
                          message.sender === 'Amit'
                              ? 'Avatar of Amit'
                              : 'Avatar of Bao'
                      }' src='${
                        message.sender === 'Amit'
                            ? '/images/avatar-amit.jpg'
                            : '/images/avatar-bao.jpg'
                    }'/>
                      <span class="username">${message.sender}</span>
                    </div>
                    <div class="bubble ${
                        message.sender === 'Amit'
                            ? 'bubble-self'
                            : 'bubble-other'
                    }"><p class="message-text">${message.text}</p></div>
                  </div>
                </li>
                
              `
                )
                .join('') +
            `</div></ol>`
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
                  <img class="avatar" alt='${
                      user === 'Amit' ? 'Avatar of Amit' : 'Avatar of Bao'
                  }' src='${
                        user === 'Amit'
                            ? '/images/avatar-amit.jpg'
                            : '/images/avatar-bao.jpg'
                    }'/>
                  <p class="username">${user}</p>
                </div>
              </li>
              <hr class="separator" />
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
          <textarea class="to-send" name="text" placeholder="Enter message to send"></textarea>
          <input type="hidden" name="username" value="Amit" />
          <button id="submit-btn" type="submit">Send</button>
        </form>
      </div>`;
    },
};
module.exports = chatWeb;
