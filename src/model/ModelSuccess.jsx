export default function ModelSuccess({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-bold text-green-600 mb-4">Success</h2>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
}
