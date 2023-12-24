const axios = require("axios");

const apiUrl = "https://ai.tantrik-apis.repl.co/gpt?query=";

module.exports = {
//THIS COMMAND DOESNT NEED OPENAI KEY
  
  config: {
    name: "ai",
    aliases: [],
    version: "1.0",
    author: "tanvir",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "get a response/answers from chatGPT"
    },
    longDescription: {
      en: "get response/answers chatGPT"
    },
    category: "ai"
  },

  onStart: async function ({ message, event, args, commandName }) {
    const prompt = args.join(" ");

    if (!prompt) {
      message.reply("Please provide a prompt.");
      return;
    }

    try {
      const queryUrl = apiUrl + encodeURIComponent(prompt);
      const response = await axios.get(queryUrl);
      const result = response.data;

      const content = result.gpt;

      const replyOptions = {
        body: content
      };

      message.reply(replyOptions, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};