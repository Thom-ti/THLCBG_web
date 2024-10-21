import { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import useBoardgameStore from "../../stores/boardgameStore";
import useShelfStore from "../../stores/shelfStore";
import { useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

const ViewBoardGame = () => {
  const { boardgameId } = useParams();
  const [boardgame, setBoardgame] = useState({});
  const token = useUserStore((state) => state.token);
  const viewBoardGame = useBoardgameStore((state) => state.viewBoardGame);
  const addToShelf = useShelfStore((state) => state.addToShelf);

  useEffect(() => {
    getBoardgame(boardgameId);
  }, []);

  const getBoardgame = async (boardgameId) => {
    try {
      const res = await viewBoardGame(token, boardgameId);
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
    <div className="p-6 flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <div className="flex flex-col mt-10 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        {/* Back Button */}
        <div
          className="cursor-pointer mb-4"
          onClick={() => window.history.back()}
        >
          <FaArrowLeftLong className="text-blue-600 hover:text-blue-800 transition" />
        </div>

        {/* Boardgame Image */}
        <div className="w-full h-80 mb-4">
          <img
            src={boardgame.boardgameImage}
            alt={boardgame.name}
            className="w-full h-full object-contain rounded-lg shadow"
          />
        </div>

        {/* Boardgame Details */}
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-center text-blue-600 mb-2">
            {boardgame.name}
          </h1>
          <table className="w-full text-left mb-4">
            <tbody>
              <tr>
                <td className="font-semibold">ชื่อภาษาไทย:</td>
                <td>{boardgame.thaiName || "-"}</td>
              </tr>
              <tr>
                <td className="font-semibold">จำนวนผู้เล่น:</td>
                <td>
                  {boardgame.minPlayer === boardgame.maxPlayer
                    ? boardgame.minPlayer
                    : `${boardgame.minPlayer} - ${boardgame.maxPlayer}`}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">เหมาะกับอายุ:</td>
                <td>{boardgame.age}+</td>
              </tr>
              <tr>
                <td className="font-semibold">หมวดหมู่:</td>
                <td>{boardgame.category}</td>
              </tr>
              <tr>
                <td className="font-semibold">ลิขสิทธิ์แปลไทยโดย:</td>
                <td>{boardgame.thaiLC}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add to Shelf Button */}
        <button
          className="bg-green-700 text-white px-6 py-2 rounded-lg mt-4 transition hover:bg-green-800"
          onClick={handleAddToShelf}
        >
          Add to My Shelf
        </button>

        {/* Description */}
        <div className="mt-4 bg-gray-200 p-4 rounded-lg text-center">
          <p className="text-sm">{boardgame.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewBoardGame;
