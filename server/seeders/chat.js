import { faker, simpleFaker } from "@faker-js/faker";
import { Chat } from "../models/chat.js";
import { User } from "../models/User.js";
import { Message } from "../models/message.js";

const createSingleChats = async (numsChats) => {
  try {
    const users = await User.find().select("_id");
    const chatPromise = [];
    for (let i = 0; i < users.lenght; i++) {
      for (let j = i + 1; j < users.lenght; j++) {
        const tempChat = Chat.create({
          name: faker.lorem.word(2),
          members: [users[i], users[j]],
        });
        chatPromise.push(tempChat);
      }
    }
    await Promise.all(chatPromise);
    console.log("Chats created successfully", numsChats);
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createGroupChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatPromise = [];
    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const members = [];
      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];
        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }
      const tempChat = Chat.create({
        groupChat: true,
        name: faker.lorem.word(1),
        members,
        creator: members[0],
      });
      chatPromise.push(tempChat);
    }
    await Promise.all(chatPromise);
    console.log("Group chats created successfully", numChats);
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createMessages = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");
    const messagePromise = [];
    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomChat = chats[Math.floor(Math.random() * chats.length)];
      const tempMessage = Message.create({
        chat: randomChat,
        sender: randomUser,
        message: faker.lorem.sentence(10),
      });
      messagePromise.push(tempMessage);
    }
    await Promise.all(messagePromise);
    console.log("Messages created successfully", numMessages);
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createMesagesInChat = async ( chatId,numMessages) => {
  try {
    const users = await User.find().select("id");

    const messagePromise = [];
    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const tempMessage = Message.create({
        chat: chatId,
        sender: randomUser,
        message: faker.lorem.sentence(10),
      });
      messagePromise.push(tempMessage);
    }
    await Promise.all(messagePromise);
    console.log("Messages created successfully", numMessages);
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


export { createSingleChats, createGroupChats, createMesagesInChat,createMessages };