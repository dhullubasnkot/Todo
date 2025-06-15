import express from "express";
import userroutes from "./routes/userroutes";
import TodoListroutes from "./routes/TodoListroutes";
import cors from "cors";
const app = express();
const PORT = 4000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/users", userroutes);
app.use("/todo", TodoListroutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
