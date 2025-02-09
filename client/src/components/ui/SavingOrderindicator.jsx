export default function SavingOrderIndicator() {
  return (
    <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-xs z-50">
      <div className="bg-white px-6 py-3 rounded-lg shadow-lg flex items-center">
        <svg
          className="animate-spin h-6 w-6 text-blue-600 mr-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span className="text-lg font-semibold text-gray-700">
          Saving Order...
        </span>
      </div>
    </div>
  );
}
