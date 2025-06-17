const CreateLoginUsers = async (form) => {
  try {
    const response = await fetch(
      "http://localhost:4000/users/check-credentials/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify(form),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errRes = await response.json();
      throw new Error(errRes.error || "Login failed");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Login Fetch Error:", error);
    throw error;
  }
};

export default CreateLoginUsers;
