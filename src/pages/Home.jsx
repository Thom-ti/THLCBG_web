import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='relative bg-[url("../../public/bg-image.jpg")] bg-cover bg-center h-screen w-screen flex flex-col gap-6 items-center justify-center'>
      {/* เลเยอร์ทึบพื้นหลังเพื่อเพิ่มการอ่านตัวอักษร */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* ข้อความและปุ่ม */}
      <div className="relative text-white text-center max-w-2xl px-4">
        {/* ข้อความ */}
        <h1 className="text-4xl font-bold mb-6 leading-relaxed">
          “เว็บไซต์รวบรวมข้อมูล บอร์ดเกมแปลไทย และ บอร์ดเกมที่สร้างโดยคนไทย”
        </h1>

        {/* ปุ่ม */}
        <Link to="/boardgames">
          <button className="btn bg-[#FFB22C] text-black px-6 py-3 text-lg font-medium rounded-lg hover:bg-[#e09d26] transition duration-300">
            บอร์ดเกมทั้งหมด
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
