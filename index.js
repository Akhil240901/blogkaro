import express from "express";
import "ejs";
import mongoose from "mongoose";
import { error } from "console";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import appRouter from "./routes/User.js";
import User from "./model/User.js";
const port = process.env.PORT || 8080;
const app = express();

//file path
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const templateEnginePAth = path.join(_dirname, "./views");
console.log(_dirname);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set template engine for server side redering
app.set("view engine", "ejs");
app.set("views", templateEnginePAth);

//middleware to routes
app.use("/user", appRouter);

app.get("/", (req, res) => {
  res.render("Home");
});

//connect to Database
mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => {
    console.log("Connection is successful ");
  })
  .catch((error) => {
    console.log(error);
  });

//app listen at port
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
