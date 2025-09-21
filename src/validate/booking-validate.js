// import Joi from "joi";

// export const bookingSchema = Joi.object({
//   check_in: Joi.date().greater("now").required().messages({
//     "date.greater": "วันที่เช็คอินต้องเป็นวันปัจจุบันหรืออนาคต",
//     "any.required": "กรุณาระบุวันที่เช็คอิน",
//   }),

//   check_out: Joi.date().greater(Joi.ref("check_in")).required().messages({
//     "date.greater": "วันที่เช็คเอาต์ต้องมากกว่าวันที่เช็คอิน",
//     "any.required": "กรุณาระบุวันที่เช็คเอาต์ (ต้องไม่เว้นว่าง)",
//   }),
// });

import Joi from "joi";

export const bookingSchema = Joi.object({
  check_in: Joi.date().greater("now").required().messages({
    "date.greater": "Check-in date must be today or in the future",
    "any.required": "Please provide a check-in date",
  }),

  check_out: Joi.date().greater(Joi.ref("check_in")).required().messages({
    "date.greater": "Check-out date must be later than the check-in date",
    "any.required": "Please provide a check-out date (cannot be empty)",
  }),
});
