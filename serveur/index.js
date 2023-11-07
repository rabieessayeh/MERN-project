const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const articleRoute = require("./routes/article");
const CommandeRoute = require("./routes/commande");
const cors = require("cors");

app.use(express.static('uploads'))

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connecter"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/articles", articleRoute);
app.use("/commandes", CommandeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Serveur en cour");
});
