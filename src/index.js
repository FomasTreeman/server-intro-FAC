const server = require("./server.js");
const express = require("express");

const ratings = [];
const listItems = () =>
  `<ul>${ratings.map((num) => `<li>${num}</li>`).join("")}</ul>`;

server.get("/", (req, res) => {
  res.status(200).send("<h1>hello express</h1>");
});

server.get("/colour", (req, res) => {
  const colour = req.query?.hex || "#ffffff";
  console.log(colour);
  res
    .status(200)
    .send(
      `<body style="background-color: ${colour}"><form action="/colour" method="GET"><input type="color" name="hex"><button type="submit">submit</button></form></body>`
    );
});

server.get("/cheese", (req, res) => {
  res.send(`<form action="/cheese" method="post">
    <input type="text" name="cheese" placeholder="cheese name">
    <input type="number" min="0" max="5" name="rating">
    <button type="submit"> submit </button>
</form>${listItems()}`);
});

server.post("/cheese", express.urlencoded(), (req, res) => {
  const name = req.body.cheese;
  const rating = req.body.rating;
  ratings.push(`${name}: ${rating} stars`);
  res.redirect("/cheese");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
