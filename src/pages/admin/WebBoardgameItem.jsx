import React from "react";
import { Link } from "react-router-dom";

const WebBoardgameItem = (props) => {
  const { boardgame, handleDelete } = props;

  return (
    <tr className="hover:bg-gray-100 transition duration-200">
      <td className="border w-40 h-40 p-2">
        <img
          src={boardgame.boardgameImage}
          alt={boardgame.name}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </td>
      <td className="border font-bold text-blue-500 hover:text-blue-700 transition duration-200">
        <Link to={`/boardgames/${boardgame.id}`}>
          {boardgame.name}
        </Link>
      </td>
      <td className="border">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          onClick={() => handleDelete(boardgame.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default WebBoardgameItem;
