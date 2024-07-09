const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/", (req, res) => {
  res.send("working root");
});

// Index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// New route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create route
app.post("/chats", async (req, res) => {
  let { from, to, message } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
  });

  try {
    await newChat.save();
    console.log("chat was saved");
    res.redirect("/chats");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving chat");
  }
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
