import express from "express";
import cors from "cors";
import { PORT } from "./src/config/serverConfig.js";
import apiRouter from "./src/routes/apiRouter.js";
import { connectDB } from "./src/config/dbConfig.js";


//rest object
const app = express(); 

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.text()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());


//route
  // URL => localhost:8080
  app.use("/api", apiRouter);

app.get("/ping", (req,res) => {
    return (res.status(200).send("<h1> Pong </h1>"))
});

// app.post("/api/v1/tasks/create/:id", (req, res) => {
//   res.send("Task Created");
// });


//Port
// const PORT = 8080;

//Listen
app.listen(PORT, () => {
   console.log(`Server Running on ${PORT}`);
   connectDB()
});