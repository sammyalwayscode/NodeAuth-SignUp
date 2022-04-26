const express = require("express");
const PORT = 2020;
const app = express();
require("./config/db");
const newsRoute = require("./router/newsRouter");
const userRoute = require("./router/usersRouter");
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server Ready...");
});

app.use("/api", newsRoute);
app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});
