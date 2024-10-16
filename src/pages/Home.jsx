import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='bg-[url("../../public/bg-image.jpg")] bg-cover bg-center h-screen w-screen flex flex-col gap-4 items-center justify-center opacity-40'>
      <div className="text-black text-4xl">
        “เว็บไซต์รวบรวมข้อมูล บอร์ดเกมแปลไทย และ บอร์ดเกมที่สร้างโดยคนไทย”
      </div>
      <div className="btn bg-[#FFB22C]">
        <Link to="/boardgames">บอร์ดเกมทั้งหมด</Link>
      </div>
    </div>
  );
};

export default Home;
