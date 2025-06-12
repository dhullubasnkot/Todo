const loginUser = async (formData) => {
  const response = await fetch("http://localhost:4000/users", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const users = await response.json();

  if (!Array.isArray(users)) {
    throw new Error("Unexpected response from server");
  }

  const foundUser = users.find(
    (u) => u.email === formData.email && u.password === formData.password
  );

  if (!foundUser) {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem("userID", foundUser.id);
  localStorage.setItem("username", foundUser.username);
  localStorage.setItem("email", foundUser.email);

  return foundUser;
};

export default loginUser;
