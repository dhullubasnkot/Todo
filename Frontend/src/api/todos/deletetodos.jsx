const handleDelete = async (id, setData, setError) => {
  try {
    const response = await fetch(`http://localhost:4000/todo/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete item");

    setData((prev) => prev.filter((item) => item.id !== id));
  } catch (err) {
    setError(err.message || "Delete failed");
  }
};

export default handleDelete;
