const useUpdateTodos = (editingTodo, setEditingTodo, setData, setError) => {
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/todo/task/${editingTodo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editingTodo.title,
            descrition: editingTodo.descrition,
            completed: editingTodo.completed,
            userId: localStorage.getItem("userId"),
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to update item");

      const updated = await response.json();
      setData((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setEditingTodo(null);
    } catch (err) {
      setError(err.message || "Update failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { handleUpdateSubmit, handleChange };
};

export default useUpdateTodos;
