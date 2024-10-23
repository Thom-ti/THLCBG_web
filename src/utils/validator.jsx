import Joi from "joi";

const registerSchema = Joi.object({
  username: Joi.string().required().min(6).max(30).messages({
    "string.empty": "ต้องกรอกชื่อผู้ใช้งาน",
    "string.min": "ชื่อผู้ใช้งานต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
    "string.max": "ชื่อผู้ใช้งานต้องมีความยาวไม่เกิน 30 ตัวอักษร",
  }),
  email: Joi.string()
    .email({ tlds: false }) // เมื่อตั้งค่า tlds เป็น false จะเป็นการปิดการตรวจสอบว่าโดเมนระดับบนสุดนั้นถูกต้องตามมาตรฐานหรือไม่ ซึ่งจะทำให้ยอมรับโดเมนที่อาจจะไม่มีอยู่จริงได้
    .required()
    .messages({ "string.empty": "ต้องกรอกอีเมล" }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": "ต้องกรอกรหัสผ่าน",
      "string.pattern.base":
        "รหัสผ่านต้องประกอบไปด้วย a-z A-Z 0-9 และต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "ต้องกรอกรหัสผ่านอีกครั้ง",
    "any.only": "การยืนยันรหัสผ่านไม่ตรงกัน",
  }),
});

const validateRegister = (input) => {
  // ตรวจสอบความถูกต้องของข้อมูลที่รับเข้ามาเทียบกับ schema โดย abortEarly: false หมายความว่าจะแสดงข้อผิดพลาดทั้งหมดที่พบ ไม่ใช่แค่ข้อผิดพลาดแรกที่พบ
  const { error } = registerSchema.validate(input, {
    abortEarly: false,
  });
  // ถ้ามีข้อผิดพลาด ให้จัดรูปแบบข้อความแสดงข้อผิดพลาดเป็น object โดยให้ key คือชื่อฟิลด์ และ value คือข้อความแสดงข้อผิดพลาด
  if (error) {
    const formatError = error.details.reduce((prev, curr) => {
      prev[curr.path[0]] = curr.message; // Map the error message to the field name
      return prev;
    }, {});
    return formatError;
  }
  // If there's no error, return null
  return null;
};

export default validateRegister;
