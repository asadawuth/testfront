import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { apiMain } from "../../config/axios";
import LayoutBooking from "../../component/Booking/LayoutBooking";
import ButtonSubmit from "../../component/ButtonSubmit";
import { bookingSchema } from "../../validate/booking-validate";
import TextError from "../../component/TextError";

export default function Booking() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]); // Array[0] , Array[1]
  const [error, setError] = useState({}); // จนกว่าจะ Error ถึงจะเป็น string setError validationError มี
  const [submitting, setSubmitting] = useState(false); // เช็ท ให้เป็นจริง finally กลับมา false เหมือนเดิม
  const [bookedDates, setBookedDates] = useState([]);
  const cheackError = "พังท่อน useEffect";
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await apiMain.get("/booking/listdatabookingall"); // ขอข้อมูลการจองทั้งหมด
        // res.data
        /*       
[
    {
        "id": 1,
        "check_in": "2025-09-25T12:00:00.000Z",
        "check_out": "2025-09-28T12:00:00.000Z",
        "first_name": "asadawuth",
        "last_name": "paijit",
        "email": "test@gmail.com"
    },
    {
        "id": 2,
        "check_in": "2025-09-21T17:00:00.000Z",
        "check_out": "2025-09-23T16:59:59.999Z",
        "first_name": "asadawuth",
        "last_name": "paijit",
        "email": "test@gmail.com"
    },
]
*/

        const dates = [];
        res.data.forEach((b) => {
          const start = new Date(b.check_in);
          //console.log(start);
          //  => Thu Sep 25 2025 19:00:00 GMT+0700 (Indochina Time) ,
          const end = new Date(b.check_out);
          // console.log(end);
          //  => Thu Oct 30 2025 23:59:59 GMT+0700 (Indochina Time) ,
          const current = new Date(start);
          console.log(current);
          // => Thu Sep 25 2025 19:00:00 GMT+0700
          while (current <= end) {
            dates.push(new Date(current).setHours(0, 0, 0, 0));
            /*
          {
         "check_in" : "2025-09-25T12:00:00.000Z",
         "check_out": "2025-09-28T12:00:00.000Z"
          }
         push 25 26 27 28 29  29 ไม่ Push เพราะว่า 29 < 28

         */
            current.setDate(current.getDate() + 1);
          }
        });

        setBookedDates(dates);
        // 0:1758733200000
        // 1:1758819600000
        // 2:1758906000000
      } catch (err) {
        console.log(cheackError);
        console.error("Failed to fetch booked dates:", err);
      }
    };
    fetchBookedDates();
  }, []);

  const handleChange = (value) => {
    setDateRange(value);
    setError({});
  };

  const handleSubmit = async () => {
    if (!Array.isArray(dateRange) || dateRange.length !== 2) return;

    const [check_in, check_out] = dateRange;
    const formData = {
      check_in: new Date(check_in).toISOString(),
      check_out: new Date(check_out).toISOString(),
    };

    const { error: validationError } = bookingSchema.validate(formData, {
      abortEarly: false,
    });

    if (validationError) {
      const result = validationError.details.reduce((acc, el) => {
        acc[el.path[0]] = el.message;
        return acc;
      }, {});
      setError(result);
      return;
    }

    try {
      setSubmitting(true);
      const res = await apiMain.post("/booking/createbooking", formData);
      alert("✅ Booking success!");
      console.log("Booking created:", res.data);
      setError({});
    } catch (err) {
      const msg = err.response?.data?.message || "Booking failed";
      setError({ backend: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LayoutBooking>
      <Calendar
        onChange={handleChange}
        value={dateRange} // ตัวแรก กับตัวที่2 เป็น Array
        selectRange={true} // ตัวแรก กับตัวที่2 เป็น Array
        minDate={new Date()} // ใส่เผื่อทำให้เลือกวันย้อนหลังไม่ได้
        // ❌ ปิดวันจองแล้ว
        tileDisabled={({ date }) =>
          bookedDates.includes(new Date(date).setHours(0, 0, 0, 0))
        }
        // 🎨 ใส่สี
        tileClassName={({ date }) => {
          const day = new Date(date).setHours(0, 0, 0, 0);
          // ถ้าวันที่มี ใช้สีใน index.css booked-day ประมาณว่ามีวัน นี้ๆแล้ว
          if (bookedDates.includes(day)) return "booked-day";

          if (
            Array.isArray(dateRange) && // มีค่าจริง
            date >= dateRange[0] &&
            date <= dateRange[1]
          ) {
            // สีเขียว
            return "selected-day";
          }
          return ""; // ไม่ตรงกับอะไรเลย สีปกติตามที่เราเลือก
        }}
      />

      {/* ตรงนี้เป็นแค่ ข้อความใน state ของ dateRange มาโชว์เฉยๆ */}
      {Array.isArray(dateRange) && (
        <>
          <br />
          <p className="mt-4">
            Check-in:{" "}
            <span className="font-semibold">
              {dateRange[0].toLocaleDateString()}
            </span>
            <br />
            Check-out:{" "}
            <span className="font-semibold">
              {dateRange[1].toLocaleDateString()}
            </span>
          </p>
        </>
      )}

      {/* ✅ Error */}
      {error.check_in && <TextError className="mt-2" text={error.check_in} />}
      {error.check_out && <TextError className="mt-2" text={error.check_out} />}
      {error.backend && <TextError className="mt-2" text={error.backend} />}

      <ButtonSubmit
        submitting={submitting}
        label="Booking"
        onClick={handleSubmit}
        className="mt-4"
      />
    </LayoutBooking>
  );
}
