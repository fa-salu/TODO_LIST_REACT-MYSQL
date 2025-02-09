export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-red-50 border border-red-300 rounded-lg shadow">
      <h2 className="text-red-600 font-bold text-lg">Something went wrong</h2>
      <p className="text-red-500 text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}
