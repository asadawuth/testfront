export default function LayoutBooking({ children }) {
  return (
    <div className="p-4">
      <div className="flex justify-center">
        <h1 className="text-xl font-bold mb-4">📅 Booking</h1>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col">{children}</div>
      </div>
      <div className="flex justify-center">
        <div className="flex gap-6 mt-6 text-sm bg-gray-50 px-6 py-3 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-red-500 shadow-md"></span>
            <span className="text-gray-700 font-medium">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-green-500 shadow-md"></span>
            <span className="text-gray-700 font-medium">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-white border border-gray-400 shadow-sm"></span>
            <span className="text-gray-700 font-medium">Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
