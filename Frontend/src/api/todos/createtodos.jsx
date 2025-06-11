const CreateTodo = async ({ title, descrition, userId }) => {
  const response = await fetch("http://localhost:4000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      descrition,
      completed: false,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return await response.json();
};

export default CreateTodo;
