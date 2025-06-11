const signupUser = async (formData) => {
  const response = await fetch("http://localhost:4000/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Signup failed");
  }

  return result;
};

export default signupUser;
