export async function logoutUser() {
  try {
    const res = await fetch("http://localhost:4000/users/logout", {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
