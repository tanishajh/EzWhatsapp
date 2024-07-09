const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Form of an array
let allChats = [
  {
    from: "tia",
    to: "rashmi",
    message: "hello",
    created_at: new Date(),
  },
  {
    from: "disha",
    to: "rashmi",
    message: "welcome",
    created_at: new Date(),
  },
  {
    from: "sid",
    to: "disha",
    message: "hi",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats)
  .then(() => {
    console.log("Chats inserted");
  })
  .catch((err) => {
    console.log(err);
  });
