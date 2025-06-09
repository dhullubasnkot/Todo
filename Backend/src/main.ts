import express from "express";
import userroutes from "./routes/userroutes";
import TodoListroutes from "./routes/TodoListroutes";
const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/users", userroutes);
app.use("/todo", TodoListroutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
