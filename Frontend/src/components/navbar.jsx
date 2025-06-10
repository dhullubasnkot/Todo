export default function Navbar() {
  return (
    <div className="flex justify-between p-4 bg-gray-100">
      <div>
        <p className="font-bold text-xl">TODO</p>
      </div>
      <div className="flex gap-4">
        <a href="/add" className="text-blue-500 hover:underline">
          Add
        </a>
        <a href="/signup" className="text-blue-500 hover:underline">
          Login/Signup
        </a>
      </div>
    </div>
  );
}
