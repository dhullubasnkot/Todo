export default async function GetAllTodos(userId) {
  try {
    const response = await fetch(`http://localhost:4000/todo/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    throw error;
  }
}
