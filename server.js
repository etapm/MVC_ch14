const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
const routes = require("./controllers");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  "/css",
  express.static(__dirname + "../public/css", {
    setHeaders: function (res, path) {
      res.setHeader("Content-Type", mime.getType(path));
    },
  })
);

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
    secure: false,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
});
