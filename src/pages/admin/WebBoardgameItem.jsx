import React from "react";
import { Link } from "react-router-dom";

const WebBoardgameItem = (props) => {
  const { boardgame, handleDelete } = props;

  return (
    <tr className="hover:bg-gray-100 transition duration-200">
      {/* รูปเกม */}
      <td className="border w-40 h-40 p-2 text-center">
        <img
          src={boardgame.boardgameImage}
          alt={boardgame.name}
          className="w-24 h-24 object-cover rounded-lg shadow-md mx-auto"
        />
      </td>

      {/* ชื่อเกม */}
      <td className="border font-bold text-blue-500 hover:text-blue-700 transition duration-200 text-center align-middle">
        <Link to={`/boardgames/${boardgame.id}`}>{boardgame.name}</Link>
      </td>

      {/* ปุ่ม Delete */}
      <td className="border text-center align-middle">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition duration-200"
          onClick={() => handleDelete(boardgame.id)}
        >
          ลบเกม
        </button>
      </td>
    </tr>
  );
};

export default WebBoardgameItem;
