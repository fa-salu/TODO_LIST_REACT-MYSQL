export default function Navbar() {
  return (
    <nav className="bg-[#13155A] text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">To Do</h1>
        <button className="bg-white text-[#13155A] px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
          Home
        </button>
      </div>
    </nav>
  );
}
