const CreateLoginUsers = async (form) => {
  const response = await fetch(
    "http://localhost:4000/users/check-credentials/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );
  return response.json();
};
export default CreateLoginUsers;
