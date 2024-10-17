import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import useBoardgameStore from "../../stores/boardgameStore";
import useShelfStore from "../../stores/shelfStore";
import { useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

const ViewBoardGame = () => {
  const { id } = useParams();
  const [boardgame, setBoardgame] = useState({});
  const token = useUserStore((state) => state.token);
  const viewBoardGame = useBoardgameStore((state) => state.viewBoardGame);
  const addToShelf = useShelfStore((state) => state.addToShelf);

  useEffect(() => {
    getBoardgame(id);
  }, []);

  const getBoardgame = async (id) => {
    try {
      const res = await viewBoardGame(token, id);
      setBoardgame(res.data.boardgame);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToShelf = async () => {
    try {
      await addToShelf(token, boardgame);
      toast.success("Add to shelf successfully");
    } catch (err) {
      console.log(err);
      toast.error("This boardgame is already in your shelf");
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
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
          <h1 className="text-lg font-bold items-center justify-center text-center">
            {boardgame.name}
          </h1>
          <table>
            <tr>
              <td>ชื่อภาษาไทย:</td>
              <td>{boardgame.thaiName ? boardgame.thaiName : "-"}</td>
            </tr>
            <tr>
              <td>จำนวนผู้เล่น:</td>
              <td>
                {boardgame.minPlayer === boardgame.maxPlayer
                  ? boardgame.minPlayer
                  : `${boardgame.minPlayer} - ${boardgame.maxPlayer}`}
              </td>
            </tr>
            <tr>
              <td>เหมาะกับอายุ:</td>
              <td>{boardgame.age}+</td>
            </tr>
            <tr>
              <td>หมวดหมู่:</td>
              <td>{boardgame.category}</td>
            </tr>
            <tr>
              <td>ลิขสิทธิ์แปลไทยโดย:</td>
              <td>{boardgame.thaiLC}</td>
            </tr>
          </table>
        </div>
        <button
          className="bg-green-700 text-white px-4 py-2 rounded"
          onClick={handleAddToShelf}
        >
          Add to My Shelf
        </button>
        <div className="mt-4 bg-gray-200 p-4 text-center">
          <p>{boardgame.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewBoardGame;
