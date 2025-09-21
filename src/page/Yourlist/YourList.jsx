// หน้านี้อาจจะไม่ได้ย่อยโค๊ดเพราะ ใช้แค่หน้าเดียวครับ
import { useState, useEffect } from "react";
import { apiMain } from "../../config/axios";
import Loading from "../../component/Loading";

export default function YourList() {
  const [dataBooking, setDataBooking] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiMain.get("/booking/listdatabooking");
        setDataBooking(res.data);
      } catch (err) {
        setError("❌ Failed to fetch your bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
          📋 Your Bookings
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {!loading && dataBooking.length === 0 ? (
          <div className="text-center text-gray-500 bg-gray-50 py-12 rounded-xl shadow-sm">
            No bookings found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataBooking.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border bg-white shadow hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Header */}
                <div className="px-5 py-4 border-b bg-emerald-50 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-emerald-700 text-lg">
                      {item.first_name} {item.last_name}
                    </p>
                    <p className="text-sm text-gray-500">{item.email}</p>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium">
                    Active
                  </span>
                </div>

                {/* Body */}
                <div className="px-5 py-6 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Check-in</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(item.check_in).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Check-out</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(item.check_out).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t flex justify-end gap-3 bg-gray-50">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition">
                    Cancel
                  </button>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
