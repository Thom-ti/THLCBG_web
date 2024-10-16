import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import useBoardgameStore from "../../stores/boardgameStore";
import { useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const ViewBoardGame = () => {
  const { id } = useParams();
  const [boardgame, setBoardgame] = useState({});
  const token = useUserStore((state) => state.token);
  const viewBoardGame = useBoardgameStore((state) => state.viewBoardGame);

  useEffect(() => {
    getBoardgame(id);
  }, []);

  const getBoardgame = async (id) => {
    try {
      const res = await viewBoardGame(token, id);
      setBoardgame(res.data.boardgame);
      console.log(res.data.boardgame);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col mt-10 bg-white p-4 rounded shadow-md">
        <div className="cursor-pointer" onClick={() => window.history.back()}>
          <FaArrowLeftLong />
        </div>
        <div className="w-100 h-80">
          <img
            src={boardgame.boardgameImage}
            className="w-full h-full object-contain rounded"
          />
        </div>
        <div className="ml-4 flex flex-col">
          <h1 className="text-lg font-bold">{boardgame.name}</h1>
          {boardgame.thaiName ? (
            <p>ชื่อไทย: {boardgame.thaiName}</p>
          ) : (
            <div></div>
          )}
          <table>
            <tr>
              <td>จำนวนผู้เล่น</td>
              <td>
                {boardgame.minPlayer}-{boardgame.maxPlayer}
              </td>
            </tr>
            <tr>
              <td>เหมาะกับอายุ</td>
              <td>{boardgame.age}+</td>
            </tr>
            <tr>
              <td>หมวดหมู่</td>
              <td>{boardgame.category}</td>
            </tr>
            <tr>
              <td>ลิขสิทธิ์แปลไทยโดย</td>
              <td>{boardgame.thaiLC}</td>
            </tr>
          </table>
          {/* <p>
            {boardgame.minPlayer}-{boardgame.maxPlayer} Players
          </p>
          <p>Age: {boardgame.age}+</p>
          <p>Category: {boardgame.category}</p>
          <p>ลิขสิทธิ์แปลไทยโดย: {boardgame.thaiLC}</p> */}
        </div>
        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Add to My Shelf
        </button>
        {/* <button className="bg-green-700 text-white px-4 py-2 rounded">
          Add to Shelf
        </button> */}
      </div>
      <div className="mt-4 bg-gray-200 p-4 text-center">
        <p>{boardgame.description}</p>
      </div>
    </div>
  );
};

export default ViewBoardGame;
