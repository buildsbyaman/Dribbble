const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ quiet: true });
const shotRouter = require("./routes/shot.js");
const userRouter = require("./routes/user.js");
const reviewRouter = require("./routes/review.js");
const ejsEngine = require("ejs-mate");
const path = require("path");
const app = express();

app.set("trust proxy", 1);

const mongoose = require("mongoose");
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const CustomError = require("./utilities/CustomError.js");
const MongoStore = require("connect-mongo");

const sessionOptions = {
  secret:
    process.env.SESSION_SECRET || "fallback-secret-key-change-in-production",
  resave: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGOATLASURL }),
  saveUninitialized: false,
  cookie: {
    secure:
      process.env.NODE_ENV === "production" && process.env.HTTPS === "true",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
  },
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsEngine);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(expressSession(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOATLASURL);
    console.log("Successfully connected to DB!");
  } catch (error) {
    console.error("Error while connecting to Database!");
    process.exit(1);
  }
}

connectDB();

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  res.locals.currUser = req.user || null;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/shot");
});

app.get("/privacy", (req, res) => {
  res.render("privacy.ejs", {
    cssFiles: [
      "/css/common.css",
      "/css/header.css",
      "/css/footer.css",
      "/css/privacy.css",
    ],
  });
});

app.use("/user", userRouter);
app.use("/shot", shotRouter);
app.use("/review", reviewRouter);

app.use("*", (req, res, next) => {
  next(new CustomError(404, "The page you are looking for doesn't exist!"));
});

app.use((error, req, res, next) => {
  const statusCode = error.code || 500;
  const message = error.message || "Something went wrong!";

  res.status(statusCode).render("error", {
    statusCode,
    message,
    cssFiles: [
      "/css/common.css",
      "/css/header.css",
      "/css/footer.css",
      "/css/error.css",
    ],
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started successfully on ${port}`);
});
